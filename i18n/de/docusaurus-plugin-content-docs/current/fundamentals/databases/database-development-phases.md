---
title: "Datenbankentwicklungsphasen"
description: "Überblick über die vier Phasen der Datenbankentwicklung: externe, konzeptionelle, semantische und physische Phase."
keywords:
    - "Datenbankdesign"
    - "Datenbankentwicklung"
    - "ER-Modell"
    - "konzeptioneller Entwurf"
    - "physischer Entwurf"
    - "Normalisierung"
tags:
    - ap2
---

# Datenbankentwicklungsphasen

Die Entwicklung einer Datenbank wird typischerweise in vier aufeinanderfolgende Phasen unterteilt, wobei jede Phase ein konkreteres Artefakt als die vorherige liefert.

## 1. Externe Phase

Anforderungen aller zukünftigen Nutzer und Interessengruppen werden gesammelt und analysiert. Ziel ist es zu verstehen, welche Daten das System verwalten muss und welche Operationen es unterstützen soll, ohne bereits über die Struktur der Datenbank nachzudenken.

Typische Ergebnisse sind Anforderungsdokumente und informelle Beschreibungen der Daten und Geschäftsregeln.

## 2. Konzeptionelle Phase

Die Anforderungen werden in ein abstraktes, implementierungsunabhängiges Datenmodell übersetzt. Das Standardwerkzeug dafür ist das [**Entity-Relationship-Modell (ERM)**](./er-model.md), das Entitäten, ihre Attribute und die Beziehungen zwischen ihnen abbildet.

Das konzeptionelle Modell ist technologieunabhängig: Es beschreibt, *was* die Daten darstellen, nicht *wie* sie gespeichert werden.

## 3. Semantische Phase

Das konzeptionelle Modell wird verfeinert und formalisiert, indem Integritätsbedingungen, Kardinalitäten und Geschäftsregeln präzise definiert werden. Das ERM wird dann in ein [**relationales Datenbankschema**](./database-schema.md) umgewandelt (Tabellen, Spalten, Primärschlüssel, Fremdschlüssel).

Diese Phase umfasst auch die [**Normalisierung**](./normalization.md), die Redundanzen und Anomalien beseitigt.

## 4. Physische Phase

Das relationale Modell wird in einem konkreten DBMS (z.B. PostgreSQL, MySQL) implementiert. Diese Phase umfasst:

- Schreiben von `CREATE TABLE`-Anweisungen mit geeigneten Datentypen
- Definieren von Indizes zur Optimierung der Abfrageleistung
- Konfigurieren von speicherspezifischen Parametern des gewählten DBMS
- Einrichten von Zugriffskontrollen und Sicherheitsrichtlinien

Das physische Modell ist eng an das Zielsystem gebunden und kann sich zwischen verschiedenen DBMS-Produkten unterscheiden.
