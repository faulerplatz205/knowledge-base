---
title: "ファイルパス"
description: "ファイルシステムにおける絶対パスと相対パス。両者の違いと、特殊なパス要素 `/`、`.`、`..`、`~`。"
keywords:
    - ファイルパス
    - 絶対パス
    - 相対パス
    - 作業ディレクトリ
    - ファイルシステム
machine_translated: true
---

# ファイルパス

**パス**は、ファイルシステム内のファイルまたはディレクトリの場所を表す。記述方法は**絶対パス**と**相対パス**の2種類がある。

## 絶対パス {/*#absolute-paths*/}

絶対パスはファイルシステムの**ルート**から始まるため、現在の場所に関係なく一意に定まる。

- LinuxとmacOSではルートは `/` であり、例: `/home/user/notes.txt`
- Windowsではドライブ文字から始まり、例: `C:\Users\user\notes.txt`

## 相対パス {/*#relative-paths*/}

相対パスは、**現在の作業ディレクトリを基準**として解釈される。`/`(またはドライブ文字)では始まらない。

```bash
cd /home/user
cat notes.txt          # => /home/user/notes.txt
cat projects/app.js    # => /home/user/projects/app.js
```

## 特殊なパス要素 {/*#special-path-components*/}

| 要素 | 意味                                    |
| --------- | ------------------------------------------ |
| `/`       | ルートディレクトリ(絶対パスの開始点) |
| `.`       | カレントディレクトリ                      |
| `..`      | 親ディレクトリ(1階層上)        |
| `~`       | 現在のユーザーのホームディレクトリ          |

### 例 {/*#examples*/}

```bash
cd ..        # Move up one directory
cd ./bin     # Enter the bin directory below the current one
cd ~         # Go to the home directory
cat ../config.txt
```

## 作業ディレクトリ {/*#working-directory*/}

**作業ディレクトリ**は、プロセスが現在「いる」ディレクトリである。すべての相対パスが解決される際の基点となる。

```bash
pwd    # Print the current working directory
```
