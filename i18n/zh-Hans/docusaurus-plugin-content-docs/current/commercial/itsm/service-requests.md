---
title: 服务请求的分类
description: "ITSM 中传入服务请求的三种类型：事态、服务请求和事件，以及帮助台作为 SPOC 的角色"
keywords:
  - "服务请求"
  - "事件"
  - "事态"
  - "SPOC"
  - "帮助台"
  - "一线支持"
  - "问题跟踪系统"
  - "知识库"
tags:
  - ap2
machine_translated: true
---

# 服务请求的分类

## 概述 {/*#overview*/}

所有传入的消息都到达 IT 组织的中心点，即**单一联络点（Single Point of Contact，SPOC）**，也称为**帮助台（Helpdesk）**。帮助台可以按本地、分散或虚拟方式组织（多个帮助台对外表现为一个）。这一第一层级的协助也称为**一线支持（First Level Support）**。

传入消息从根本上分为三种类型：

## 三种类型 {/*#the-three-types*/}

### [事态（Event）](./event-management.md) {/*#event*/}

关于系统状态的**自动生成消息**。这类传入消息也称为 **Event**，无需用户直接报告，由监控系统生成。

### 服务请求 {/*#service-request*/}

**用户的正式请求**或支持请求，也称为 **Service Request**。包括一般性问题、忘记密码、程序使用说明或新设备申请。

### [事件（Incident）](./incident-management.md) {/*#incident*/}

关于服务**计划外中断**的**报告**，在 ITSM 中也称为 **Incident**。

## 问题跟踪系统 {/*#issue-tracking-system*/}

帮助台的**问题跟踪系统（Issue Tracking System）** 管理所有传入请求，并自动将其分配给空闲的帮助台人员。它可以详细查看故障和请求的历史记录。

也称为：**帮助台系统**或**支持工单系统**。

流程：

```text
Customer inquiry / disruption report
=> Create service ticket
=> Classify and prioritise (HW / SW / NW, urgency, impact)
=> Route to responsible team
=> Find and deliver solution
=> Document and close (incl. commercial aspects via CRM link)
```

分类和优先级排序的目的：确保由正确的团队处理工单，并能评估其严重程度。

## 知识库 {/*#knowledge-base*/}

一种用于自助查询的**基于知识的信息处理支持系统**。帮助台人员借助它快速找到已知问题（[已知错误](./problem-management.md#known-error-database-kedb)）的解决方案。

| 优点 | 缺点 |
| ------------------------------------------------------------------------------- | --------------------------------------------------- |
| 对重复出现的问题可快速作答 | 知识会过时 => 维护成本高 |
| 即使员工离职，知识仍留在公司内 => 避免知识断层 | 并非每个问题都有现成的解决方案 |
| 经济高效的故障排查 | 与客户的直接互动减少 |

## 请求履行流程 {/*#request-fulfillment-process*/}

**请求履行（Request Fulfillment）** 子流程负责处理服务请求（客户咨询）。其目标是高效处理 轻微变更和用户问题。

- 负责方：一线支持
- 所用工具：问题跟踪系统、知识库、手册
- 触发条件：客户就用户咨询联系支持人员
- 决策点：对用户咨询进行分类：求助 / 变更请求 / 密码请求（Hilfestellung / Änderungswunsch / Passwortanfrage）
