---
title: "WireGuard"
description: "WireGuard 概述：一种采用先进加密技术的现代、快速的 VPN 协议。"
keywords:
  - "WireGuard"
  - "VPN"
  - "隧道"
  - "加密"
  - "网络"
  - "UDP"
machine_translated: true
---

# WireGuard

## 什么是 WireGuard？ {/*#what-is-wireguard*/}

WireGuard 是一种现代 VPN 协议，用于在设备之间建立加密隧道。其设计目标是比 IPsec 或 OpenVPN 等旧协议简单且快速得多，代码量也小得多（约 4,000 行，而旧协议为数十万行）。

WireGuard 工作在 **[网络层](./osi-model.md#layer-3--network)（第 3 层）**，并在每台设备上创建一个虚拟网络接口。经由该接口路由的流量会被加密，并通过 UDP 发送给对等节点。

---

## 工作原理 {/*#how-it-works*/}

WireGuard 使用一种称为 **cryptokey routing**（加密密钥路由）的概念：每个对等节点由其公钥标识，且每个对等节点定义哪些 IP 地址可通过该节点到达。

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

当发出数据包的目标 IP 与某个对等节点的 `AllowedIPs` 匹配时，WireGuard 会对其加密并发送到该节点的 `Endpoint`。收到的数据包经解密后，仅当其来自已知公钥且源 IP 位于该对等节点的 `AllowedIPs` 范围内时才会被接受。

---

## 核心概念 {/*#key-concepts*/}

### 密钥对 {/*#key-pairs*/}

每个 WireGuard 接口都有一个**私钥**和一个由其派生的**公钥**。公钥通过带外方式（手动，或借助 [Tailscale](../tools/tailscale.md) 等工具）交换，并作为对等节点的身份标识。

### 接口 {/*#interface*/}

WireGuard **接口**是设备上的虚拟网络接口（例如 `wg0`）。它拥有自己的 IP 地址，并在配置的端口上监听传入的 UDP 数据包。

### 对等节点 {/*#peer*/}

**对等节点**（peer）是允许该接口与之通信的任何其他 WireGuard 接口。每个对等节点条目定义以下内容：

- **PublicKey**：对等节点的公钥
- **AllowedIPs**：其流量经由该对等节点路由的 IP 范围
- **Endpoint** *（可选）*：对等节点的实际 IP 地址和 UDP 端口

### AllowedIPs {/*#allowedips*/}

`AllowedIPs` 具有双重作用：

- **出站**：充当路由规则，发往这些 IP 的数据包会被发送到该对等节点
- **入站**：充当过滤器，来自该对等节点的数据包仅在其源 IP 位于此范围内时才会被接受

设置 `AllowedIPs = 0.0.0.0/0` 会将所有流量经由某个对等节点路由，这是出口节点 / 全隧道 VPN 配置的基础。

---

## 加密技术 {/*#cryptography*/}

WireGuard 使用固定的现代加密套件，不存在协商过程，因此消除了一整类降级攻击：

| 用途             | 算法               |
| ---------------- | ------------------ |
| 密钥交换         | Curve25519 (ECDH)  |
| 对称加密         | ChaCha20           |
| 认证             | Poly1305 (MAC)     |
| 哈希             | BLAKE2s            |
| 密钥派生         | HKDF               |

---

## 与其他 VPN 协议的比较 {/*#comparison-to-other-vpn-protocols*/}

| 属性             | WireGuard     | OpenVPN        | IPsec            |
| ---------------- | ------------- | -------------- | ---------------- |
| 代码量           | 约 4,000 行   | 约 70,000 行   | 非常庞大         |
| 协议             | 仅 UDP        | TCP 或 UDP     | UDP / ESP        |
| 配置             | 简单          | 复杂           | 复杂             |
| 性能             | 非常快        | 中等           | 较快             |
| 加密技术         | 固定、现代    | 可配置         | 可配置           |
| NAT 穿透         | 内置          | 有限           | 需要额外组件     |

---

## 与 Tailscale 的关系 {/*#relation-to-tailscale*/}

WireGuard 仅负责**数据平面** => 对对等节点之间的数据包进行加密和路由，不负责对等节点发现、密钥分发或访问控制。

[Tailscale](../tools/tailscale.md) 构建在 WireGuard 之上，并增加了托管的**控制平面**：自动密钥交换、对等节点发现、NAT 穿透、MagicDNS 和 ACL。这样无需任何手动配置即可获得 WireGuard 的性能。
