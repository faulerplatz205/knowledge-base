---
title: "服务模型（IaaS、PaaS、SaaS）"
sidebar_position: 2
description: "本地部署、基础设施即服务、平台即服务、函数即服务与软件即服务详解"
keywords:
    - "IaaS"
    - "PaaS"
    - "SaaS"
    - "云服务模型"
    - "基础设施即服务"
    - "平台即服务"
    - "软件即服务"
    - "FaaS"
    - "函数即服务"
    - "无服务器"
tags:
    - ap2
machine_translated: true
---

# 云服务模型

## 概览 {/*#overview*/}

云计算服务通常分为三种主要服务模型，各自提供不同程度的控制权与灵活性。

| 服务模型                                                                    | 客户管理                                    | 提供商管理                                                                     | 示例                                                 |
| --------------------------------------------------------------------------- | ------------------------------------------- | ------------------------------------------------------------------------------ | ---------------------------------------------------- |
| **[本地部署](#on-premise)**                                                 | 全部                                        | 无                                                                             | 自有数据中心、本地服务器                             |
| **[IaaS](#infrastructure-as-a-service-iaas)**（基础设施即服务）             | 操作系统、中间件、运行时、数据、应用程序    | 虚拟化、服务器、存储、网络                                                     | AWS EC2、Azure VMs、Google Compute Engine            |
| **[PaaS](#platform-as-a-service-paas)**（平台即服务）                       | 数据、应用程序                              | 运行时、中间件、操作系统、虚拟化、服务器、存储、网络                           | Heroku、Google App Engine、Azure App Service、Vercel |
| **[FaaS](#function-as-a-service-faas--serverless)**（函数即服务）           | 单个函数、数据                              | 运行时、扩缩容、中间件、操作系统、虚拟化、服务器、存储、网络                   | AWS Lambda、Azure Functions、Cloudflare Workers      |
| **[SaaS](#software-as-a-service-saas)**（软件即服务）                       | 仅配置                                      | 全部                                                                           | Gmail、Salesforce、Microsoft 365、Dropbox            |

---

## 本地部署（On-Premise） {/*#on-premise*/}

### 定义 {/*#definition*/}

本地部署（On-Premise，也称 "on-prem"）是指在组织自有场所内本地运行和管理全部 IT 基础设施。不涉及任何云提供商。组织拥有、运营并维护从物理硬件到应用程序的一切。

### 包含内容 {/*#what-is-included*/}

- 物理服务器与硬件
- 对所有层级的完全控制
- 数据保留在组织自有场所内
- 不依赖外部提供商

### 职责 {/*#responsibilities*/}

**组织管理：**

- 物理硬件（服务器、存储、网络）
- 虚拟化
- 操作系统
- 中间件
- 运行时环境
- 应用程序
- 数据
- 安全、备份、灾难恢复

### 使用场景 {/*#use-cases*/}

- **严格的合规要求：** 数据监管严格的行业（例如政府、医疗、金融）
- **遗留系统：** 无法迁移到云端的应用程序
- **低延迟需求：** 要求网络延迟极低的系统
- **完全的数据主权：** 将敏感数据完全保留在内部

### 优点 {/*#advantages*/}

- 对硬件和软件拥有完全控制权
- 数据不会离开组织场所
- 无持续的云订阅费用
- 不依赖互联网连接
- 更易满足严格的数据监管要求

### 缺点 {/*#disadvantages*/}

- 前期资本投入高（硬件、场地、制冷）
- 需要专职 IT 人员进行维护
- 扩容需要采购并安装新硬件
- 对所有更新、补丁和安全承担全部责任
- 硬件可能过时

---

## 基础设施即服务（IaaS） {/*#infrastructure-as-a-service-iaas*/}

### 定义 {/*#definition-1*/}

IaaS 仅通过互联网提供虚拟化的计算资源，提供构建自定义云 IT 基础设施的基本组件。

### 包含内容 {/*#what-is-included-1*/}

- 虚拟机
- 存储
- 网络
- 操作系统镜像

### 职责 {/*#responsibilities-1*/}

**客户管理：**

- 操作系统
- 应用程序
- 数据
- 运行时环境
- 中间件

**提供商管理：**

- 物理服务器
- 存储硬件
- 网络设备
- 虚拟化层

### 使用场景 {/*#use-cases-1*/}

- **测试与开发：** 快速创建和销毁测试环境
- **网站托管：** 在完全控制基础设施的前提下托管网站
- **存储与备份：** 大规模数据存储方案
- **高性能计算：** 计算密集型工作负载

### 优点 {/*#advantages-1*/}

- 对基础设施拥有完全控制权
- 按使用量付费的定价模式
- 高度可扩展
- 无需维护物理硬件

### 缺点 {/*#disadvantages-1*/}

- 需要技术专长
- 安全补丁和更新完全由客户负责
- 管理开销高于 PaaS/SaaS

### 示例 {/*#examples*/}

- Amazon Web Services (AWS) EC2
- Microsoft Azure Virtual Machines
- Google Compute Engine
- Hetzner

---

## 平台即服务（PaaS） {/*#platform-as-a-service-paas*/}

### 定义 {/*#definition-2*/}

PaaS 提供一个平台，使客户无需处理基础设施即可开发、运行和管理应用程序。

### 包含内容 {/*#what-is-included-2*/}

- **开箱即用的运行时环境**（Node.js、Python、Java、PHP 等）
- **托管数据库**（PostgreSQL、MySQL、MongoDB、Redis）
- **自动部署**（通过 Git 推送代码 => 自动构建）
- **内置扩缩容**（应用程序根据流量自动扩缩）
- **开发工具**（日志、监控、调试）

### 职责 {/*#responsibilities-2*/}

**客户管理：**

- 应用程序
- 数据

**提供商管理：**

- 运行时环境
- 中间件
- 操作系统
- 虚拟化
- 服务器、存储、网络

### 使用场景 {/*#use-cases-2*/}

- **应用开发：** 无需顾虑基础设施即可构建应用
- **API 开发与管理：** 创建并托管 API
- **微服务架构：** 部署容器化应用程序

### 优点 {/*#advantages-2*/}

- 开发和部署更快
- 内置可扩展性
- 降低管理复杂度
- 专注于代码而非基础设施
- 集成的开发工具

### 缺点 {/*#disadvantages-2*/}

- 控制权低于 IaaS
- 可能产生供应商锁定
- 可能不支持所有编程语言/框架
- 定制选项有限

### 示例 {/*#examples-1*/}

- Heroku
- Google App Engine
- Microsoft Azure App Service
- Red Hat OpenShift
- AWS Elastic Beanstalk
- Vercel、Netlify

---

## 函数即服务（FaaS）/ 无服务器 {/*#function-as-a-service-faas--serverless*/}

### 定义 {/*#definition-3*/}

FaaS 是 PaaS 的逻辑延续：部署的单位不再是应用程序，而是单个函数。函数并不常驻运行：由事件触发启动，处理该事件后即停止。

"无服务器"（Serverless）是对这种运行模式的更广义称呼，但容易引起误解：服务器依然存在，只是对客户不再可见、不可管理。除 FaaS 外，该术语还涵盖遵循同一原则的托管服务，例如无服务器数据库、对象存储和消息队列。

### 包含内容 {/*#what-is-included-3*/}

- **事件驱动执行：** HTTP 请求、定时器、队列中的消息、文件上传、数据库变更
- **从零开始自动扩缩：** 空闲时无实例，高负载时有大量并行实例
- **无需容量规划：** 无需实例数量、机器规格和自动扩缩规则
- **按调用计费：** 按执行时间和内存计费，通常精确到毫秒
- **集成的日志与监控** 由平台提供

### 职责 {/*#responsibilities-3*/}

**客户管理：**

- 函数代码及其依赖项
- 配置：触发器、权限、环境变量、内存和超时
- 数据与外部状态

**提供商管理：**

- 运行时环境及其更新
- 扩缩容，包括并行实例的数量
- 中间件、操作系统、虚拟化
- 服务器、存储、网络

### 特性 {/*#properties*/}

| 特性         | 对设计的影响                                                                                   |
| ------------ | ---------------------------------------------------------------------------------------------- |
| 无状态       | 函数在两次调用之间不保留状态。状态应存放在数据库、缓存或对象存储中                             |
| 冷启动       | 空闲一段时间后的首次调用需要额外时间启动运行时，这对延迟敏感的请求较为明显                     |
| 执行时限     | 调用在达到最大运行时间后会被中止。因此长时间运行的任务必须拆分                                 |
| 事件驱动     | 函数仅在事件触发时运行，无法自行启动                                                           |
| 从零开始扩缩 | 负载激增会产生大量并行冷启动                                                                   |

### 使用场景 {/*#use-cases-3*/}

- **API 与 Webhook：** 负载不规则或不可预测的端点
- **事件处理：** 响应上传、队列消息或数据库变更
- **定时任务：** 按定时器执行的清理、报表、导入
- **胶水代码：** 两个服务之间的小型转换
- **图像与文件处理：** 上传后生成缩略图

### 优点 {/*#advantages-3*/}

- 无需服务器管理，无需容量规划
- 成本与负载精确匹配，空闲时间不收费
- 从构想到部署端点非常快
- 扩缩容由平台负责

### 缺点 {/*#disadvantages-3*/}

- 冷启动使延迟更难预测
- 每个函数的运行时间、内存和包大小受限
- 触发器和权限模型因提供商而异，供应商锁定严重
- 调试和本地测试比常驻运行的应用程序更困难
- 大量小函数使逻辑分散，整体行为更难理解
- 在持续高负载下，常驻实例通常更便宜

### 示例 {/*#examples-2*/}

- AWS Lambda
- Azure Functions
- Google Cloud Functions / Cloud Run Functions
- Cloudflare Workers
- Vercel Functions、Netlify Functions

---

## 软件即服务（SaaS） {/*#software-as-a-service-saas*/}

### 定义 {/*#definition-4*/}

SaaS 通过互联网交付功能完整的应用程序。用户通过网络浏览器访问软件，无需安装或维护。

### 包含内容 {/*#what-is-included-4*/}

- 开箱即用的应用程序
- 自动更新
- 可通过任何联网设备访问
- 多租户架构

### 职责 {/*#responsibilities-4*/}

**客户管理：**

- 用户配置
- 数据录入
- 访问权限

**提供商管理：**

- 其余全部（应用程序、数据、运行时、中间件、操作系统、基础设施）

### 使用场景 {/*#use-cases-4*/}

- **电子邮件与通信：** 企业邮件、即时消息
- **客户关系管理（CRM）**
- **协作工具：** 文档共享、项目管理
- **办公效率：** 文字处理、电子表格、演示文稿
- **人力资源：** 薪资、招聘、员工管理

### 优点 {/*#advantages-4*/}

- 无需安装或维护
- 自动更新
- 前期成本较低
- 易于使用和扩展

### 缺点 {/*#disadvantages-4*/}

- 无法控制基础设施，完全依赖运营公司
- 定制能力有限
- 数据安全顾虑（数据存储在云端外部）
- 订阅费用可能累积增加
- 依赖互联网连接

### 示例 {/*#examples-3*/}

- **Google Workspace**（Gmail、Google Docs、Drive）
- **Microsoft 365**（Outlook、Word、Excel、Teams）
- **ADITO**（CRM）
- **Slack**（团队沟通）
- **Dropbox**（文件存储）
- **Zoom**（视频会议）

---

## 披萨类比 {/*#the-pizza-analogy*/}

- **本地部署：** 在家自己做披萨
- **IaaS：** 购买披萨面团和配料，在家烘烤
- **PaaS：** 订购自选配料的披萨并送货上门
- **FaaS：** 饿了才买一块，按块付费（不会保温存放）
- **SaaS：** 在披萨餐厅用餐

---

## 其他服务模型 {/*#additional-service-models*/}

除三种核心模型和 [FaaS](#function-as-a-service-faas--serverless) 之外，还有更多专门的服务模型：

### 数据库即服务（DBaaS） {/*#database-as-a-service-dbaas*/}

- 托管数据库解决方案
- 示例：Amazon RDS、Azure SQL Database、MongoDB Atlas

### 容器即服务（CaaS） {/*#container-as-a-service-caas*/}

- 容器编排平台
- 示例：Amazon ECS、Google Kubernetes Engine、Azure Kubernetes Service

### 桌面即服务（DaaS） {/*#desktop-as-a-service-daas*/}

- 通过云交付的虚拟桌面
- 示例：Amazon WorkSpaces、Azure Virtual Desktop、Citrix DaaS

### 后端即服务（BaaS） {/*#backend-as-a-service-baas*/}

- 后端由提供商管理，前端由客户管理
- 示例：Supabase、Firebase
