---
title: "Datenbankschema"
description: "Das relationale Datenbankschema: Tabellen, Schlüssel, Notation, die Überführung eines ER-Modells in Tabellen und referenzielle Integrität."
keywords:
    - "Datenbankschema"
    - "Relationenschema"
    - "Relationenmodell"
    - "Primärschlüssel"
    - "Fremdschlüssel"
    - "Zusammengesetzter Schlüssel"
    - "Verbindungstabelle"
    - "Referenzielle Integrität"
    - "Datenbankdesign"
tags:
    - ap2
---

# Datenbankschema

Ein Datenbankschema beschreibt die Struktur einer relationalen Datenbank: ihre Tabellen, deren Spalten mit Datentypen, die Schlüssel und die Verweise zwischen den Tabellen. Anders als das [ER-Modell](./er-model.md) ist es an das Relationenmodell gebunden. Beziehungen existieren nicht mehr als eigene Elemente und werden stattdessen über Fremdschlüssel und Verbindungstabellen ausgedrückt. Das Schema entsteht in der semantischen Phase der [Datenbankentwicklung](./database-development-phases.md) und wird in der physischen Phase mit `CREATE TABLE`-Anweisungen umgesetzt.

## Begriffe

| Relationaler Begriff | Gängiger Begriff   | Bedeutung                                                    |
| -------------------- | ------------------ | ------------------------------------------------------------ |
| Relation             | Tabelle            | Menge von Zeilen mit denselben Attributen                    |
| Tupel                | Zeile, Datensatz   | Ein Eintrag einer Tabelle                                    |
| Attribut             | Spalte             | Eine Eigenschaft, die jede Zeile der Tabelle besitzt         |
| Domäne               | Datentyp           | Menge der Werte, die ein Attribut annehmen darf              |
| Relationenschema     | Tabellendefinition | Name der Tabelle und ihre Attribute                          |
| Datenbankschema      | Datenbankstruktur  | Alle Relationenschemata einer Datenbank und ihre Bedingungen |

## Schlüssel

- **Schlüsselkandidat:** Eine minimale Menge von Attributen, die jede Zeile eindeutig identifiziert. Eine Tabelle kann mehrere besitzen, z.B. `CustomerID` und `Email`.
- **Primärschlüssel (PK):** Der zur Identifikation der Zeilen gewählte Schlüsselkandidat. Er muss eindeutig sein und darf nicht `NULL` sein.
- **Zusammengesetzter Schlüssel:** Ein Schlüssel aus mehreren Attributen, z.B. `(OrderID, LineNumber)`.
- **Fremdschlüssel (FK):** Ein oder mehrere Attribute, die auf den Primärschlüssel einer anderen Tabelle oder derselben Tabelle verweisen. Er kann zugleich Teil des Primärschlüssels sein, etwa in einer Verbindungstabelle oder in der Tabelle einer schwachen Entität.
- **Natürlicher Schlüssel:** Ein Schlüssel, der aus den Daten selbst stammt, z.B. eine ISBN.
- **Surrogatschlüssel:** Ein künstlicher Schlüssel ohne Bedeutung außerhalb der Datenbank, meist eine automatisch hochgezählte Nummer oder eine UUID.

## Notation

### Textuelle Notation

Jede Tabelle wird als ihr Name mit den Attributen in Klammern geschrieben:

| Kennzeichnung                                                 | Bedeutung                                                                            |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| Unterstrichen                                                 | Primärschlüssel; bei einem zusammengesetzten Schlüssel wird jeder Teil unterstrichen |
| Vorangestelltes `#` oder `↑`, teils gestrichelt unterstrichen | Fremdschlüssel                                                                       |
| Zusatz `PK` oder `FK`                                         | Ersatz in reinem Text, wo keine Unterstreichung möglich ist                          |

Ein Attribut, das zugleich Primärschlüssel und Fremdschlüssel ist, wird unterstrichen und mit `#` gekennzeichnet.

### Tabellendiagramm

- **Kasten:** Eine Tabelle, mit dem Tabellennamen als Kopfzeile und den Spalten unterhalb der Linie
- **`PK` und `FK`:** Kennzeichnung vor einer Spalte; `PK FK` kennzeichnet eine Spalte, die beides ist
- **Linie:** Fremdschlüsselverweis zwischen zwei Tabellen
- **Linienenden:** Kardinalität, entweder `1` oder `N`

## Überführung aus einem ER-Modell

| ER-Element                       | Datenbankschema                                                                                                               |
| -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Entitätstyp                      | Tabelle                                                                                                                       |
| Attribut                         | Spalte                                                                                                                        |
| Schlüsselattribut                | Primärschlüssel                                                                                                               |
| Zusammengesetztes Attribut       | Eine Spalte je Unterattribut, z.B. `Street`, `City`, `ZIP`                                                                    |
| Mehrwertiges Attribut            | Eigene Tabelle mit einem Fremdschlüssel auf den Eigentümer, z.B. `PhoneNumbers (#CustomerID, Number)`                         |
| Abgeleitetes Attribut            | Meist nicht gespeichert, sondern in der Abfrage berechnet                                                                     |
| 1:1-Beziehung                    | Fremdschlüssel mit `UNIQUE`-Constraint in einer der beiden Tabellen                                                           |
| 1:N-Beziehung                    | Fremdschlüssel in der Tabelle auf der N-Seite                                                                                 |
| N:M-Beziehung                    | Verbindungstabelle, deren Primärschlüssel aus den Fremdschlüsseln auf beide Tabellen besteht                                  |
| Beziehungsattribut               | Spalte in der Tabelle mit dem Fremdschlüssel, bei N:M in der Verbindungstabelle                                               |
| Schwache Entität                 | Tabelle, deren Primärschlüssel den Primärschlüssel des Eigentümers (zugleich Fremdschlüssel) und den Teilschlüssel kombiniert |
| Totale Teilnahme auf der N-Seite | Fremdschlüssel mit `NOT NULL`                                                                                                 |

Eine N:M-Beziehung zwischen Studenten und Kursen mit dem Beziehungsattribut `EnrolledOn`:

```text
Students    (StudentID, Name)
             ─────────
Courses     (CourseID, Title)
             ────────
Enrollments (#StudentID, #CourseID, EnrolledOn)
             ──────────  ─────────
```

## Referenzielle Integrität

Jeder Fremdschlüsselwert muss einem vorhandenen Primärschlüsselwert in der referenzierten Tabelle entsprechen oder `NULL` sein, sofern die Spalte das zulässt. Das DBMS weist ein Einfügen oder Ändern ab, das diese Regel verletzt. Was beim Löschen einer referenzierten Zeile (`ON DELETE`) oder beim Ändern ihres Primärschlüssels (`ON UPDATE`) geschieht, wird je Fremdschlüssel festgelegt:

| Option                   | Wirkung beim Löschen der referenzierten Zeile                                          |
| ------------------------ | -------------------------------------------------------------------------------------- |
| `RESTRICT` / `NO ACTION` | Löschen wird abgewiesen, solange verweisende Zeilen existieren (Standard)              |
| `CASCADE`                | Verweisende Zeilen werden mitgelöscht, z.B. die Positionen einer gelöschten Bestellung |
| `SET NULL`               | Fremdschlüssel wird auf `NULL` gesetzt; die Spalte muss `NULL` zulassen                |

## Beispiel: Bestellverwaltung

Aus dem Beispiel des [ER-Modells](./er-model.md) werden drei Tabellen. Die 1:N-Beziehung `places` wird zum Fremdschlüssel `CustomerID` in `Orders`. Die identifizierende Beziehung `contains` macht `OrderID` zum Teil des Primärschlüssels von `OrderItems`.

```text
Customers  (CustomerID, Name, Email)
            ──────────
Orders     (OrderID, #CustomerID, OrderDate)
            ───────
OrderItems (#OrderID, LineNumber, Quantity)
            ────────  ──────────
```

```text
┌─────────────────────┐          ┌──────────────────────┐
│ Customers           │          │ Orders               │
├─────────────────────┤          ├──────────────────────┤
│ PK     CustomerID   │1        N│ PK     OrderID       │
│        Name         ├──────────┤ FK     CustomerID    │
│        Email        │          │        OrderDate     │
└─────────────────────┘          └──────────┬───────────┘
                                            │ 1
                                            │
                                            │ N
                                 ┌──────────┴───────────┐
                                 │ OrderItems           │
                                 ├──────────────────────┤
                                 │ PK FK  OrderID       │
                                 │ PK     LineNumber    │
                                 │        Quantity      │
                                 └──────────────────────┘
```

```sql
CREATE TABLE Customers (
    CustomerID INT          PRIMARY KEY,
    Name       VARCHAR(100) NOT NULL,
    Email      VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE Orders (
    OrderID    INT  PRIMARY KEY,
    CustomerID INT  NOT NULL,
    OrderDate  DATE NOT NULL,
    FOREIGN KEY (CustomerID) REFERENCES Customers (CustomerID)
);

CREATE TABLE OrderItems (
    OrderID    INT NOT NULL,
    LineNumber INT NOT NULL,
    Quantity   INT NOT NULL,
    PRIMARY KEY (OrderID, LineNumber),
    FOREIGN KEY (OrderID) REFERENCES Orders (OrderID) ON DELETE CASCADE
);
```

## Häufige Fehler

1. **Linie ohne Fremdschlüsselspalte:** Eine Linie zwischen zwei Tabellen erzeugt keinen Verweis, solange die Fremdschlüsselspalte in der Tabelle auf der N-Seite fehlt.
2. **Fremdschlüssel auf der 1-Seite:** Eine Spalte `OrderID` in `Customers` kann je Kunde nur eine Bestellung aufnehmen.
3. **N:M ohne Verbindungstabelle:** Eine Fremdschlüsselspalte enthält je Zeile nur einen Wert, daher beschränkt ein Fremdschlüssel in einer der beiden Tabellen diese Seite auf einen Partner.
4. **Verbindungstabelle nur mit Surrogatschlüssel:** Ist das Paar der Fremdschlüssel weder Primärschlüssel noch `UNIQUE`, kann sich derselbe Student zweimal für denselben Kurs einschreiben.
5. **ER-Notation im Schema:** Rauten, Attribut-Ellipsen und Beziehungsnamen gehören ins ER-Diagramm. Das Schema zeigt Tabellen, `PK`- und `FK`-Kennzeichnungen und Verweise.
6. **Reservierte Wörter als Tabellennamen:** `ORDER` und `GROUP` sind in SQL reserviert und müssen als Tabellennamen in jeder Anweisung maskiert oder ersetzt werden.

## Siehe auch

- [ER-Modell](./er-model.md): das konzeptionelle Modell, aus dem das Schema abgeleitet wird
- [Datenbankentwicklungsphasen](./database-development-phases.md): die Stellung des Schemas zwischen konzeptioneller und physischer Phase
- [Normalisierung](./normalization.md): Prüfung der Tabellen eines Schemas auf Redundanz
- [SQL-Untersprachen](./sql-sublanguages.md): `CREATE TABLE` und die übrigen DDL-Anweisungen
