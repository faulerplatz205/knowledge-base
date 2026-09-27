---
title: "UDP"
description: "User Datagram Protocol: verbindungsloser Transport, Aufbau des Headers und typische Einsatzgebiete."
keywords:
    - UDP
    - User Datagram Protocol
    - Verbindungslos
    - Datagramm
    - Transportschicht
    - TCP vs UDP
    - Streaming
tags:
    - ap2
---

# UDP (User Datagram Protocol)

## Überblick

UDP ist ein verbindungsloses Transportprotokoll auf Schicht 4 des [OSI-Modells](./osi-model.md), spezifiziert in RFC 768. Es ergänzt die Paketauslieferung von IP um fast nichts: Portnummern, ein Längenfeld und eine Prüfsumme. Jedes Datagramm wird einzeln adressiert und geroutet, ohne vorherigen Verbindungsaufbau, gemeinsamen Zustand, Bestätigung oder Wiederholung. Ein Datagramm wird gesendet und kommt entweder an oder nicht, und der Sender erfährt nie, welcher der beiden Fälle eingetreten ist. Ein UDP-Endpunkt wird über die Kombination aus IP-Adresse und Portnummer angesprochen.

---

## Eigenschaften

| Eigenschaft           | Verhalten bei UDP                                                             |
| --------------------- | ----------------------------------------------------------------------------- |
| Verbindung            | Verbindungslos, ein Datagramm kann sofort gesendet werden                     |
| Auslieferung          | Unzuverlässig, verlorene Datagramme werden nicht bemerkt und nicht wiederholt |
| Reihenfolge           | Nicht garantiert, Datagramme können in anderer Reihenfolge ankommen           |
| Duplikate             | Möglich, die Erkennung bleibt der Anwendung überlassen                        |
| Datenmodell           | Nachrichtenorientiert, ein Sendevorgang ergibt genau ein Datagramm            |
| Richtung              | Beide Seiten dürfen jederzeit senden, jedes Datagramm steht für sich          |
| Flusskontrolle        | Keine                                                                         |
| Staukontrolle         | Keine, ein Sender kann das Netz überfluten                                    |
| Headergröße           | 8 Byte, fest                                                                  |
| Broadcast / Multicast | Unterstützt, ein Datagramm kann viele Empfänger adressieren                   |

Im Gegenzug für den geringen Overhead gibt UDP keine Garantien.

---

## Datagramm-Header

Der Header besteht aus vier Feldern mit je 2 Byte:

| Feld      | Zweck                                                                                                         |
| --------- | ------------------------------------------------------------------------------------------------------------- |
| Quellport | Port der sendenden Anwendung, darf 0 sein, wenn keine Antwort erwartet wird                                   |
| Zielport  | Port der empfangenden Anwendung                                                                               |
| Länge     | Länge von Header und Nutzdaten in Byte                                                                        |
| Prüfsumme | Fehlererkennung über Header, Nutzdaten und Teile des IP-Headers, bei IPv4 optional und bei IPv6 verpflichtend |

Ein beschädigtes Datagramm wird stillschweigend verworfen.

---

## Kommunikation ohne Verbindung

Anders als bei TCP, wo Nutzdaten erst nach dem Drei-Wege-Handshake folgen, trägt bereits das erste Datagramm Nutzdaten. Nach dem letzten bleibt auf keiner Seite ein Verbindungszustand zurück.

```text
Client                                           Server

  | ---- Datagramm (Anfrage) ------------------> |   Anwendung liest es
  |                                              |
  | <--- Datagramm (Antwort) ------------------- |
  |                                              |
  | ---- Datagramm (Anfrage) -----X              |   verloren, niemand wird informiert
  |                                              |
  |  (Timeout in der Anwendung)                  |
  |                                              |
  | ---- Datagramm (Anfrage, wiederholt) ------> |
```

- Der Client erfährt erst durch die Antwort, dass seine Anfrage angekommen ist. Eine fehlende Antwort kann eine verlorene Anfrage, eine verlorene Antwort oder einen nicht erreichbaren Server bedeuten.
- Die Absenderadresse eines Datagramms wird nie durch einen Handshake überprüft. Dadurch sind gefälschte Anfragen möglich, die Amplification-Angriffe über DNS oder NTP ausnutzen.
- Ein Datagramm an einen geschlossenen Port wird mit der ICMP-Meldung *Port Unreachable* beantwortet. Ein offener und ein gefilterter Port bleiben meist beide stumm, weshalb ein UDP-Portscan die beiden oft nicht unterscheiden kann.

---

## Keine Fluss- und Staukontrolle

UDP gibt Datagramme so schnell weiter, wie die Anwendung sie sendet. Ist der Empfangspuffer voll, werden weitere Datagramme ohne Meldung verworfen. Ist das Netz überlastet, gehen Datagramme in den Warteschlangen der Router verloren.

Eine Anwendung, die große Datenmengen über UDP sendet, muss ihre Rate selbst begrenzen (RFC 8085). Andernfalls verdrängt sie TCP-Verkehr, weil TCP bei Paketverlust seine Rate senkt und UDP die frei werdende Kapazität übernimmt.

---

## Typische Einsatzgebiete

### UDP vs. TCP

|           | UDP                                                                                           | [TCP](./tcp.md)                                                                |
| --------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Kriterium | Ein verspätetes Paket ist wertlos, oder der Aufwand einer Verbindung übersteigt die Nutzdaten | Vollständigkeit ist wichtiger als Latenz                                       |
| Beispiele | Live-Audio und -Video, Online-Spiele, kurze Anfragen, Telemetrie, Dienstsuche über Multicast  | Dateiübertragung, Webseiten, E-Mail, Fernadministration, Datenbankverbindungen |

### Bekannte UDP-Ports

| Port     | Dienst        | Warum UDP                                                                                   |
| -------- | ------------- | ------------------------------------------------------------------------------------------- |
| 53       | DNS           | Eine kurze Anfrage, eine kurze Antwort, eine Wiederholung ist günstiger als eine Verbindung |
| 67/68    | DHCP          | Der Client hat noch keine IP-Adresse und ist auf Broadcast angewiesen                       |
| 69       | TFTP          | Absichtlich minimal, Einsatz in Boot-Umgebungen                                             |
| 123      | NTP           | Ein wiederholter Zeitstempel wäre bereits veraltet                                          |
| 161/162  | SNMP          | Viele kleine Statusmeldungen, der Verlust einer einzelnen ist verkraftbar                   |
| 443      | QUIC / HTTP/3 | Die Zuverlässigkeit wird in QUIC oberhalb von UDP umgesetzt                                 |
| 500/4500 | IPsec (IKE)   | Schlüsselaushandlung und NAT-Traversal                                                      |
| 5060     | SIP           | Signalisierung für Sprachverbindungen                                                       |

Bei DNS arbeiten beide Protokolle nebeneinander: Anfragen und kurze Antworten laufen über UDP, Zonentransfers und Antworten oberhalb der UDP-Größengrenze über TCP. Diese Grenze liegt bei 512 Byte oder bei der Puffergröße, die der Client per EDNS(0) ankündigt.

## Siehe auch

- [TCP](./tcp.md): das verbindungsorientierte Gegenstück mit Zuverlässigkeit, Reihenfolge und Flusskontrolle
- [OSI-Modell](./osi-model.md): wo die Transportschicht zwischen Netzwerk- und Sitzungsschicht sitzt
- [DHCP](./dhcp.md): ein Protokoll, das auf UDP-Broadcasts angewiesen ist
- [DNS](./dns.md): nutzt UDP für Anfragen und TCP für große Antworten
