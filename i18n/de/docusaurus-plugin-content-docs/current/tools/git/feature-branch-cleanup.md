---
title: "Feature-Branch vor dem Merge aufräumen"
description: "Zwischenstände auf einem langlebigen Feature-Branch committen und pushen, die Historie per interaktivem Rebase aufräumen und per Rebase-Merge nach main bringen."
keywords:
    - Git
    - Feature-Branch
    - Interaktiver Rebase
    - git rebase -i
    - Fixup-Commit
    - Autosquash
    - Force-Push
    - force-with-lease
    - Rebase-Merge
    - Squash-Merge
    - Conventional Commits
---

# Feature-Branch vor dem Merge aufräumen

Zwischenstände auf einem Feature-Branch werden zur Sicherung committet und gepusht und vor dem Merge per interaktivem Rebase aufgeräumt. In `main` landen nur saubere, in sich abgeschlossene Commits, deren Nachrichten einer Konvention wie [Conventional Commits](https://www.conventionalcommits.org/) folgen können.

## Committen während der Entwicklung

Nachricht und Granularität dieser Commits spielen noch keine Rolle.

```bash
git switch -c feat/user-export
git commit -am "wip"
git push -u origin feat/user-export
```

Ein **Fixup-Commit** markiert eine Korrektur an einem früheren Commit direkt als solche. Git stellt seiner Nachricht dann `fixup!` und den Betreff des Ziel-Commits voran, wodurch der Rebase ihn später automatisch einsortieren und zusammenführen kann.

```bash
git commit --fixup=<commit-hash>
```

## Interaktiver Rebase

`git rebase -i origin/main` schreibt die Commits des Branches neu und setzt den Branch auf den aktuellen Stand von `main`.

```bash
git fetch origin
git rebase -i --autosquash origin/main
```

Git öffnet dann einen Editor mit einer Todo-Liste, in der der älteste Commit oben steht. Jede Zeile beginnt mit einem Befehl:

| Befehl   | Kurz | Wirkung                                                                     |
| -------- | ---- | --------------------------------------------------------------------------- |
| `pick`   | `p`  | Commit unverändert übernehmen                                               |
| `reword` | `r`  | Commit übernehmen, Nachricht bearbeiten                                     |
| `squash` | `s`  | Mit dem vorherigen Commit zusammenführen und beide Nachrichten kombinieren  |
| `fixup`  | `f`  | Mit dem vorherigen Commit zusammenführen und die eigene Nachricht verwerfen |

Durch Umsortieren der Zeilen werden Commits verschoben. Ein `squash` oder `fixup` wird immer mit der direkt darüberliegenden Zeile zusammengeführt. `--autosquash` verschiebt jeden `fixup!`-Commit unter seinen Ziel-Commit und setzt ihn automatisch auf `fixup`. Mit `git config --global rebase.autoSquash true` lässt sich das zum Standard machen.

Ein Konflikt hält den Rebase beim betroffenen Commit an. `git add` und `git rebase --continue` setzen ihn nach dem Auflösen fort, `git rebase --abort` bricht ihn stattdessen ab und stellt den vorherigen Stand wieder her.

## Force-Push

Der Rebase erzeugt neue Commits mit neuen Hashes, daher muss der Remote-Branch überschrieben werden:

```bash
git push --force-with-lease
```

Im Gegensatz zu `--force` überschreibt `--force-with-lease` den Remote-Branch nur, wenn er noch auf dem zuletzt abgerufenen Stand ist. Hat jemand anderes zwischenzeitlich gepusht, schlägt der Push fehl.

## Rebase-Merge

Ein Rebase-Merge setzt die aufgeräumten Commits einzeln auf `main`, heißt aber auf jeder Plattform anders:

- **GitHub:** "Rebase and merge"
- **GitLab:** Merge-Methode "Fast-forward merge" in den Projekteinstellungen
- **Lokal:** `git switch main` und anschließend `git merge --ff-only feat/user-export`

## Beispiel

Historie des Feature-Branches nach mehreren Tagen, ältester Commit zuerst:

```text
a1f3c2e wip
b7d9e01 export endpoint works
c2e8a4f fix typo
d4b1f9a extract csv writer
e9c7b32 tests
f0a6d18 fixup! export endpoint works
```

Todo-Liste nach dem Umsortieren für `git rebase -i --autosquash origin/main`:

```text
reword a1f3c2e wip
fixup b7d9e01 export endpoint works
fixup f0a6d18 fixup! export endpoint works
fixup c2e8a4f fix typo
reword d4b1f9a extract csv writer
reword e9c7b32 tests
```

Historie nach dem Rebase, mit den neuen Nachrichten:

```text
8d2f4b0 feat(export): add user export endpoint
3c91e7a refactor(export): extract csv writer into separate module
5a7e1c9 test(export): cover user export endpoint
```

Nach `git push --force-with-lease` und einem Rebase-Merge stehen diese drei Commits in `main`.

## Häufige Fehler

1. **Teil-Branches für Zwischenstände:** Eigene Branches pro Tag oder pro Schritt erzeugen Merge-Aufwand, ohne zusätzliche Sicherheit zu bringen. Commits auf dem Feature-Branch sichern die Arbeit genauso gut, weil die Historie vor dem Merge ohnehin aufgeräumt wird.
2. **Squash-Merge nach dem Aufräumen:** Der Squash-Merge verwirft die Commit-Struktur, die der interaktive Rebase erzeugt hat. `main` erhält dann einen einzigen Commit mit einem einzigen Conventional-Commits-Typ, und `git bisect` kann einen Fehler nur noch auf das ganze Feature eingrenzen.
3. **`git push --force` statt `--force-with-lease`:** Ein reines `--force` überschreibt den Remote-Branch bedingungslos, sodass Commits, die jemand anderes zwischenzeitlich gepusht hat, ohne Warnung verloren gehen.
4. **`--force-with-lease` bei Hintergrund-Fetch:** Eine IDE oder ein anderes Werkzeug, das im Hintergrund `git fetch` ausführt, aktualisiert den Remote-Tracking-Branch, sodass `--force-with-lease` Commits, die jemand anderes zwischenzeitlich gepusht hat, als bekannt behandelt und überschreibt. `git push --force-with-lease --force-if-includes` (ab Git 2.30) lehnt den Push zusätzlich ab, solange die Commits des Remote-Tracking-Branches nicht in den lokalen Branch übernommen wurden.
5. **Umschreiben von `main` oder einem anderen geteilten Branch:** Alle, die auf den alten Commits aufgebaut haben, erhalten eine auseinandergelaufene Historie. Interaktiver Rebase und Force-Push gehören nur auf den eigenen Feature-Branch.
6. **Rebase auf ein veraltetes `main`:** Ohne vorheriges `git fetch` zeigt `origin/main` auf einen alten Stand, sodass Konflikte mit neueren Änderungen erst im Merge-Request auftauchen.
