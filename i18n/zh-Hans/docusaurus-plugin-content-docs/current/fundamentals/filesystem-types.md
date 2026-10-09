---
title: "文件系统类型"
description: "常见文件系统类型（FAT32、exFAT、NTFS、ext4、APFS、btrfs）及其典型用途、限制和平台支持概述。"
keywords:
    - 文件系统
    - FAT32
    - exFAT
    - NTFS
    - ext4
    - APFS
    - btrfs
machine_translated: true
---

# 文件系统类型

**文件系统**定义数据在存储设备上的组织和存储方式。不同文件系统在最大文件大小、日志支持以及可读写它们的操作系统方面各不相同。

## 概览 {/*#overview*/}

| 文件系统 | 最大文件大小 | 日志          | 典型用途                                    |
| ---------- | ------------- | ------------------- | ---------------------------------------------- |
| FAT32      | 4 GB          | 否                  | U 盘、SD 卡，兼容性广泛      |
| exFAT      | 16 EB         | 否                  | 跨平台使用的大容量 U 盘和 SD 卡 |
| NTFS       | 16 EB         | 是                 | Windows 系统盘和数据盘                 |
| ext4       | 16 TB         | 是                 | Linux 默认文件系统                       |
| APFS       | 8 EB          | 是（写时复制） | macOS 默认文件系统                       |
| btrfs      | 16 EB         | 是（写时复制） | Linux，支持快照和存储池              |

## 选择文件系统 {/*#choosing-a-filesystem*/}

- **最大兼容性（小文件）：** 几乎所有设备都能读写 FAT32，但单个文件限制为 4 GB。
- **最大兼容性（大文件）：** exFAT 取消了 4 GB 的限制，可在 Linux、Windows 和 macOS 上使用。
- **仅 Linux：** ext4 是稳妥的默认选择；btrfs 额外提供快照及其他高级功能。
- **仅 Windows：** NTFS 支持权限、日志和大容量卷。
- **仅 macOS：** APFS 针对 SSD 进行了优化，是现代的默认选择。
