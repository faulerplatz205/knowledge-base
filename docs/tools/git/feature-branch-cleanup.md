---
title: "Cleaning Up a Feature Branch Before Merging"
description: "Committing and pushing work in progress on a long-running feature branch, cleaning up the history with an interactive rebase and bringing it into main with a rebase merge."
keywords:
    - Git
    - Feature Branch
    - Interactive Rebase
    - git rebase -i
    - Fixup Commit
    - Autosquash
    - Force Push
    - force-with-lease
    - Rebase Merge
    - Squash Merge
    - Conventional Commits
---

# Cleaning Up a Feature Branch Before Merging

Intermediate states on a feature branch are committed and pushed as a backup and cleaned up with an interactive rebase before the merge. `main` only receives clean, self-contained commits, whose messages can follow a convention such as [Conventional Commits](https://www.conventionalcommits.org/).

## Committing During Development

Message and granularity of these commits do not matter yet.

```bash
git switch -c feat/user-export
git commit -am "wip"
git push -u origin feat/user-export
```

A correction to an earlier commit can be marked as such right away with a **fixup commit**. Git then prefixes its message with `fixup!` and the subject of the target commit, which lets the rebase sort and merge it automatically later.

```bash
git commit --fixup=<commit-hash>
```

## Interactive Rebase

`git rebase -i origin/main` rewrites the commits of the branch and moves the branch onto the current state of `main`.

```bash
git fetch origin
git rebase -i --autosquash origin/main
```

Git then opens a todo list in an editor, with the oldest commit at the top. Each line starts with a command:

| Command  | Short | Effect                                                           |
| -------- | ----- | ---------------------------------------------------------------- |
| `pick`   | `p`   | Keep the commit unchanged                                        |
| `reword` | `r`   | Keep the commit, edit the message                                |
| `squash` | `s`   | Merge into the previous commit and combine both messages         |
| `fixup`  | `f`   | Merge into the previous commit and discard this commit's message |

Lines can be reordered to move commits. A `squash` or `fixup` always merges into the line directly above it. `--autosquash` moves every `fixup!` commit below its target and sets it to `fixup` automatically. With `git config --global rebase.autoSquash true`, this can be made the default.

A conflict stops the rebase at the affected commit. `git add` and `git rebase --continue` resume it once the conflict is resolved; `git rebase --abort` instead cancels it and restores the previous state.

## Force Push

The rebase creates new commits with new hashes, so the remote branch has to be overwritten:

```bash
git push --force-with-lease
```

Unlike `--force`, `--force-with-lease` only overwrites the remote branch if it is still at the state last fetched. If someone else has pushed in the meantime, the push fails instead.

## Rebase Merge

A rebase merge places the cleaned-up commits on top of `main` one by one, but is named differently on each platform:

- **GitHub:** "Rebase and merge"
- **GitLab:** Merge method "Fast-forward merge" in the project settings
- **Local:** `git switch main` followed by `git merge --ff-only feat/user-export`

## Example

History of the feature branch after several days, oldest commit first:

```text
a1f3c2e wip
b7d9e01 export endpoint works
c2e8a4f fix typo
d4b1f9a extract csv writer
e9c7b32 tests
f0a6d18 fixup! export endpoint works
```

Todo list after reordering for `git rebase -i --autosquash origin/main`:

```text
reword a1f3c2e wip
fixup b7d9e01 export endpoint works
fixup f0a6d18 fixup! export endpoint works
fixup c2e8a4f fix typo
reword d4b1f9a extract csv writer
reword e9c7b32 tests
```

History after the rebase, with the new messages:

```text
8d2f4b0 feat(export): add user export endpoint
3c91e7a refactor(export): extract csv writer into separate module
5a7e1c9 test(export): cover user export endpoint
```

After `git push --force-with-lease` and a rebase merge, these three commits are in `main`.

## Common Mistakes

1. **Partial branches for intermediate states:** Separate branches per day or per step add merge work without adding safety. Commits on the feature branch protect the work equally well, because the history is cleaned up before the merge anyway.
2. **Squash merge after a cleanup:** The squash merge discards the commit structure that the interactive rebase created. `main` then receives a single commit with a single Conventional Commits type, and `git bisect` can only narrow a bug down to the whole feature.
3. **`git push --force` instead of `--force-with-lease`:** Plain `--force` overwrites the remote branch unconditionally, so commits that someone else pushed in the meantime are lost without a warning.
4. **`--force-with-lease` with background fetching:** An IDE or another tool that runs `git fetch` in the background updates the remote-tracking branch, so `--force-with-lease` treats commits that someone else pushed in the meantime as known and overwrites them. `git push --force-with-lease --force-if-includes` (Git 2.30 and later) additionally rejects the push as long as the commits of the remote-tracking branch have not been integrated into the local branch.
5. **Rewriting `main` or another shared branch:** Everyone who has based work on the old commits gets a diverged history. Interactive rebase and force push belong only on one's own feature branch.
6. **Rebasing on an outdated `main`:** Without `git fetch` beforehand, `origin/main` points to an old state, so conflicts with newer changes only appear in the merge request.
