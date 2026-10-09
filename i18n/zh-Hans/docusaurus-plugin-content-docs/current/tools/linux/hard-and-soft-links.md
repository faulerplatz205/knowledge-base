---
title: "硬链接和软链接"
description: "Linux 中的硬链接和符号（软）链接。它们是什么、有何区别，以及如何使用 `ln` 命令创建和管理它们。"
keywords:
    - Linux
    - 硬链接
    - 软链接
    - 符号链接
    - symlink
    - ln
    - 文件系统
    - inode
machine_translated: true
---

# 硬链接和软链接

**链接**是从文件系统中的一个路径指向另一个文件或目录的引用。Linux 支持两种类型：**硬链接**和**符号（软）链接**。两者都通过 `ln` 命令创建，但行为截然不同。

## inode {/*#inodes*/}

Linux 文件系统上的每个文件都由一个 **inode** 标识，它是指向磁盘上实际数据的编号。文件名只是映射到 inode 的标签，多个文件名可以指向同一个 inode。

```bash
ls -i file.txt    # Show the inode number of a file
```

## 硬链接 {/*#hard-links*/}

硬链接为**同一个 inode** 创建一个额外的**文件名**。两个名称指向磁盘上完全相同的文件，两者都不是“原件”。只有当指向该文件的最后一个硬链接被删除时，文件的数据才会被释放。

### 创建硬链接 {/*#creating-a-hard-link*/}

```bash
ln target.txt linkname.txt
```

### 属性 {/*#properties*/}

- 两个名称共享同一个 inode
- 删除其中一个名称不会影响另一个
- 不能跨文件系统，两个名称必须位于同一分区
- 不能链接目录（系统保留的少数例外除外）
- 不能链接到不存在的文件

### 示例 {/*#example*/}

```bash
echo "hello" > original.txt
ln original.txt hardlink.txt
ls -li original.txt hardlink.txt
# 12345 -rw-r--r-- 2 user user 6 Apr 25 10:00 original.txt
# 12345 -rw-r--r-- 2 user user 6 Apr 25 10:00 hardlink.txt
rm original.txt
cat hardlink.txt    # still prints "hello"
```

## 符号（软）链接 {/*#symbolic-soft-links*/}

符号链接是一个小型特殊文件，**存储**指向另一个文件或目录的**路径**。它拥有自己的 inode。如果目标被移动或删除，符号链接就会成为“悬空”的失效链接。

### 创建符号链接 {/*#creating-a-symbolic-link*/}

```bash
ln -s target.txt linkname.txt
```

### 属性 {/*#properties-1*/}

- 拥有独立于目标的自己的 inode
- 可以自由跨文件系统
- 可以链接目录
- 可以指向不存在的目标（失效/悬空链接）
- 目标可以使用绝对路径或相对路径

### 示例 {/*#example-1*/}

```bash
echo "hello" > original.txt
ln -s original.txt softlink.txt
ls -li original.txt softlink.txt
# 12345 -rw-r--r-- 1 user user  6 Apr 25 10:00 original.txt
# 12346 lrwxrwxrwx 1 user user 12 Apr 25 10:00 softlink.txt -> original.txt
rm original.txt
cat softlink.txt    # error: No such file or directory
```

## 硬链接与软链接对比 {/*#hard-vs-soft-links*/}

| 属性                   | 硬链接            | 软链接  |
| ---------------------- | ----------------- | ------- |
| 指向                   | inode             | 路径    |
| 有自己的 inode？       | 否（与目标相同）  | 是      |
| 可以跨文件系统？       | 否                | 是      |
| 可以链接目录？         | 否                | 是      |
| 可以指向不存在的文件？ | 否                | 是      |
| 目标被删除后仍有效？   | 是                | 否      |
| 创建命令               | `ln`           | `ln -s` |

## 常用 `ln` 选项 {/*#common-ln-options*/}

| 命令                 | 说明                                                       |
| -------------------- | ---------------------------------------------------------- |
| `ln target name`     | 创建硬链接                                                 |
| `ln -s target name`  | 创建符号（软）链接                                         |
| `ln -f target name`  | 删除（覆盖）已存在的目标文件                               |
| `ln -i target name`  | 在覆盖已存在的目标之前进行提示                             |
| `ln -b target name`  | 在替换已存在的目标之前进行备份（在文件名后追加 `~`）   |
| `ln -v target name`  | 打印每个被链接文件的名称（详细输出）                       |
| `ln -sf target name` | 强制替换同名的已有链接                                     |
| `readlink name`      | 显示符号链接所指向的路径                                   |
| `readlink -f name`   | 将所有符号链接解析为规范的绝对路径                         |

## 何时使用哪种 {/*#when-to-use-which*/}

- **硬链接**适用于为同一个文件保留多个稳定的名称（例如共享未更改内容的备份快照），且不占用额外的磁盘空间。
- **软链接**是创建快捷方式时更常见的选择。例如在工具的不同版本之间切换（如 `/usr/bin/python => python3.12`），或跨挂载点引用文件。
