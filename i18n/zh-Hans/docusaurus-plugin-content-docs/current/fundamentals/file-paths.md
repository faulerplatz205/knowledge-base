---
title: "文件路径"
description: "文件系统中的绝对路径与相对路径。两者的区别以及特殊路径组成部分 `/`、`.`、`..` 和 `~`。"
keywords:
    - 文件路径
    - 绝对路径
    - 相对路径
    - 工作目录
    - 文件系统
machine_translated: true
---

# 文件路径

**路径**描述文件或目录在文件系统中的位置。有两种写法：**绝对路径**和**相对路径**。

## 绝对路径 {/*#absolute-paths*/}

绝对路径从文件系统的**根**开始，因此无论当前位置在哪里，都是明确无歧义的。

- 在 Linux 和 macOS 上，根为 `/`，例如 `/home/user/notes.txt`
- 在 Windows 上，以盘符开头，例如 `C:\Users\user\notes.txt`

## 相对路径 {/*#relative-paths*/}

相对路径相对于**当前工作目录**解析。它不以 `/`（或盘符）开头。

```bash
cd /home/user
cat notes.txt          # => /home/user/notes.txt
cat projects/app.js    # => /home/user/projects/app.js
```

## 特殊路径组成部分 {/*#special-path-components*/}

| 组成部分 | 含义                                    |
| --------- | ------------------------------------------ |
| `/`       | 根目录（绝对路径的起点） |
| `.`       | 当前目录                      |
| `..`      | 父目录（上一级）        |
| `~`       | 当前用户的主目录          |

### 示例 {/*#examples*/}

```bash
cd ..        # Move up one directory
cd ./bin     # Enter the bin directory below the current one
cd ~         # Go to the home directory
cat ../config.txt
```

## 工作目录 {/*#working-directory*/}

**工作目录**是进程当前所处的目录。所有相对路径都以它为基准进行解析。

```bash
pwd    # Print the current working directory
```
