---
title: "UDP"
description: "User Datagram Protocol: connectionless transport, header structure and typical use cases."
keywords:
    - UDP
    - User Datagram Protocol
    - Connectionless
    - Datagram
    - Transport Layer
    - TCP vs UDP
    - Streaming
tags:
    - ap2
---

# UDP (User Datagram Protocol)

## Overview

UDP is a connectionless transport protocol on layer 4 of the [OSI model](./osi-model.md), specified in RFC 768. It adds almost nothing to the packet delivery of IP: port numbers, a length field and a checksum. Every datagram is addressed and routed independently, without prior connection setup, shared state, acknowledgement or retransmission. A datagram is sent and either arrives or it does not, and the sender is never told which of the two happened. A UDP endpoint is addressed through the combination of IP address and port number.

---

## Characteristics

| Property              | Behaviour in UDP                                                     |
| --------------------- | -------------------------------------------------------------------- |
| Connection            | Connectionless, a datagram can be sent immediately                   |
| Delivery              | Unreliable, lost datagrams are not noticed and not repeated          |
| Order                 | Not guaranteed, datagrams may arrive in a different order            |
| Duplicates            | Possible, detection is left to the application                       |
| Data model            | Message-oriented, one send operation results in exactly one datagram |
| Direction             | Both sides may send at any time, each datagram stands on its own     |
| Flow control          | None                                                                 |
| Congestion control    | None, a sender can flood the network                                 |
| Header size           | 8 bytes, fixed                                                       |
| Broadcast / multicast | Supported, one datagram can address many receivers                   |

In return for the small overhead, UDP gives no guarantees.

---

## Datagram Header

The header consists of four fields of 2 bytes each:

| Field            | Purpose                                                                                                 |
| ---------------- | ------------------------------------------------------------------------------------------------------- |
| Source port      | Port of the sending application, may be 0 if no answer is expected                                      |
| Destination port | Port of the receiving application                                                                       |
| Length           | Length of header and payload in bytes                                                                   |
| Checksum         | Error detection over header, payload and parts of the IP header, optional in IPv4 and mandatory in IPv6 |

A corrupted datagram is discarded silently.

---

## Communication Without a Connection

Unlike TCP, where payload only follows the three-way handshake, the first datagram already carries payload. No connection state remains on either side after the last one.

```text
Client                                           Server

  | ---- datagram (query) ---------------------> |   application reads it
  |                                              |
  | <--- datagram (answer) --------------------- |
  |                                              |
  | ---- datagram (query) --------X              |   lost, nobody is informed
  |                                              |
  |  (timeout in the application)                |
  |                                              |
  | ---- datagram (query, repeated) -----------> |
```

- The client only learns from the answer that its query arrived. A missing answer can mean a lost query, a lost answer or an unavailable server.
- The sender address of a datagram is never verified by a handshake. Spoofed requests are therefore possible, which amplification attacks via DNS or NTP exploit.
- A datagram sent to a closed port is answered with the ICMP message *port unreachable*. An open port and a filtered port usually both stay silent, so a UDP port scan often cannot distinguish the two.

---

## No Flow or Congestion Control

UDP passes datagrams on as fast as the application sends them. If the receive buffer is full, further datagrams are discarded without notice. If the network is overloaded, datagrams are lost in the queues of the routers.

An application sending large volumes over UDP has to limit its rate itself (RFC 8085). Otherwise it displaces TCP traffic, because TCP reduces its rate on packet loss and UDP takes over the freed capacity.

---

## Typical Use Cases

### UDP vs. TCP

|           | UDP                                                                                   | [TCP](./tcp.md)                                                               |
| --------- | ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Criterion | A late packet is worthless, or the overhead of a connection exceeds the payload       | Completeness matters more than latency                                        |
| Examples  | Live audio and video, online games, short queries, telemetry, discovery via multicast | File transfer, web pages, e-mail, remote administration, database connections |

### Well-Known UDP Ports

| Port     | Service       | Why UDP                                                                  |
| -------- | ------------- | ------------------------------------------------------------------------ |
| 53       | DNS           | One short query, one short answer, a repeat is cheaper than a connection |
| 67/68    | DHCP          | The client has no IP address yet and relies on broadcast                 |
| 69       | TFTP          | Deliberately minimal, used in boot environments                          |
| 123      | NTP           | A retransmitted time stamp would already be outdated                     |
| 161/162  | SNMP          | Many small status messages, loss of a single one is acceptable           |
| 443      | QUIC / HTTP/3 | Reliability is implemented in QUIC on top of UDP                         |
| 500/4500 | IPsec (IKE)   | Keying and NAT traversal                                                 |
| 5060     | SIP           | Signalling for voice connections                                         |

With DNS the two protocols work side by side: queries and short answers go over UDP, while zone transfers and answers exceeding the UDP size limit use TCP. That limit is 512 bytes, or the buffer size the client announces via EDNS(0).

## See Also

- [TCP](./tcp.md): the connection-oriented counterpart with reliability, ordering and flow control
- [OSI Model](./osi-model.md): where the transport layer sits between network and session layer
- [DHCP](./dhcp.md): a protocol that depends on UDP broadcasts
- [DNS](./dns.md): uses UDP for queries and TCP for large answers
