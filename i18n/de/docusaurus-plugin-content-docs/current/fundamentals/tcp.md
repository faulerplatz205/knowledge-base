---
title: "TCP"
description: "Transmission Control Protocol: Verbindungsauf- und -abbau, Mechanismen der Zuverlässigkeit, Fluss- und Staukontrolle, typische Einsatzgebiete."
keywords:
    - TCP
    - Transmission Control Protocol
    - Drei-Wege-Handshake
    - Verbindungsorientiert
    - Zuverlässigkeit
    - Flusskontrolle
    - Staukontrolle
    - Transportschicht
tags:
    - ap2
---

# TCP (Transmission Control Protocol)

## Überblick

TCP ist ein verbindungsorientiertes Transportprotokoll auf Schicht 4 des [OSI-Modells](./osi-model.md), spezifiziert in RFC 9293. Es macht aus der unzuverlässigen Paketauslieferung von IP einen zuverlässigen, geordneten Bytestrom zwischen zwei Anwendungen: Was auf der einen Seite geschrieben wird, kommt auf der anderen Seite vollständig, in der richtigen Reihenfolge und ohne Duplikate an, andernfalls meldet die Verbindung einen Fehler. Ein TCP-Endpunkt wird über die Kombination aus IP-Adresse und Portnummer angesprochen.

---

## Eigenschaften

| Eigenschaft           | Verhalten bei TCP                                                              |
| --------------------- | ------------------------------------------------------------------------------ |
| Verbindung            | Verbindungsorientiert, vor den ersten Nutzdaten wird eine Verbindung aufgebaut |
| Auslieferung          | Zuverlässig, verlorene Segmente werden erneut gesendet                         |
| Reihenfolge           | Garantiert, Segmente werden vor der Auslieferung nach Sequenznummer sortiert   |
| Duplikate             | Werden erkannt und verworfen                                                   |
| Datenmodell           | Durchgehender Bytestrom, Nachrichtengrenzen bleiben nicht erhalten             |
| Richtung              | Vollduplex, beide Seiten dürfen gleichzeitig senden                            |
| Flusskontrolle        | Ja, über das Empfangsfenster                                                   |
| Staukontrolle         | Ja, die Senderate passt sich der Last im Netz an                               |
| Headergröße           | Mindestens 20 Byte, mit Optionen bis 60 Byte                                   |
| Broadcast / Multicast | Nicht möglich, eine Verbindung hat immer genau zwei Endpunkte                  |

Der Overhead dieser Garantien besteht aus einem größeren Header, einem zusätzlichen Round Trip für den Verbindungsaufbau und Verzögerung, sobald ein verlorenes Segment wiederholt werden muss.

---

## Segment-Header

| Feld               | Zweck                                                                 |
| ------------------ | --------------------------------------------------------------------- |
| Quellport          | Port der sendenden Anwendung                                          |
| Zielport           | Port der empfangenden Anwendung                                       |
| Sequenznummer      | Position des ersten Nutzdatenbytes dieses Segments im Bytestrom       |
| Bestätigungsnummer | Nächstes Byte, das der Absender dieses Segments erwartet              |
| Flags              | Steuerbits, siehe unten                                               |
| Window             | Anzahl Bytes, die der Absender dieses Segments aktuell aufnehmen kann |
| Prüfsumme          | Fehlererkennung über Header und Nutzdaten                             |
| Optionen           | Maximum Segment Size, Window Scaling, Selective Acknowledgement       |

### Steuerflags

| Flag                    | Bedeutung                                                                            |
| ----------------------- | ------------------------------------------------------------------------------------ |
| `SYN` (Synchronize)     | Fordert eine Verbindung an und synchronisiert die Sequenznummern                     |
| `ACK` (Acknowledgement) | Die Bestätigungsnummer ist gültig                                                    |
| `FIN` (Finish)          | In dieser Richtung werden keine Daten mehr gesendet                                  |
| `RST` (Reset)           | Bricht die Verbindung sofort und ohne geordneten Abbau ab                            |
| `PSH` (Push)            | Fordert den Empfänger auf, die Daten ohne Verzögerung an die Anwendung weiterzugeben |
| `URG` (Urgent)          | Kennzeichnet dringende Daten (in der Praxis veraltet)                                |

---

## Verbindungsaufbau (Drei-Wege-Handshake)

Beide Seiten geben ihre eigene Anfangssequenznummer bekannt (`x` und `y` im Diagramm) und bestätigen die der Gegenseite mit `ack = x + 1` bzw. `ack = y + 1`.

```text
Client                                           Server

  | ---- SYN, seq = x -------------------------> |   wartet auf Verbindungen
  |                                              |
  | <--- SYN, ACK, seq = y, ack = x + 1 -------- |   Verbindung angenommen
  |                                              |
  | ---- ACK, ack = y + 1 ---------------------> |   Verbindung aufgebaut
  |                                              |
  | ==== Nutzdaten ============================> |
```

- Der Client weiß nach dem zweiten Segment und der Server nach dem dritten Segment, dass die Verbindung in beide Richtungen funktioniert.
- Der Handshake kostet einen Round Trip, bevor das erste Nutzdatenbyte gesendet werden kann.
- Ein `SYN` an einen geschlossenen Port wird mit `RST` beantwortet. Daran unterscheidet ein Portscan einen geschlossenen von einem gefilterten Port.

---

## Verbindungsabbau

Ein geordneter Abbau schließt jede Richtung einzeln und benötigt daher vier Segmente. `FIN` bedeutet nur *diese Seite hat mit dem Senden abgeschlossen*. Die andere Richtung darf weiterhin Daten übertragen (Half-Close).

```text
Client                                           Server

  | ---- FIN ----------------------------------> |
  | <--- ACK ----------------------------------- |
  | <--- FIN ----------------------------------- |
  | ---- ACK ----------------------------------> |
  |                                              |
  | (TIME_WAIT, danach wird die Verbindung frei) |
```

Die Seite, die zuerst schließt, verbleibt kurze Zeit im Zustand `TIME_WAIT`, damit verspätete Segmente der alten Verbindung nicht für Segmente einer neuen Verbindung mit demselben Portpaar gehalten werden. Ein `RST` überspringt dieses Verfahren und verwirft alles, was noch unterwegs ist.

---

## Zuverlässigkeit

- **Sequenznummern:** Jedes Nutzdatenbyte hat eine Position im Strom, was Sortierung und Duplikaterkennung ermöglicht.
- **Bestätigungen:** Der Empfänger bestätigt das nächste erwartete Byte und damit kumulativ alles bisher Empfangene.
- **Retransmission Timeout:** Ein Segment, das nicht innerhalb der Wartezeit bestätigt wird, wird erneut gesendet. Die Wartezeit ergibt sich aus der gemessenen Round Trip Time.
- **Fast Retransmit:** Mehrere doppelte Bestätigungen für dasselbe Byte deuten auf ein einzelnes verlorenes Segment hin und lösen eine Wiederholung aus, bevor die Wartezeit abläuft.
- **Prüfsumme:** Ein beschädigtes Segment wird verworfen und damit nie bestätigt. Die fehlende Bestätigung löst eine Wiederholung aus.
- **Selective Acknowledgement (SACK):** Eine Option, mit der der Empfänger genau melden kann, welche Bytebereiche angekommen sind, sodass nur die fehlenden Bereiche wiederholt werden.

---

## Flusskontrolle

Die Flusskontrolle schützt den *Empfänger* vor Überlastung. Jedes Segment meldet im Window-Feld, wie viele Bytes sein Absender aktuell puffern kann. Die Gegenseite darf niemals mehr unbestätigte Daten unterwegs haben, als dieses Fenster erlaubt.

Ein Empfänger mit vollem Puffer meldet ein Fenster von null. Der Sender pausiert dann, bis ein späteres Segment ein größeres Fenster meldet.

## Staukontrolle

Die Staukontrolle schützt das *Netz* vor Überlastung und arbeitet unabhängig vom Empfangsfenster. Die effektive Sendegrenze ist der kleinere Wert aus Empfangsfenster und Staufenster.

| Phase                | Verhalten                                                                         |
| -------------------- | --------------------------------------------------------------------------------- |
| Slow Start           | Das Staufenster startet klein und wächst exponentiell                             |
| Congestion Avoidance | Oberhalb eines Schwellwerts wächst das Fenster nur noch linear                    |
| Verlust erkannt      | Das Fenster wird verkleinert, weil Paketverlust auf Stau hindeutet                |
| Fast Recovery        | Nach einem Fast Retransmit läuft die Übertragung mit verkleinertem Fenster weiter |

---

## Typische Einsatzgebiete

### TCP vs. UDP

|           | TCP                                                                            | [UDP](./udp.md)                                                                               |
| --------- | ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------- |
| Kriterium | Vollständigkeit ist wichtiger als Latenz                                       | Ein verspätetes Paket ist wertlos, oder der Aufwand einer Verbindung übersteigt die Nutzdaten |
| Beispiele | Dateiübertragung, Webseiten, E-Mail, Fernadministration, Datenbankverbindungen | Live-Audio und -Video, Online-Spiele, einfache Frage-Antwort-Protokolle                       |

### Bekannte TCP-Ports

| Port    | Dienst                                                         |
| ------- | -------------------------------------------------------------- |
| 20/21   | FTP-Daten / FTP-Steuerung                                      |
| 22      | SSH                                                            |
| 25      | SMTP                                                           |
| 53      | DNS-Zonentransfers und Antworten oberhalb der UDP-Größengrenze |
| 80      | HTTP                                                           |
| 110/995 | POP3 / POP3S                                                   |
| 143/993 | IMAP / IMAPS                                                   |
| 443     | HTTPS                                                          |
| 3306    | MySQL / MariaDB                                                |

## Siehe auch

- [UDP](./udp.md): das verbindungslose Gegenstück ohne Verbindungsaufbau, Zuverlässigkeit oder Flusskontrolle
- [OSI-Modell](./osi-model.md): wo die Transportschicht zwischen Netzwerk- und Sitzungsschicht sitzt
