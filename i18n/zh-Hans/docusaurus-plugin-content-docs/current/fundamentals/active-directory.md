---
title: "Active Directory"
description: "Active Directory 与域控制器的核心概念：逻辑结构、信任、LDAP 命名、漫游配置文件和组策略。"
keywords:
    - Active Directory
    - 域控制器
    - 组织单位
    - 林
    - LDAP
    - 可分辨名称
    - 组策略
    - GPO
machine_translated: true
---

# Active Directory

**Active Directory（AD）** 是一种目录服务，在 Windows 环境中提供集中的身份与访问管理。用户、计算机和资源由集中管理，而不必逐台配置每台机器。**域控制器（Domain Controller，DC）** 是承载 Active Directory 域服务（AD DS）的 Windows Server。

域控制器需要一个唯一的名称（例如 `dc1`）、一个静态 IP 地址和一个正常工作的 DNS 服务器；先安装“Active Directory 域服务”角色，然后将服务器提升为域控制器。

## 逻辑结构 {/*#logical-structure*/}

Active Directory 将逻辑结构与物理结构（站点、子网、DC）分开。其逻辑构件如下：

- **对象（Object）** – 最小的可管理单元；每个网络资源（用户、计算机、打印机等）均由一个对象表示。
- **组织单位（Organizational Unit，OU）** – 对对象（用户、计算机、组）进行分组的容器，用于对公司结构建模。OU 也用于链接组策略。
- **域（Domain）** – 容纳 Active Directory 的核心单元。安全策略在域内适用，域必须至少有一个 DC。
- **树（Tree）** – 按层级排列的多个域，共享连续的命名空间（例如 `de.abc.com` 位于 `abc.com` 之下）。
- **林（Forest）** – 一棵或多棵树，通常具有不同的命名空间。各域独立工作，但可以跨林通信。

## 全局编录 {/*#global-catalog*/}

**全局编录（global catalog）** 是用于在整个林中搜索对象的数据库，包括位于其他命名空间中的对象。每个 AD 站点应至少托管一个带有全局编录副本的 DC。

## 信任 {/*#trusts*/}

**信任（trust）** 描述两个域之间的关系：信任域接受来自被信任域的身份验证。

- **单向** – 单个方向的信任 / **双向** – 两个方向的信任
- **可传递** – 信任延伸至其他信任 / **不可传递** – 仅适用于明确配置的信任

默认设置为**双向且可传递**。

## LDAP 与命名 {/*#ldap-and-naming*/}

**LDAP**（轻量目录访问协议）用于访问目录服务。

- **可分辨名称（Distinguished Name，DN）** – 对象唯一的“LDAP 路径”，使用 `CN`（Common Name）、`OU`（Organizational Unit）和 `DC`（Domain Component），例如 `CN=HPjet5, OU=Assistenz, DC=Firma, DC=DE`。
- **规范名称（Canonical Name）** – 以 DNS 域名格式表示的相同信息，例如 `HPjet5.Assistenz.firma.de`。

## 漫游配置文件 {/*#roaming-profiles*/}

**漫游配置文件（roaming profile）** 集中存储在服务器上，使用户在任何域计算机上都能获得相同的环境。配置文件在登录时复制到该计算机，注销时同步回服务器。

- **优点** – 在每台计算机上环境相同。
- **缺点** – 需要大量存储空间；登录/注销可能较慢。

**SYSVOL** 和 **NETLOGON** 共享在服务器被提升为 DC 时创建。它们存储客户端获取的组策略和登录脚本。

## 功能级别 {/*#functional-levels*/}

提升 DC 时，需要选择**林功能级别**和**域功能级别**。它们定义哪些 AD 功能可用，并保证运行不同 Windows Server 版本的 DC 能够互操作（向后兼容）。更高的级别提供更多功能，但不可逆转。域可以运行在高于林的级别，但不能低于林。

## 组策略（GPO） {/*#group-policies-gpo*/}

**组策略（Group policies）** 是用于强制实施设置（例如密码策略、电源设置、访问限制）的配置指令。它们存储在 Active Directory 中，并通过复制在整个域内可用。**组策略对象（Group Policy Object，GPO）** 存储各项设置，并**链接**到其应影响的对象。GPO 包含针对用户和计算机的独立设置，并作用于 OU 中包含的用户和计算机账户，而不是作用于组。

### 处理顺序 {/*#processing-order*/}

组策略可以链接到站点、域或 OU；每台计算机还有一个本地策略。处理顺序为 **L-S-D-OU**：

1. **本地（Local）**
2. **站点（Site）**
3. **域（Domain）**
4. **OU**

后一步会覆盖前一步中相冲突的设置。因此本地策略的优先级最低，OU 策略的优先级最高。如果在同一级别链接了多个 GPO，则由链接顺序决定（链接值最低者生效，因为它最后处理）。

### 刷新 {/*#refresh*/}

组策略设置在客户端上大约每 **90 分钟**、在域控制器上每 **5 分钟**于后台刷新一次。可以使用 `gpupdate /force` 强制刷新。文件夹重定向是个例外：它仅在用户登录时应用。
