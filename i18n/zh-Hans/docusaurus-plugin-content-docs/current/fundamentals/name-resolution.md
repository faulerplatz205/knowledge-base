---
title: "名称解析"
description: "为何需要名称解析，以及 Windows 和 Linux 网络中常见系统的概述：DNS、LLMNR、NetBIOS 和 mDNS。"
keywords:
    - 名称解析
    - DNS
    - LLMNR
    - NetBIOS
    - mDNS
    - Namensauflösung
tags:
    - ap2
machine_translated: true
---

# 名称解析

联网的计算机通过唯一地址（IP 地址、MAC 地址）进行标识，并借助这些地址通信。由于数字地址难以记忆，因此改用名称。**名称解析**是将名称（例如计算机名）映射到其地址（例如 IP 地址）的机制。

## 解析系统 {/*#resolution-systems*/}

Windows 和 Linux 网络中存在多种系统：

| 系统      | 范围                    | 说明                                                                                                                              |
| ----------- | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| **DNS**     | 整个网络 / 互联网 | 最重要的系统，Active Directory 必需。UDP 端口 `53`，最多 255 个字符（例如 `pc01.bs1-landshut.de`）            |
| **LLMNR**   | 仅限同一子网         | 链路本地多播名称解析（Link Local Multicast Name Resolution，自 Windows Vista 起），用于工作组。使用多播，支持 IPv6，无需配置 |
| **NetBIOS** | 同一子网 / 旧版     | 在 Windows Vista 之前用于查找计算机。最多 15 个字符，端口 `137/138/139/445`                                          |
| **mDNS**    | 局域网，链路本地          | 多播 DNS（由 Apple 开发），顶级域 `.local`，无需名称服务器。Linux 上的实现为 `avahi`                          |

## DNS {/*#dns*/}

DNS（Domain Name System，域名系统）是主要的名称解析系统，也是互联网上名称解析的基础。详细内容参见 [DNS](./dns.md)。

## LLMNR {/*#llmnr*/}

LLMNR 仅在同一子网内解析名称，面向小型工作组。它使用多播而非广播（网络流量更少），并且与 NetBIOS 不同，支持 IPv6。它无法解析较旧系统（例如 Windows Server 2003、Windows XP）的名称。

## NetBIOS {/*#netbios*/}

NetBIOS（NetBIOS over TCP/IP，NetBT/NBT）在 Windows 2000/Vista 之前十分重要，用于在网络中浏览计算机。当 DNS 未配置且 LLMNR 被禁用或无法解析名称时，它被用作后备方案。

## mDNS {/*#mdns*/}

mDNS（Multicast DNS）使用链路本地顶级域 `.local` 下的多播消息，无需专用名称服务器即可在局域网中实现名称解析。自 Windows 11 22H2 起，Microsoft 计划让 mDNS 同时取代 NetBIOS 和 LLMNR。
