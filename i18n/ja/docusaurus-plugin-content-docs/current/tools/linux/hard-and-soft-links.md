---
title: "ハードリンクとソフトリンク"
description: "Linuxにおけるハードリンクとシンボリック(ソフト)リンク。その概要、違い、および`ln`コマンドによる作成と管理の方法。"
keywords:
    - Linux
    - ハードリンク
    - ソフトリンク
    - シンボリックリンク
    - symlink
    - ln
    - ファイルシステム
    - inode
machine_translated: true
---

# ハードリンクとソフトリンク

**リンク**とは、ファイルシステム内のあるパスから別のファイルまたはディレクトリへの参照である。Linuxは**ハードリンク**と**シンボリック(ソフト)リンク**の2種類をサポートする。どちらも`ln`コマンドで作成されるが、動作は大きく異なる。

## inode {/*#inodes*/}

Linuxファイルシステム上のすべてのファイルは**inode**によって識別される。inodeはディスク上の実データを指す番号である。ファイル名はinodeに対応付けられたラベルにすぎず、複数のファイル名が同じinodeを指すことができる。

```bash
ls -i file.txt    # Show the inode number of a file
```

## ハードリンク {/*#hard-links*/}

ハードリンクは、**同じinodeに対する別のファイル名**を作成する。どちらの名前もディスク上のまったく同じファイルを指す。どちらも「オリジナル」ではない。ファイルのデータは、そのファイルへの最後のハードリンクが削除されたときにのみ解放される。

### ハードリンクの作成 {/*#creating-a-hard-link*/}

```bash
ln target.txt linkname.txt
```

### 特性 {/*#properties*/}

- どちらの名前も同じinodeを共有する
- 一方の名前を削除しても、もう一方には影響しない
- ファイルシステムをまたげない。両方の名前が同じパーティション上に存在する必要がある
- ディレクトリにはリンクできない(システム用に予約された稀な例外を除く)
- 存在しないファイルにはリンクできない

### 例 {/*#example*/}

```bash
echo "hello" > original.txt
ln original.txt hardlink.txt
ls -li original.txt hardlink.txt
# 12345 -rw-r--r-- 2 user user 6 Apr 25 10:00 original.txt
# 12345 -rw-r--r-- 2 user user 6 Apr 25 10:00 hardlink.txt
rm original.txt
cat hardlink.txt    # still prints "hello"
```

## シンボリック(ソフト)リンク {/*#symbolic-soft-links*/}

シンボリックリンクは、別のファイルまたはディレクトリへの**パスを格納する**小さな特殊ファイルである。独自のinodeを持つ。ターゲットが移動または削除されると、シンボリックリンクは「ダングリング」状態となり、壊れる。

### シンボリックリンクの作成 {/*#creating-a-symbolic-link*/}

```bash
ln -s target.txt linkname.txt
```

### 特性 {/*#properties-1*/}

- ターゲットとは別の独自のinodeを持つ
- ファイルシステムを自由にまたげる
- ディレクトリにリンクできる
- 存在しないターゲットを指すことができる(壊れた/ダングリングリンク)
- ターゲットとして絶対パスまたは相対パスを使用できる

### 例 {/*#example-1*/}

```bash
echo "hello" > original.txt
ln -s original.txt softlink.txt
ls -li original.txt softlink.txt
# 12345 -rw-r--r-- 1 user user  6 Apr 25 10:00 original.txt
# 12346 lrwxrwxrwx 1 user user 12 Apr 25 10:00 softlink.txt -> original.txt
rm original.txt
cat softlink.txt    # error: No such file or directory
```

## ハードリンクとソフトリンクの比較 {/*#hard-vs-soft-links*/}

| 特性                           | ハードリンク                 | ソフトリンク |
| ------------------------------ | ---------------------------- | ------------ |
| 指す対象                       | inode                        | パス         |
| 独自のinode                    | なし(ターゲットと同じ)       | あり         |
| ファイルシステムをまたげるか   | 不可                         | 可           |
| ディレクトリにリンクできるか   | 不可                         | 可           |
| 存在しないファイルを指せるか   | 不可                         | 可           |
| ターゲット削除後も機能するか   | する                         | しない       |
| 作成コマンド                   | `ln`                      | `ln -s`      |

## `ln`の主なオプション {/*#common-ln-options*/}

| コマンド             | 説明                                                                              |
| -------------------- | --------------------------------------------------------------------------------- |
| `ln target name`     | ハードリンクを作成する                                                            |
| `ln -s target name`  | シンボリック(ソフト)リンクを作成する                                              |
| `ln -f target name`  | 既存の宛先ファイルを削除(上書き)する                                              |
| `ln -i target name`  | 既存の宛先を上書きする前に確認する                                                |
| `ln -b target name`  | 既存の宛先を置き換える前にバックアップする(ファイル名に`~`が付加される)       |
| `ln -v target name`  | リンクした各ファイルの名前を出力する(詳細表示)                                    |
| `ln -sf target name` | 同名の既存リンクを強制的に置き換える                                              |
| `readlink name`      | シンボリックリンクが指すパスを表示する                                            |
| `readlink -f name`   | すべてのシンボリックリンクを解決して正規の絶対パスにする                          |

## 使い分け {/*#when-to-use-which*/}

- **ハードリンク**は、同じファイルに対して複数の安定した名前を、追加のディスク容量を使わずに保持するのに有用である(例えば、変更のない内容を共有するバックアップスナップショット)。
- **ソフトリンク**は、ショートカットとしてより一般的な選択肢である。例えば、ツールのバージョンの切り替え(例: `/usr/bin/python => python3.12`)や、マウントポイントをまたいだファイルの参照である。
