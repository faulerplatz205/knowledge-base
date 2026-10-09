---
title: "Tailscale"
description: "Tailscaleの概要: ネットワークをまたいでデバイスを安全に接続するための、WireGuardをベースにしたメッシュVPN。"
keywords:
  - "Tailscale"
  - "VPN"
  - "WireGuard"
  - "メッシュネットワーク"
  - "Tailnet"
  - "ゼロコンフィグVPN"
  - "ネットワーク"
machine_translated: true
---

# Tailscale

## Tailscaleとは {/*#what-is-tailscale*/}

Tailscaleは、[WireGuard](../fundamentals/wireguard.md)の上に構築された、設定不要のメッシュVPNサービスである。デバイスの場所や、NAT、ファイアウォール、異なるISPの背後にあるかどうかにかかわらず、デバイスを「**tailnet**」と呼ばれるプライベートネットワークに接続する。

すべてのトラフィックを中央のゲートウェイ経由でルーティングする従来のVPNとは異なり、Tailscaleは可能な限りデバイス間に**直接のピアツーピア接続**を確立する。その結果、低遅延かつ高スループットが得られる。

---

## アーキテクチャ {/*#architecture*/}

Tailscaleには2つの主要なコンポーネントがある。

- **コントロールプレーン:** Tailscaleのコーディネーションサーバーが、鍵交換と認証を管理し、ネットワーク構成をすべてのノードに配布する。実際のトラフィックを見ることは一切ない。
- **データプレーン:** 実際のトラフィックは、Tailscaleのサーバーを経由せず、暗号化されたWireGuardトンネルを通じてノード間を直接流れる。

```text
Device A <===[WireGuard tunnel (direct P2P)]===> Device B
             (Tailscale control plane: key exchange only)
```

直接接続が不可能な場合(例: 両側に厳格なファイアウォールがある場合)、Tailscaleは**DERP**(Designated Encrypted Relay for Packets)サーバーにフォールバックする。DERPサーバーは暗号化されたパケットを中継するが、その内容を読むことはできない。

---

## 主要な概念 {/*#key-concepts*/}

### Tailnet {/*#tailnet*/}

tailnetは、Tailscaleに接続されたすべてのデバイスが形成するプライベートネットワークである。同じtailnet上のデバイスは、同じローカルネットワーク上にあるかのように、互いに直接通信できる。

### ノード {/*#nodes*/}

Tailscaleに登録され、tailnetに参加しているデバイス(ノートPC、サーバー、スマートフォン、Raspberry Piなど)は**ノード**と呼ばれる。各ノードは、`100.64.0.0/10`の範囲(Carrier-Grade NAT空間)で安定したプライベートIPアドレスを取得する。

### MagicDNS {/*#magicdns*/}

MagicDNSは、tailnet内のすべてのノードに、人間が読めるホスト名(例: `my-laptop`、`home-server`)を自動的に割り当てる。これにより、DNSを手動で設定することなく、IPアドレスの代わりに名前でデバイスに接続できる。

### 出口ノード {/*#exit-nodes*/}

**出口ノード**(exit node)とは、他のノードからのインターネット向けトラフィックをすべて自身経由でルーティングするノードである。次の用途に有用である。

- 別の場所からアクセスしているかのようにインターネットへアクセスする
- すべてのデバイスに対して単一の送信元IPを強制する
- 信頼できないネットワーク(例: 公衆Wi-Fi)上のトラフィックを保護する

### サブネットルーター {/*#subnet-routers*/}

**サブネットルーター**は、Tailscaleノードが既存のローカルネットワーク(サブネット)へのアクセスをアドバタイズできるようにする。tailnetの他のメンバーは、各デバイスにTailscaleをインストールしなくても、そのサブネット上のデバイスに到達できる。

```text
Tailnet Node (subnet router) <===> Local Network (192.168.1.0/24)
                                         |
                               [Non-Tailscale devices]
```

**典型的なユースケース:** 自宅やオフィスのLANを、tailnet上のすべてのTailscaleデバイスに公開する。

### ACL(アクセス制御リスト) {/*#acls-access-control-lists*/}

Tailscaleは、どのノード同士が通信できるかを制御するために、一元管理されたACLポリシーを使用する。ルールは、Tailscale管理コンソールでJSONベースのHuJSON形式で記述される。

---

## 利点 {/*#benefits*/}

- **設定不要:** ポートフォワーディング、ファイアウォールルール、手動の鍵管理が不要
- **NATの背後でも動作:** NAT越えの技術を用いて直接接続を確立する
- **エンドツーエンドで暗号化:** すべてのトラフィックはWireGuardによって暗号化され、Tailscaleのサーバーはペイロードデータを一切見ない
- **クロスプラットフォーム:** Linux、macOS、Windows、iOS、Androidなどで利用可能
- **IDベースのアクセス:** SSOプロバイダー(Google、GitHub、Microsoftなど)による認証

---

## 一般的なユースケース {/*#common-use-cases*/}

| ユースケース                    | 方法                               |
| ------------------------------- | ---------------------------------- |
| 自宅サーバーへのリモートアクセス | サーバーをノードとして登録する     |
| 公衆Wi-Fiの保護                 | 出口ノード経由でトラフィックをルーティングする |
| Tailscaleのないデバイスへの到達 | サブネットルーターを使用する       |
| 分散チームの接続                | 全メンバーが同じtailnetに参加する  |
| ホームラボへのアクセス          | ラボのすべてのマシンをノードとして登録する |
