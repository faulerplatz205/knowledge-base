---
title: "ER-Modell"
description: "Ein Überblick über das Entity-Relationship-Modell: Entitäten, Attribute, Beziehungen, Kardinalitäten, schwache Entitäten und Chen-Notation."
keywords:
    - "ER-Modell"
    - "Entity-Relationship"
    - "Datenbankdesign"
    - "Datenmodellierung"
    - "Entitäten"
    - "Attribute"
    - "Beziehungen"
    - "Kardinalitäten"
    - "schwache Entitäten"
    - "Chen-Notation"
tags:
    - ap2
---

# ER-Modell

Das Entity-Relationship-Modell (ER-Modell) ist ein konzeptionelles Datenmodell, das die Struktur einer Datenbank auf einer übergeordneten Ebene und unabhängig von einem bestimmten Datenbanksystem beschreibt. Es wurde 1976 von Peter Chen eingeführt. Im nächsten Entwurfsschritt wird das ER-Modell in ein [Datenbankschema](./database-schema.md) aus Tabellen, Primärschlüsseln und Fremdschlüsseln überführt.

## Kernkonzepte

### Entitäten

Eine Entität, auch **Entitätsinstanz** genannt, ist ein eindeutig identifizierbares Objekt der realen Welt oder der Vorstellung, z.B. ein bestimmter Kunde oder eine bestimmte Bestellung. Entitäten desselben Typs werden zu **Entitätstypen** zusammengefasst (z.B. `Customer`, `Product`, `Order`).

### Attribute

Attribute beschreiben die Eigenschaften eines Entitätstyps.

| Typ              | Beschreibung                         | Beispiel                         |
| ---------------- | ------------------------------------ | -------------------------------- |
| Einfach          | Atomarer, unteilbarer Wert           | `FirstName`, `Age`               |
| Zusammengesetzt  | Besteht aus Unterattributen          | `Address` = (Straße, Stadt, PLZ) |
| Mehrwertig       | Kann mehrere Werte enthalten         | `PhoneNumbers`                   |
| Abgeleitet       | Berechnet aus einem anderen Attribut | `Age` abgeleitet aus `BirthDate` |

Das **Schlüsselattribut** identifiziert jede Entitätsinstanz eindeutig, z.B. `CustomerID`. Im Datenbankschema wird es dann zum Primärschlüssel.

### Beziehungen

Eine Beziehung beschreibt eine Verbindung zwischen zwei oder mehreren Entitätstypen. Wie Entitäten werden Beziehungen zu **Beziehungstypen** zusammengefasst (z.B. ein `Customer` *gibt* eine `Order` *auf*). Der Beziehungstyp selbst drückt diese Verbindung aus, deshalb enthält das ER-Modell keine Fremdschlüssel. Diese entstehen erst bei der Überführung in das Datenbankschema. Beziehungen können auch eigene Attribute haben (z.B. kann eine `WorksFor`-Beziehung ein `StartDate` tragen).

## Kardinalitäten

Die Kardinalität legt fest, wie viele Instanzen einer Entität mit Instanzen einer anderen Entität verknüpft sein können.

| Typ | Beschreibung                                    | Beispiel                                                       |
| --- | ----------------------------------------------- | -------------------------------------------------------------- |
| 1:1 | Eine Instanz bezieht sich auf genau eine andere | Eine Person hat einen Reisepass                                |
| 1:N | Eine Instanz bezieht sich auf viele andere      | Ein Kunde gibt viele Bestellungen auf                          |
| N:M | Viele Instanzen beziehen sich auf viele andere  | Studenten belegen mehrere Kurse; Kurse haben mehrere Studenten |

Die **Teilnahme** legt darüber hinaus fest, ob jede Entitätsinstanz an einer Beziehung beteiligt sein muss:

- **Totale Teilnahme** (obligatorisch): Jede Instanz muss an mindestens einer Beziehung beteiligt sein, z.B. muss jede Bestellung einem Kunden zugeordnet sein.
- **Partielle Teilnahme** (optional): Manche Instanzen nehmen möglicherweise nicht teil, z.B. hat nicht jeder Kunde eine Bestellung aufgegeben.

## Schwache Entitäten

Eine **schwache Entität** kann nicht allein anhand ihrer eigenen Attribute eindeutig identifiziert werden. Für ihre Identität ist sie von einer **starken Entität** (Eigentümer) abhängig.

- Die schwache Entität hat einen **Teilschlüssel** (Diskriminator), der nur im Kontext ihres Eigentümers eindeutig ist.
- Die Beziehung, die eine schwache Entität mit ihrem Eigentümer verbindet, wird als **identifizierende Beziehung** bezeichnet.
- Eine schwache Entität nimmt an ihrer identifizierenden Beziehung immer total teil.

**Beispiel:** `OrderItem` ist eine schwache Entität. Ihr Teilschlüssel `LineNumber` ist nur innerhalb einer bestimmten `Order` eindeutig. Die vollständige Identität lautet `(OrderID, LineNumber)`.

## Notation

| Element                                       | Bedeutung                                           |
| --------------------------------------------- | --------------------------------------------------- |
| Rechteck                                      | Entitätstyp                                         |
| Doppelt umrandetes Rechteck                   | Schwacher Entitätstyp                               |
| Raute                                         | Beziehungstyp                                       |
| Doppelt umrandete Raute                       | Identifizierende Beziehung                          |
| Ellipse                                       | Attribut                                            |
| Ellipse mit unterstrichenem Namen             | Schlüsselattribut                                   |
| Ellipse mit gestrichelt unterstrichenem Namen | Teilschlüssel einer schwachen Entität               |
| Doppelt umrandete Ellipse                     | Mehrwertiges Attribut                               |
| Gestrichelte Ellipse                          | Abgeleitetes Attribut                               |
| Ellipse mit weiteren Ellipsen                 | Zusammengesetztes Attribut und seine Unterattribute |
| Einfache Linie                                | Partielle Teilnahme                                 |
| Doppelte Linie                                | Totale Teilnahme                                    |
| `1`, `N`, `M` an einer Linie                  | Kardinalität                                        |

**Wichtig:** Im Gegensatz zu einem [Tabellendiagramm](./database-schema.md#tabellendiagramm) oder einem [UML-Klassendiagramm](../uml/class-diagram.md) werden die Attribute einer Entität nicht in ihr Rechteck geschrieben. Jedes Attribut erhält eine eigene Ellipse, die durch eine Linie mit der Entität verbunden ist.

## Beispiel: Bestellverwaltung

Ein `Customer` gibt `Orders` auf, die jeweils aus einem oder mehreren `OrderItems` bestehen. Jede Bestellung gehört zu einem Kunden und enthält mindestens eine Position, daher nimmt `Order` an beiden Beziehungen total teil. Ein Kunde ohne Bestellungen ist zulässig.

```text
  ╭────────────╮    ╭──────╮    ╭───────╮
  │ CustomerID │    │ Name │    │ Email │
  │ ────────── │    ╰───┬──╯    ╰───┬───╯
  ╰─────┬──────╯        │           │
        └───────────────┼───────────┘
                        │
                ┌───────┴───────┐
                │   Customer    │
                └───────┬───────┘
                        │ 1
                  ╱─────┴─────╲
                 ╱    places   ╲
                 ╲             ╱
                  ╲─────╥─────╱
                        ║ N
                ┌───────╨───────┐        ╭─────────╮
                │     Order     ├───┬────┤ OrderID │
                └───────╥───────┘   │    │ ─────── │
                        ║           │    ╰─────────╯
                        ║ 1         │    ╭───────────╮
                        ║           └────┤ OrderDate │
                  ╱═════╩═════╲          ╰───────────╯
                 ╱╱  contains ╲╲
                 ╲╲           ╱╱
                  ╲═════╦═════╱
                        ║ N
                ╔═══════╩═══════╗        ╭────────────╮
                ║   OrderItem   ╟───┬────┤ LineNumber │
                ╚═══════════════╝   │    │ ╌╌╌╌╌╌╌╌╌╌ │
                                    │    ╰────────────╯
                                    │    ╭──────────╮
                                    └────┤ Quantity │
                                         ╰──────────╯
```

## Häufige Fehler

1. **Attribute im Entitätsrechteck:** Ein Rechteck mit einer Liste von Spalten ist eine Tabelle eines Datenbankschemas, kein Entitätstyp nach Chen.
2. **Fremdschlüssel als Attribute:** `CustomerID` als Attribut von `Order` dupliziert die Beziehung `places` und gehört erst als Fremdschlüssel ins Datenbankschema.
3. **UML-Multiplizitäten in einem Chen-Diagramm:** Statt UML-Bereichen wie `1..*` oder `0..1` verwendet Chen `1`, `N` und `M` und drückt das Minimum über einfache oder doppelte Linien aus.
4. **Schwache Entität ohne identifizierende Beziehung:** Ein doppelt umrandetes Rechteck erfordert eine doppelt umrandete Raute, die es mit seinem Eigentümer verbindet.

## Siehe auch

- [Datenbankschema](./database-schema.md): die aus einem ER-Modell abgeleiteten Tabellen, Schlüssel und Überführungsregeln
- [Datenbankentwicklungsphasen](./database-development-phases.md): das ER-Modell als Ergebnis der konzeptionellen Phase
- [Normalisierung](./normalization.md): Beseitigung von Redundanz in den aus einem ER-Modell abgeleiteten Tabellen
