---
title: "WireGuard"
description: "WireGuardの概要: 最先端の暗号技術を用いた、モダンで高速なVPNプロトコル。"
keywords:
  - "WireGuard"
  - "VPN"
  - "トンネリング"
  - "暗号"
  - "ネットワーク"
  - "UDP"
machine_translated: true
---

# WireGuard

## WireGuardとは {/*#what-is-wireguard*/}

WireGuardは、デバイス間に暗号化されたトンネルを作成するモダンなVPNプロトコルである。IPsecやOpenVPNなどの従来のプロトコルよりも大幅にシンプルかつ高速になるよう設計されており、コードベースもはるかに小さい(約4,000行に対して数十万行)。

WireGuardは**[ネットワーク層](./osi-model.md#layer-3--network)(レイヤー3)**で動作し、各デバイス上に仮想ネットワークインターフェースを作成する。このインターフェースを経由するトラフィックは暗号化され、UDPでピアに送信される。

---

## 仕組み {/*#how-it-works*/}

WireGuardは**暗号鍵ルーティング**(cryptokey routing)という概念を用いる。すべてのピアは公開鍵で識別され、各ピアはそのピアを経由して到達可能なIPアドレスを定義する。

```text
[Interface]
PrivateKey = <your private key>
Address    = 10.0.0.1/24
ListenPort = 51820

[Peer]
PublicKey  = <peer's public key>
AllowedIPs = 10.0.0.2/32
Endpoint   = 203.0.113.5:51820
```

送信パケットの宛先IPがピアの`AllowedIPs`に一致すると、WireGuardはパケットを暗号化してそのピアの`Endpoint`に送信する。受信パケットは復号され、既知の公開鍵から届き、かつ送信元IPがそのピアの`AllowedIPs`の範囲内にある場合にのみ受け入れられる。

---

## 主要な概念 {/*#key-concepts*/}

### 鍵ペア {/*#key-pairs*/}

各WireGuardインターフェースは**秘密鍵**と、そこから導出される**公開鍵**を持つ。公開鍵は帯域外で(手動で、または[Tailscale](../tools/tailscale.md)のようなツールによって)交換され、ピアの識別情報として機能する。

### インターフェース {/*#interface*/}

WireGuardの**インターフェース**は、デバイス上の仮想ネットワークインターフェース(例: `wg0`)である。独自のIPアドレスを持ち、設定されたポートで受信UDPパケットを待ち受ける。

### ピア {/*#peer*/}

**ピア**とは、このインターフェースが通信を許可されている他のWireGuardインターフェースである。各ピアのエントリは次を定義する。

- **PublicKey:** ピアの公開鍵
- **AllowedIPs:** このピアを経由してトラフィックがルーティングされるIP範囲
- **Endpoint** *(任意)*: ピアの実際のIPアドレスとUDPポート

### AllowedIPs {/*#allowedips*/}

`AllowedIPs`は二重の目的を果たす。

- **送信:** ルーティングルールとして機能し、これらのIP宛のパケットはこのピアに送信される
- **受信:** フィルターとして機能し、このピアからのパケットは、送信元IPがこの範囲内にある場合にのみ受け入れられる

`AllowedIPs = 0.0.0.0/0`を設定すると、すべてのトラフィックがピアを経由してルーティングされ、これはエグジットノード/フルトンネルVPN構成の基礎となる。

---

## 暗号技術 {/*#cryptography*/}

WireGuardは固定のモダンな暗号スイートを使用する。ネゴシエーションが存在しないため、ダウングレード攻撃の一群が排除される。

| 用途                | アルゴリズム       |
| ------------------- | ------------------ |
| 鍵交換              | Curve25519 (ECDH)  |
| 共通鍵暗号          | ChaCha20           |
| 認証                | Poly1305 (MAC)     |
| ハッシュ            | BLAKE2s            |
| 鍵導出              | HKDF               |

---

## 他のVPNプロトコルとの比較 {/*#comparison-to-other-vpn-protocols*/}

| 特性               | WireGuard    | OpenVPN     | IPsec          |
| ------------------ | ------------ | ----------- | -------------- |
| コードベースの規模 | 約4,000行    | 約70,000行  | 非常に大きい   |
| プロトコル         | UDPのみ      | TCPまたはUDP | UDP / ESP     |
| 設定               | シンプル     | 複雑        | 複雑           |
| パフォーマンス     | 非常に高速   | 中程度      | 高速           |
| 暗号技術           | 固定、モダン | 設定可能    | 設定可能       |
| NAT越え            | 組み込み     | 限定的      | 追加要素が必要 |

---

## Tailscaleとの関係 {/*#relation-to-tailscale*/}

WireGuardは**データプレーン**のみを担当する => ピア間でパケットを暗号化しルーティングする。ピアの検出、鍵の配布、アクセス制御は扱わない。

[Tailscale](../tools/tailscale.md)はWireGuardの上に構築されており、管理された**コントロールプレーン**を追加する。具体的には、自動的な鍵交換、ピアの検出、NAT越え、MagicDNS、ACLである。これにより、手動での設定なしにWireGuardのパフォーマンスが得られる。
