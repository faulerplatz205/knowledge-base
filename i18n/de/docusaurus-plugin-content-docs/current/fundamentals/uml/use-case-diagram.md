---
title: "Anwendungsfalldiagramm"
description: "UML-Anwendungsfalldiagramme: Akteure, Systemgrenze, Assoziationen, die Beziehungen include, extend und Generalisierung, die Abgrenzung von Diagramm und Anwendungsfallbeschreibung sowie ihre Rolle in der Anforderungsanalyse."
keywords:
    - UML
    - Anwendungsfalldiagramm
    - Use-Case-Diagramm
    - Akteur
    - Systemgrenze
    - Include
    - Extend
    - Erweiterungspunkt
    - Generalisierung
    - Anwendungsfallbeschreibung
    - Anforderungsanalyse
tags:
    - ap2
---

# Anwendungsfalldiagramm

## Überblick

Ein Anwendungsfalldiagramm ist ein **Verhaltensdiagramm** der UML. Es zeigt, *welche* Leistungen ein System seiner Umgebung anbietet und *wer* sie nutzt, sagt aber bewusst nichts darüber aus, *wie* diese Leistungen umgesetzt werden. Das Diagramm ist damit die Außensicht auf ein System und legt dessen **Funktionsumfang** fest.

Typische Einsatzgebiete:

- Abgrenzung eines Projekts: eine frühe Antwort darauf, *was zum System gehört und was nicht*
- Gliederung der funktionalen Anforderungen in Einheiten mit fachlichem Nutzen
- Bereitstellung eines gemeinsamen Vokabulars für Entwicklung, Auftraggeber und Fachabteilung
- Verwendung als Inhaltsverzeichnis eines Anforderungsdokuments, mit je einer Beschreibung pro Anwendungsfall

Ein Anwendungsfall ist immer eine **vollständige, in sich abgeschlossene Leistung mit einem beobachtbaren Ergebnis von Wert** für mindestens einen Akteur. `Bestellung aufgeben` ist ein Anwendungsfall, `Bestellbutton anklicken` nicht.

---

## Notation

| Element           | Notation                                                                          | Bedeutung                                                                        |
| ----------------- | --------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Akteur            | Strichmännchen, Name darunter                                                     | Rolle außerhalb des Systems, die mit ihm interagiert                             |
| Akteur (System)   | Rechteck mit dem Schlüsselwort `<<actor>>` oder Strichmännchen                    | Fremdsystem in der Rolle eines Akteurs                                           |
| Systemgrenze      | Rechteck mit dem Systemnamen an der oberen Kante                                  | Alles darin Gezeichnete gehört zum betrachteten System                           |
| Anwendungsfall    | Ellipse mit dem Namen darin, immer innerhalb der Systemgrenze                     | Eine abgeschlossene Leistung des Systems, benannt als *Verb + Objekt*            |
| Assoziation       | Durchgezogene Linie ohne Pfeilspitze                                              | Ein Akteur ist an einem Anwendungsfall beteiligt                                 |
| Include           | Gestrichelter Pfeil mit `<<include>>`, zeigt auf den eingebundenen Anwendungsfall | Der Basisanwendungsfall führt den eingebundenen **immer** aus                    |
| Extend            | Gestrichelter Pfeil mit `<<extend>>`, zeigt auf den **Basisanwendungsfall**       | Der erweiternde Anwendungsfall läuft unter einer Bedingung **möglicherweise** ab |
| Erweiterungspunkt | Benannte Stelle in einem Abschnitt des Basisanwendungsfalls                       | Die Stelle, an der eine Erweiterung eingefügt wird                               |
| Generalisierung   | Durchgezogene Linie mit hohlem Dreieck am allgemeinen Element                     | Spezialisierung von Akteuren oder von Anwendungsfällen                           |
| Notiz             | Rechteck mit geknickter Ecke an gestrichelter Linie                               | Kommentar ohne Semantik, z.B. die Bedingung einer Extend-Beziehung               |

Benennungsregeln, die ein Diagramm lesbar halten:

- Anwendungsfälle werden als *Verb + Objekt* aus Sicht des Akteurs und in der Sprache der Fachlichkeit benannt, nicht in der Sprache der Implementierung: `Bestellung aufgeben` und `Rechnung stornieren`, nicht `Bestellverwaltung`, `orderService()` oder `Rechnungsstatus auf 0 setzen`
- Akteure werden nach der **Rolle** benannt, nicht nach der Person: `Sachbearbeiter`, nicht `Frau Weber`, denn eine Person kann mehrere Rollen einnehmen

---

## Bausteine

### Akteure

Ein Akteur ist eine Rolle außerhalb des Systems, die mit ihm Informationen austauscht. Akteure sind nicht zwangsläufig Menschen.

- **Primärer Akteur:** stößt den Anwendungsfall an und zieht den Nutzen daraus. Wird üblicherweise links gezeichnet
- **Sekundärer Akteur:** wird vom System während des Ablaufs aufgerufen und liefert etwas, das das System benötigt. Wird üblicherweise rechts gezeichnet
- **Menschlicher Akteur:** eine Person in einer Rolle, dargestellt als Strichmännchen
- **System-Akteur:** ein Fremdsystem, ein Dienst oder ein Zeitgeber, dargestellt als Strichmännchen oder als Rechteck mit dem Schlüsselwort `<<actor>>`

### Systemgrenze

Die Systemgrenze ist ein mit dem Systemnamen beschriftetes Rechteck. Sie trennt den Verantwortungsbereich des Systems von seiner Umgebung:

- Anwendungsfälle stehen **immer** innerhalb der Grenze, da sie Leistungen des Systems sind
- Akteure stehen **immer** außerhalb der Grenze, da sie nicht gebaut werden
- Assoziationen sind die einzigen Linien, die die Grenze überqueren

### Assoziation

Eine durchgezogene Linie zwischen einem Akteur und einem Anwendungsfall bedeutet, dass dieser Akteur an diesem Anwendungsfall beteiligt ist. Sie trägt keine Pfeilspitze, denn sie drückt Beteiligung aus, keine Richtung des Datenflusses. Multiplizitäten wie `1` oder `*` dürfen an den Enden stehen, werden in der Praxis aber selten benötigt.

Assoziationen bestehen ausschließlich zwischen einem Akteur und einem Anwendungsfall, niemals zwischen zwei Anwendungsfällen und niemals zwischen zwei Akteuren.

### Include

`<<include>>` beschreibt verpflichtende Wiederverwendung. Der Basisanwendungsfall führt den eingebundenen immer aus, an einer festen Stelle seines Ablaufs. Der gestrichelte Pfeil zeigt vom Basisanwendungsfall **auf** den eingebundenen Anwendungsfall.

```text
 ╭─────────────────────╮                     ╭───────────────────────────╮
(  Bestellung aufgeben  )╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌╌►(  Benutzer authentifizieren  )
 ╰─────────────────────╯     <<include>>     ╰───────────────────────────╯
```

Der eingebundene Anwendungsfall ist ein Baustein, den mehrere Basisanwendungsfälle teilen. `Benutzer authentifizieren` wird auch von `Merkliste verwalten` und `Rechnungen einsehen` benötigt, und das Auslagern erspart eine dreifache Beschreibung. Ein eingebundener Anwendungsfall besitzt in der Regel keine eigene Assoziation zu einem Akteur, weil er nie für sich allein gestartet wird.

### Extend

`<<extend>>` beschreibt optionales Verhalten. Der erweiternde Anwendungsfall läuft nur ab, wenn eine Bedingung erfüllt ist, und wird an einem benannten **Erweiterungspunkt** des Basisanwendungsfalls eingefügt. Sein gestrichelter Pfeil zeigt in die Gegenrichtung zu `<<include>>`: vom erweiternden Anwendungsfall **auf** den Basisanwendungsfall.

```text
 ╭─────────────────────────────╮
(      Bestellung aufgeben      )
(  ---------------------------  )              ╭────────────────────╮
(  extension points:            )◄╌╌╌╌╌╌┬╌╌╌╌╌(  Gutschein einlösen  )
(   Zahlungsart gewählt         )       ╎      ╰────────────────────╯
 ╰─────────────────────────────╯   <<extend>>
                                        ╎
                     ┌──────────────────┴──────────╮
                     │ Condition:                  │
                     │ {Gutscheincode eingegeben}  │
                     │ extension point:            │
                     │  Zahlungsart gewählt        │
                     └─────────────────────────────┘
```

Der Basisanwendungsfall ist ohne die Erweiterung vollständig. `Bestellung aufgeben` funktioniert ohne Gutschein einwandfrei, ohne Authentifizierung dagegen nicht. Die Bedingung ist ein Constraint und steht deshalb in geschweiften Klammern. Die UML zeigt sie zusammen mit dem Erweiterungspunkt, auf den sie sich bezieht, in einer Notiz an der Extend-Beziehung. Viele Werkzeuge und Lehrbücher kürzen die Notiz zu einem `<<extend>> {Bedingung}` neben dem Pfeil ab, was als Kurzform derselben Sache toleriert wird.

Ein einfacher Test unterscheidet die beiden Beziehungen:

- Lässt sich der Basisanwendungsfall beschreiben, ohne den anderen jemals zu erwähnen? Wenn ja, handelt es sich um `<<extend>>`
- Bricht der Basisanwendungsfall zusammen, wenn der andere entfernt wird? Wenn ja, handelt es sich um `<<include>>`

### Generalisierung

Die Generalisierung drückt *ist eine Art von* aus, für Akteure ebenso wie für Anwendungsfälle. Die Linie trägt ein hohles Dreieck am allgemeineren Element.

Generalisierung von Akteuren: Ein spezialisierter Akteur erbt jede Assoziation des allgemeinen Akteurs und kann eigene hinzufügen.

```text
                  ○
                 ╱│╲
                 ╱ ╲
                Kunde
                  △
       ┌──────────┴──────────┐
       │                     │
       ○                     ○
      ╱│╲                   ╱│╲
      ╱ ╲                   ╱ ╲
 Registrierter             Gast
     Kunde
```

Sowohl `Registrierter Kunde` als auch `Gast` erben jede Assoziation von `Kunde`, sodass `Katalog durchsuchen` nicht dreimal angebunden werden muss.

```text
                     ╭─────────────────────╮
                    (  Bestellung bezahlen  )
                     ╰─────────────────────╯
                                △
              ┌─────────────────┴────────────────┐
              │                                  │
 ╭──────────────────────────╮       ╭──────────────────────────╮
(  Mit Kreditkarte bezahlen  )     (  Per Lastschrift bezahlen  )
 ╰──────────────────────────╯       ╰──────────────────────────╯
```

Die Generalisierung von Anwendungsfällen ist mächtig, wird aber leicht überstrapaziert. Unterscheiden sich die Varianten nur in einem optionalen Schritt, ist `<<extend>>` die klarere Wahl.

---

## Diagramm und Beschreibung

Das Diagramm allein ist eine Übersicht, keine Spezifikation: Es benennt die Anwendungsfälle und ihre Beziehungen, sagt aber nichts über den Ablauf aus. Die Details stehen in der **Anwendungsfallbeschreibung**, verfasst als Fließtext oder nach einem Template, je eine pro Anwendungsfall.

| Feld               | Inhalt                                                                         |
| ------------------ | ------------------------------------------------------------------------------ |
| Name               | Identisch mit der Beschriftung im Diagramm, *Verb + Objekt*                    |
| Kurzbeschreibung   | Ein bis zwei Sätze zu Zweck und fachlichem Nutzen                              |
| Akteure            | Primärer Akteur, sekundäre Akteure                                             |
| Vorbedingung       | Was gelten muss, bevor der Anwendungsfall starten darf                         |
| Nachbedingung      | Was nach einem erfolgreichen Ablauf gilt                                       |
| Auslöser           | Das Ereignis, das den Anwendungsfall startet                                   |
| Standardablauf     | Der nummerierte Normalablauf, bei dem alles gut geht                           |
| Alternativabläufe  | Abweichungen, die dennoch zum Ziel führen, nummeriert gegen den Standardablauf |
| Ausnahmen          | Abweichungen, die das Erreichen des Ziels verhindern                           |
| Nicht-funktionales | Antwortzeiten, Mengengerüst, rechtliche Rahmenbedingungen                      |

Ein ausgefülltes Beispiel für `Bestellung aufgeben`:

- **Vorbedingung:** Der Warenkorb enthält mindestens eine Position, der Kunde ist authentifiziert
- **Nachbedingung:** Die Bestellung ist mit dem Status `paid` gespeichert und eine Bestätigung ist versendet
- **Auslöser:** Der Kunde bestätigt den Warenkorb
- **Standardablauf:** 1. System zeigt die Bestellübersicht an => 2. Kunde wählt eine Zahlungsart => 3. System reserviert die Ware => 4. System wickelt die Zahlung ab => 5. System bestätigt die Bestellung
- **Alternativablauf 2a:** Der Kunde gibt einen Gutscheincode ein, das System verringert den Betrag und setzt bei Schritt 3 fort
- **Ausnahme 3a:** Eine Position ist nicht mehr auf Lager, das System bietet eine Teillieferung an oder storniert die Bestellung

Ein Szenario ist *ein konkreter Pfad* durch einen Anwendungsfall: Der Standardablauf ist der erwartete Pfad, die Alternativabläufe sind die übrigen. Was im Diagramm als `<<extend>>` gezeichnet ist, taucht in der Beschreibung als Alternativablauf auf, was als `<<include>>` gezeichnet ist, als Verweis auf eine andere Beschreibung.

---

## Rolle in der Anforderungsanalyse

- Das **[Lastenheft](../../projectmanagement/requirements-specification.md#lastenheft)** wird vom Auftraggeber erstellt und beschreibt, *was* benötigt wird und *warum*. Anwendungsfälle sind dafür eine ausgezeichnete Gliederung, da jeder eine Anforderung beschreibt, ohne eine Lösung vorzugeben
- Das **[Pflichtenheft](../../projectmanagement/requirements-specification.md#pflichtenheft)** wird vom Auftragnehmer erstellt und beschreibt, *wie* die Anforderungen erfüllt werden. Das Anwendungsfalldiagramm wird übernommen, die Beschreibungen werden verfeinert und um technische Rahmenbedingungen ergänzt
- **Nachvollziehbarkeit:** Jede Anforderung sollte auf mindestens einen Anwendungsfall zurückführbar sein und jeder Anwendungsfall auf mindestens eine Anforderung. Anwendungsfälle ohne Anforderung sind überflüssiger Aufwand, Anforderungen ohne Anwendungsfall wurden vergessen
- **Schätzung und Planung:** Anwendungsfälle sind eine natürliche Einheit für die Aufwandsschätzung, die Releaseplanung und die Abnahme, weil jeder für sich abgenommen werden kann
- **Testgrundlage:** Aus dem Standardablauf ergibt sich der Positivtestfall, aus jedem Alternativablauf und jeder Ausnahme mindestens ein weiterer Testfall

Eine User Story ist ein kleines Planungsinkrement, ein Anwendungsfall eine vollständige Leistung einschließlich aller Alternativen. Ein Anwendungsfall zerfällt typischerweise in mehrere User Storys.

---

## Beispiel: Online-Shop

Betrachtetes System ist ein Online-Shop. Der Kunde durchsucht den Katalog und gibt Bestellungen auf. Das Aufgeben einer Bestellung erfordert immer eine Authentifizierung und eine Zahlungsabwicklung und kann optional um das Einlösen eines Gutscheins erweitert werden. Die Zahlungsabwicklung ruft einen externen Zahlungsdienstleister auf.

```text
                                  Online-Shop
      ┌──────────────────────────────────────────────────────────────────┐
      │                                                                  │
      │           ╭───────────────────────╮                              │
    ┌─┼──────────(   Katalog durchsuchen   )                             │
    │ │           ╰───────────────────────╯                              │
 ○  │ │                                                                  │
╱│╲─┤ │                                                                  │
╱ ╲ │ │           ╭───────────────────────╮     ╭────────────────────╮   │
    └─┼──────────(   Bestellung aufgeben   )◄╌╌(  Gutschein einlösen  )  │
Kunde │           ╰───────────────────────╯     ╰────────────────────╯   │
      │                    ╎       ╎         <<extend>>                  │
      │        <<include>> ╎       ╎ <<include>>                         │
      │                ┌───┘       └────────────────┐                    │
      │                ▼                            ▼                    │
      │   ╭─────────────────────────╮      ╭──────────────────╮          │  ○
      │  ( Benutzer authentifizieren )    (  Zahlung abwickeln )─────────┼─╱│╲
      │   ╰─────────────────────────╯      ╰──────────────────╯          │ ╱ ╲
      │                                                                  │
      └──────────────────────────────────────────────────────────────────┘
                                                                        Zahlungs-
                                                                      dienstleister
```

Was sich aus diesem Beispiel ablesen lässt:

- `Kunde` ist der primäre Akteur und steht links, `Zahlungsdienstleister` als sekundärer System-Akteur rechts: Der Shop ruft ihn auf, nicht umgekehrt
- `Benutzer authentifizieren` ist eingebunden, weil ohne diesen Schritt keine Bestellung aufgegeben werden kann, und besitzt keine eigene Assoziation, da er nie isoliert gestartet wird
- `Gutschein einlösen` erweitert `Bestellung aufgeben`: Wird die Erweiterung entfernt, bleibt `Bestellung aufgeben` voll funktionsfähig, und genau das ist das Kriterium für `<<extend>>`

---

## Häufige Fehler

1. **Include und Extend vertauscht:** `<<include>>` zeigt vom Basisanwendungsfall weg und bedeutet *immer*, `<<extend>>` zeigt auf ihn zu und bedeutet *möglicherweise*
2. **Durchgezogene und gestrichelte Linien vertauscht:** Assoziationen und Generalisierungen werden als durchgezogene Linien gezeichnet, `<<include>>` und `<<extend>>` als gestrichelte Pfeile
3. **Prozessschritte statt Anwendungsfälle:** `Kundennummer eingeben`, `Eingabe prüfen`, `Datensatz speichern` sind Schritte innerhalb eines Ablaufs, keine Leistungen mit fachlichem Nutzen. Sie gehören in die Anwendungsfallbeschreibung oder in ein Aktivitätsdiagramm
4. **Fehlende Systemgrenze:** Ohne Grenze sagt das Diagramm nicht mehr aus, welche Funktionalität zum System gehört, und der Umfang wird verhandelbar
5. **Akteur innerhalb der Systemgrenze:** Akteure stehen definitionsgemäß außerhalb, da sie nicht Teil des zu Bauenden sind. Ein innen gezeichneter Akteur bedeutet meist, dass eine Komponente mit einer Rolle verwechselt wurde
6. **Funktionale Zerlegung über Include:** Wird jeder Anwendungsfall in drei eingebundene Teilanwendungsfälle zerlegt, wird aus dem Diagramm ein Aufrufbaum. `<<include>>` dient der Wiederverwendung durch mehrere Basisanwendungsfälle, nicht der Gliederung eines einzelnen Ablaufs
7. **Assoziationen zwischen Anwendungsfällen:** Eine durchgezogene Linie ohne Schlüsselwort zwischen zwei Ellipsen hat in der UML keine Bedeutung. Beziehungen zwischen Anwendungsfällen sind ausschließlich `<<include>>`, `<<extend>>` oder Generalisierung
8. **Akteure nach Personen oder Stellenbezeichnungen Einzelner benannt:** Ein Akteur ist eine Rolle. Dieselbe Person kann in einem Anwendungsfall `Sachbearbeiter` und in einem anderen `Kunde` sein
9. **Pfeilspitzen an Assoziationen:** Die Assoziation drückt Beteiligung aus und trägt keine Richtung
10. **Diagramm ohne Beschreibungen:** Das Diagramm benennt die Anwendungsfälle, es spezifiziert sie nicht. Ein Projekt, das nur das Diagramm besitzt, hat ein Inhaltsverzeichnis und keinen Inhalt
11. **Technische Begriffe in Namen:** `POST /orders` oder `saveOrder()` sind Implementierung, keine von außen sichtbare Leistung. Der Name muss für den Auftraggeber verständlich sein
12. **Eckige Klammern für die Extend-Bedingung:** Die Bedingung ist ein Constraint und gehört deshalb in geschweifte Klammern, in eine Notiz an der Extend-Beziehung. `[Bedingung]` ist die Guard-Notation von [Aktivitäts-](./activity-diagram.md), [Zustands-](./state-machine-diagram.md) und [Sequenzdiagrammen](./sequence-diagram.md)

---

## Werkzeuge

- draw.io / diagrams.net (kostenlos, browserbasiert, UML-Formenbibliothek enthalten)
- PlantUML (textbasiert, das Diagramm wird aus Quelltext erzeugt und lässt sich versionieren)
- Mermaid (textbasiert, wird auf vielen Plattformen direkt in Markdown gerendert)
- Visual Paradigm, StarUML, Lucidchart (kommerziell, mit kostenlosen Tarifen)

## Siehe auch

- [UML-Überblick](./uml-overview.mdx): Einordnung der Diagrammarten in Struktur und Verhalten
- [Aktivitätsdiagramm](./activity-diagram.md): Detaillierung des Ablaufs eines einzelnen Anwendungsfalls
- [Sequenzdiagramm](./sequence-diagram.md): das Zusammenspiel von Akteur und System innerhalb eines Szenarios
- [Klassendiagramm](./class-diagram.md): das strukturelle Gegenstück, modelliert die Fachobjekte, auf denen die Anwendungsfälle arbeiten
