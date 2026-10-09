---
title: "Tailscale"
description: "Tailscale 概述：基于 WireGuard 构建的网状 VPN，用于跨网络安全地连接设备。"
keywords:
  - "Tailscale"
  - "VPN"
  - "WireGuard"
  - "网状网络"
  - "Tailnet"
  - "零配置 VPN"
  - "网络"
machine_translated: true
---

# Tailscale

## 什么是 Tailscale？ {/*#what-is-tailscale*/}

Tailscale 是构建在 [WireGuard](../fundamentals/wireguard.md) 之上的零配置网状 VPN 服务。它将设备连接成一个名为“**tailnet**”的专用网络，无论设备位于何处，也无论其是否处于 NAT、防火墙之后或使用不同的 ISP。

与将所有流量经由中央网关路由的传统 VPN 不同，Tailscale 会尽可能在设备之间建立**直接的点对点连接**。这带来更低的延迟和更高的吞吐量。

---

## 架构 {/*#architecture*/}

Tailscale 有两个主要组成部分：

- **控制平面**：Tailscale 的协调服务器负责管理密钥交换、身份验证，并向所有节点分发网络配置。它从不接触实际流量。
- **数据平面**：实际流量通过加密的 WireGuard 隧道在节点之间直接传输，绕过 Tailscale 的服务器。

```text
Device A <===[WireGuard tunnel (direct P2P)]===> Device B
             (Tailscale control plane: key exchange only)
```

当无法建立直接连接时（例如两侧均有严格的防火墙），Tailscale 会回退到其 **DERP**（Designated Encrypted Relay for Packets）服务器，这些服务器中继加密数据包，但无法读取其内容。

---

## 核心概念 {/*#key-concepts*/}

### Tailnet {/*#tailnet*/}

tailnet 是所有已连接 Tailscale 的设备所构成的专用网络。同一 tailnet 上的设备可以彼此直接通信，就像处于同一个局域网中一样。

### 节点 {/*#nodes*/}

任何已注册到 Tailscale 并加入 tailnet 的设备（笔记本电脑、服务器、手机、Raspberry Pi）都称为**节点**。每个节点会在 `100.64.0.0/10` 范围（运营商级 NAT 地址空间）内获得一个稳定的私有 IP 地址。

### MagicDNS {/*#magicdns*/}

MagicDNS 会自动为 tailnet 中的每个节点分配易读的主机名（例如 `my-laptop`、`home-server`）。这意味着可以通过名称而非 IP 地址连接设备，无需手动配置任何 DNS。

### 出口节点 {/*#exit-nodes*/}

**出口节点**是将其他节点所有面向互联网的流量经由自身路由的节点。这适用于：

- 以仿佛来自其他位置的方式访问互联网
- 为所有设备强制使用单一出站 IP
- 在不受信任的网络（例如公共 Wi-Fi）上保护流量

### 子网路由器 {/*#subnet-routers*/}

**子网路由器**允许 Tailscale 节点对外通告对现有本地网络（子网）的访问。tailnet 的其他成员随后即可访问该子网上的设备，而无需在每台设备上安装 Tailscale。

```text
Tailnet Node (subnet router) <===> Local Network (192.168.1.0/24)
                                         |
                               [Non-Tailscale devices]
```

**典型用例：** 将家庭或办公室局域网开放给 tailnet 上的所有 Tailscale 设备。

### ACL（访问控制列表） {/*#acls-access-control-lists*/}

Tailscale 使用集中管理的 ACL 策略来控制哪些节点可以相互通信。规则在 Tailscale 管理控制台中以基于 JSON 的 HuJSON 格式编写。

---

## 优点 {/*#benefits*/}

- **零配置**：无需端口转发、防火墙规则或手动密钥管理
- **可在 NAT 后工作**：使用 NAT 穿透技术建立直接连接
- **端到端加密**：所有流量均由 WireGuard 加密；Tailscale 服务器从不接触载荷数据
- **跨平台**：支持 Linux、macOS、Windows、iOS、Android 等
- **基于身份的访问**：通过 SSO 提供商（Google、GitHub、Microsoft 等）进行身份验证

---

## 常见用例 {/*#common-use-cases*/}

| 用例                   | 方式                       |
| ---------------------- | -------------------------- |
| 远程访问家庭服务器     | 将服务器注册为节点         |
| 保护公共 Wi-Fi         | 通过出口节点路由流量       |
| 访问未安装 Tailscale 的设备 | 使用子网路由器        |
| 连接分布式团队         | 所有成员加入同一个 tailnet |
| 家庭实验室访问         | 将所有实验室机器注册为节点 |
