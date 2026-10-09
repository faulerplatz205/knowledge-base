---
title: "名前解決"
description: "名前解決が必要な理由と、WindowsおよびLinuxネットワークで一般的な方式の概要: DNS、LLMNR、NetBIOS、mDNS。"
keywords:
    - 名前解決
    - DNS
    - LLMNR
    - NetBIOS
    - mDNS
    - Namensauflösung
tags:
    - ap2
machine_translated: true
---

# 名前解決

ネットワークに接続されたコンピューターは、一意のアドレス(IPアドレス、MACアドレス)で識別され、これらを使って通信する。数値のアドレスは人間が覚えにくいため、代わりに名前が使われる。**名前解決**は、名前(例: コンピューター名)をそのアドレス(例: IPアドレス)に対応付ける仕組みである。

## 名前解決の方式 {/*#resolution-systems*/}

WindowsおよびLinuxネットワーク向けに、複数の方式が存在する。

| 方式      | 範囲                    | 備考                                                                                                                              |
| ----------- | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| **DNS**     | ネットワーク全体 / インターネット | 最も重要な方式で、Active Directoryに必須。UDPポート `53`、最大255文字(例: `pc01.bs1-landshut.de`)            |
| **LLMNR**   | 同一サブネットのみ         | Link Local Multicast Name Resolution (Windows Vista以降)。ワークグループ向け。マルチキャストを使用し、IPv6に対応し、設定は不要 |
| **NetBIOS** | 同一サブネット / レガシー     | Windows Vista以前にコンピューターを見つけるために使われた。最大15文字、ポート `137/138/139/445`                                          |
| **mDNS**    | LAN、リンクローカル          | Multicast DNS (Appleが開発)。TLDは `.local` で、ネームサーバーは不要。Linuxでの実装は `avahi`                          |

## DNS {/*#dns*/}

DNS (Domain Name System) は主要な名前解決方式であり、インターネット上の名前解決の基盤である。詳細は[DNS](./dns.md)で扱われている。

## LLMNR {/*#llmnr*/}

LLMNRは同一サブネット内でのみ名前を解決し、小規模なワークグループを想定している。ブロードキャストの代わりにマルチキャストを使用し(ネットワークトラフィックが少ない)、NetBIOSとは異なりIPv6に対応している。古いシステム(例: Windows Server 2003、Windows XP)の名前は解決できない。

## NetBIOS {/*#netbios*/}

NetBIOS (NetBIOS over TCP/IP、NetBT/NBT) はWindows 2000/Vistaまで重要であり、ネットワーク上のコンピューターを閲覧するために使われた。DNSが設定されておらず、LLMNRが無効であるか名前を解決できない場合のフォールバックとして使われる。

## mDNS {/*#mdns*/}

mDNS (Multicast DNS) は、リンクローカルのTLD `.local` の下でマルチキャストメッセージを使用し、専用のネームサーバーなしにLANでの名前解決を可能にする。Windows 11 22H2以降、MicrosoftはmDNSがNetBIOSとLLMNRの両方を置き換えることを意図している。
