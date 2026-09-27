---
title: "TCP"
description: "Transmission Control Protocol: connection setup and teardown, reliability mechanisms, flow and congestion control, typical use cases."
keywords:
    - TCP
    - Transmission Control Protocol
    - Three-Way Handshake
    - Connection-Oriented
    - Reliability
    - Flow Control
    - Congestion Control
    - Transport Layer
tags:
    - ap2
---

# TCP (Transmission Control Protocol)

## Overview

TCP is a connection-oriented transport protocol on layer 4 of the [OSI model](./osi-model.md), specified in RFC 9293. It turns the unreliable packet delivery of IP into a reliable, ordered byte stream between two applications: whatever is written on one side arrives on the other side complete, in the correct order and without duplicates, or the connection reports an error. A TCP endpoint is addressed through the combination of IP address and port number.

---

## Characteristics

| Property              | Behaviour in TCP                                                          |
| --------------------- | ------------------------------------------------------------------------- |
| Connection            | Connection-oriented, a connection is established before the first payload |
| Delivery              | Reliable, lost segments are retransmitted                                 |
| Order                 | Guaranteed, segments are reordered by sequence number before delivery     |
| Duplicates            | Detected and discarded                                                    |
| Data model            | Continuous byte stream, message boundaries are not preserved              |
| Direction             | Full duplex, both sides may send at the same time                         |
| Flow control          | Yes, via the receive window                                               |
| Congestion control    | Yes, the send rate adapts to the load in the network                      |
| Header size           | 20 bytes minimum, up to 60 bytes with options                             |
| Broadcast / multicast | Not possible, a connection always has exactly two endpoints               |

The overhead of these guarantees consists of a larger header, an additional round trip for connection setup and delay whenever a lost segment has to be retransmitted.

---

## Segment Header

| Field                  | Purpose                                                                |
| ---------------------- | ---------------------------------------------------------------------- |
| Source port            | Port of the sending application                                        |
| Destination port       | Port of the receiving application                                      |
| Sequence number        | Position of the first payload byte of this segment in the byte stream  |
| Acknowledgement number | Next byte the sender of this segment expects to receive                |
| Flags                  | Control bits, see below                                                |
| Window                 | Number of bytes the sender of this segment is currently able to accept |
| Checksum               | Error detection over header and payload                                |
| Options                | Maximum Segment Size, window scaling, selective acknowledgement        |

### Control Flags

| Flag                    | Meaning                                                             |
| ----------------------- | ------------------------------------------------------------------- |
| `SYN` (Synchronize)     | Requests a connection and synchronises the sequence numbers         |
| `ACK` (Acknowledgement) | The acknowledgement number is valid                                 |
| `FIN` (Finish)          | No more data will be sent in this direction                         |
| `RST` (Reset)           | Aborts the connection immediately without an orderly teardown       |
| `PSH` (Push)            | Asks the receiver to pass the data to the application without delay |
| `URG` (Urgent)          | Marks urgent data (obsolete in practice)                            |

---

## Connection Establishment (Three-Way Handshake)

Both sides announce their own initial sequence number (`x` and `y` in the diagram) and confirm the one of the other side with `ack = x + 1` or `ack = y + 1`.

```text
Client                                           Server

  | ---- SYN, seq = x -------------------------> |   listening
  |                                              |
  | <--- SYN, ACK, seq = y, ack = x + 1 -------- |   connection accepted
  |                                              |
  | ---- ACK, ack = y + 1 ---------------------> |   connection established
  |                                              |
  | ==== payload ==============================> |
```

- The client knows after the second segment and the server after the third segment that the connection works in both directions.
- The handshake costs one round trip before the first byte of payload can be sent.
- A `SYN` sent to a closed port is answered with `RST`, which is how a port scan distinguishes a closed port from a filtered one.

---

## Connection Teardown

An orderly teardown closes each direction separately and therefore takes four segments. `FIN` only means *this side has finished sending*. The other direction may still carry data (half-close).

```text
Client                                           Server

  | ---- FIN ----------------------------------> |
  | <--- ACK ----------------------------------- |
  | <--- FIN ----------------------------------- |
  | ---- ACK ----------------------------------> |
  |                                              |
  | (TIME_WAIT, then the connection is released) |
```

The side that closes first stays in `TIME_WAIT` for a short period, so that delayed segments of the old connection cannot be mistaken for segments of a new connection on the same port pair. A `RST` skips this procedure and discards everything still in flight.

---

## Reliability

- **Sequence numbers:** every payload byte has a position in the stream, which allows reordering and duplicate detection.
- **Acknowledgements:** the receiver confirms the next expected byte and thereby cumulatively acknowledges everything received so far.
- **Retransmission timeout:** a segment that is not acknowledged within the timeout is sent again. The timeout is derived from the measured round trip time.
- **Fast retransmit:** several duplicate acknowledgements for the same byte indicate a single lost segment and trigger a retransmission before the timeout expires.
- **Checksum:** a corrupted segment is discarded and therefore never acknowledged. The missing acknowledgement triggers a retransmission.
- **Selective acknowledgement (SACK):** an option that lets the receiver report exactly which byte ranges arrived, so only the missing ranges are resent.

---

## Flow Control

Flow control protects the *receiver* from being overwhelmed. Every segment announces in its window field how many bytes its sender can currently buffer. The other side may never have more unacknowledged data in flight than this window allows.

A receiver whose buffer is full announces a window of zero. The sender then pauses until a later segment announces a larger window.

## Congestion Control

Congestion control protects the *network* from being overwhelmed and works independently of the receive window. The effective send limit is the smaller of receive window and congestion window.

| Phase                | Behaviour                                                                 |
| -------------------- | ------------------------------------------------------------------------- |
| Slow start           | The congestion window starts small and grows exponentially                |
| Congestion avoidance | Above a threshold the window only grows linearly                          |
| Loss detected        | The window is reduced because packet loss signals congestion              |
| Fast recovery        | After a fast retransmit the transfer continues with a reduced window      |

---

## Typical Use Cases

### TCP vs. UDP

|           | TCP                                                                           | [UDP](./udp.md)                                                                 |
| --------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Criterion | Completeness matters more than latency                                        | A late packet is worthless, or the overhead of a connection exceeds the payload |
| Examples  | File transfer, web pages, e-mail, remote administration, database connections | Live audio and video, online games, simple query/response protocols             |

### Well-Known TCP Ports

| Port    | Service                                                       |
| ------- | ------------------------------------------------------------- |
| 20/21   | FTP data / control                                            |
| 22      | SSH                                                           |
| 25      | SMTP                                                          |
| 53      | DNS zone transfers and responses exceeding the UDP size limit |
| 80      | HTTP                                                          |
| 110/995 | POP3 / POP3S                                                  |
| 143/993 | IMAP / IMAPS                                                  |
| 443     | HTTPS                                                         |
| 3306    | MySQL / MariaDB                                               |

## See Also

- [UDP](./udp.md): the connectionless counterpart without connection setup, reliability or flow control
- [OSI Model](./osi-model.md): where the transport layer sits between network and session layer
