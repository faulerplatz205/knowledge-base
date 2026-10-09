---
title: "HTTP 状态码"
description: "按类别分组的最常见 HTTP 状态码概述。"
keywords:
    - HTTP
    - 状态码
    - 响应码
    - HTTP 状态
tags:
    - ap2
machine_translated: true
---

# HTTP 状态码

## 概述 {/*#overview*/}

HTTP 状态码是服务器响应客户端请求时返回的三位数字。它们表明请求是成功、被重定向，还是导致了错误。状态码按第一位数字分为五类。

## 1xx - 信息响应 {/*#1xx---informational*/}

请求已被接收，服务器正在继续处理。

| 状态码 | 名称                | 说明                                                       |
| ------ | ------------------- | ---------------------------------------------------------- |
| 100    | Continue            | 服务器已收到请求头，客户端应继续发送请求体。               |
| 101    | Switching Protocols | 服务器正在切换到客户端请求的协议（例如 WebSocket 升级）。   |

### 示例 {/*#examples*/}

- **100 Continue**：客户端使用 `Expect: 100-continue` 标头发送大文件上传。服务器以 `100` 响应，表示客户端应继续发送请求体。
- **101 Switching Protocols**：客户端发送带有 `Upgrade: websocket` 的 HTTP 请求。服务器以 `101` 响应，并切换到 WebSocket 协议。

## 2xx - 成功 {/*#2xx---success*/}

请求已被成功接收、理解并接受。

| 状态码 | 名称       | 说明                                                   |
| ------ | ---------- | ------------------------------------------------------ |
| 200    | OK         | 请求成功。响应体包含所请求的数据。                     |
| 201    | Created    | 成功创建了新资源（通常在 `POST` 之后）。                |
| 204    | No Content | 请求成功，但没有可返回的内容（通常在 `DELETE` 之后）。     |

### 示例 {/*#examples-1*/}

- **200 OK**：`GET /api/users/42` => 服务器以 JSON 形式返回用户对象。
- **201 Created**：带有请求体的 `POST /api/users` => 服务器创建该用户，并返回带有 `Location` 标头的新资源。
- **204 No Content**：`DELETE /api/users/42` => 服务器删除该用户并返回空响应。

## 3xx - 重定向 {/*#3xx---redirection*/}

客户端必须采取进一步操作才能完成请求。

| 状态码 | 名称               | 说明                                             |
| ------ | ------------------ | ------------------------------------------------ |
| 301    | Moved Permanently  | 资源已永久移动到新的 URL。                       |
| 302    | Found              | 资源临时位于另一个 URL。                         |
| 304    | Not Modified       | 自上次请求以来资源未发生变化（用于缓存）。       |
| 307    | Temporary Redirect | 与 302 类似，但重定向时请求方法不得更改。         |
| 308    | Permanent Redirect | 与 301 类似，但重定向时请求方法不得更改。         |

### 示例 {/*#examples-2*/}

- **301 Moved Permanently**：`GET /old-page` => 服务器以 `301` 和 `Location: /new-page` 响应。搜索引擎会相应地更新其索引。
- **302 Found**：`GET /promo` => 服务器临时重定向到 `/current-sale`。原始 URL 对未来的请求仍然有效。
- **304 Not Modified**：客户端发送带有 `If-None-Match` 标头（包含缓存的 ETag）的 `GET /style.css`。服务器确认资源未发生变化，并返回不带响应体的 `304`。
- **307 Temporary Redirect**：`POST /api/submit` => 服务器临时重定向到 `/api/v2/submit`。客户端必须重新发送 `POST` 请求（而不是将其改为 `GET`）。
- **308 Permanent Redirect**：`POST /api/old-endpoint` => 服务器永久重定向到 `/api/new-endpoint`。客户端必须向新 URL 重新发送 `POST` 请求。

## 4xx - 客户端错误 {/*#4xx---client-error*/}

请求在客户端一侧包含错误。

| 状态码 | 名称                   | 说明                                                                                                                  |
| ------ | ---------------------- | --------------------------------------------------------------------------------------------------------------------- |
| 400    | Bad Request            | 由于语法格式错误或输入无效，服务器无法处理该请求。                                                                    |
| 401    | Unauthorized           | 需要身份验证，但尚未提供或无效。                                                                                      |
| 403    | Forbidden              | 服务器理解该请求，但拒绝授权。                                                                                        |
| 404    | Not Found              | 所请求的资源在服务器上不存在。                                                                                        |
| 405    | Method Not Allowed     | 所请求的资源不支持所使用的 HTTP 方法。                                                                                |
| 408    | Request Timeout        | 服务器在等待客户端完成发送请求时超时。                                                                                |
| 409    | Conflict               | 请求与资源的当前状态冲突（例如重复条目）。                                                                            |
| 413    | Content Too Large      | 请求体超出了服务器的大小限制。                                                                                        |
| 415    | Unsupported Media Type | 服务器不支持请求体的媒体类型。                                                                                        |
| 418    | I'm a Teapot           | 服务器拒绝煮咖啡，因为它是一个茶壶（[RFC 2324](https://datatracker.ietf.org/doc/html/rfc2324)）。                       |
| 422    | Unprocessable Content  | 请求语法正确，但语义无效（例如验证错误）。                                                                            |
| 429    | Too Many Requests      | 客户端在给定的时间段内发送了过多请求（速率限制）。                                                                    |

### 示例 {/*#examples-3*/}

- **400 Bad Request**：带有 `{ name: }` 的 `POST /api/users` => JSON 请求体格式错误，无法解析。
- **401 Unauthorized**：不带 `Authorization` 标头的 `GET /api/profile` => 服务器要求身份验证。
- **403 Forbidden**：对非管理员用户使用有效令牌的 `DELETE /api/users/1` => 该用户已通过身份验证，但缺少权限。
- **404 Not Found**：`GET /api/users/99999` => 不存在具有该 ID 的用户。
- **405 Method Not Allowed**：`DELETE /api/login` => `/api/login` 端点仅支持 `POST`。
- **408 Request Timeout**：客户端打开连接并开始发送大型请求体，但在传输中途停滞。服务器在超时后关闭连接。
- **409 Conflict**：带有 `{ "email": "a@b.com" }` 的 `POST /api/users` => 具有该电子邮件的用户已存在。
- **413 Content Too Large**：上传 500 MB 文件的 `POST /api/upload` => 服务器的上传限制为 50 MB。
- **415 Unsupported Media Type**：带有 `Content-Type: text/xml` 的 `POST /api/data` => 该端点仅接受 `application/json`。
- **418 I'm a Teapot**：`BREW /coffee` => 茶壶礼貌地拒绝了。
- **422 Unprocessable Content**：带有 `{ "email": "not-an-email" }` 的 `POST /api/users` => JSON 有效，但电子邮件字段未通过验证。
- **429 Too Many Requests**：客户端每分钟向 `/api/search` 发送 1000 个请求 => 服务器强制执行速率限制，并以 `429` 和 `Retry-After` 标头响应。

## 5xx - 服务器错误 {/*#5xx---server-error*/}

服务器未能完成一个有效的请求。

| 状态码 | 名称                  | 说明                                                       |
| ------ | --------------------- | ---------------------------------------------------------- |
| 500    | Internal Server Error | 服务器上发生了意外错误。                                   |
| 502    | Bad Gateway           | 充当网关或代理的服务器从上游服务器收到了无效响应。         |
| 503    | Service Unavailable   | 服务器暂时无法处理请求（例如过载或正在维护）。             |
| 504    | Gateway Timeout       | 充当网关或代理的服务器未能及时收到上游服务器的响应。       |

### 示例 {/*#examples-4*/}

- **500 Internal Server Error**：`GET /api/reports` => 服务器代码中出现未处理的异常（例如空指针、除以零）。
- **502 Bad Gateway**：反向代理（例如 Nginx）将请求转发到后端，而后端返回了乱码或不完整的响应。
- **503 Service Unavailable**：服务器正在进行计划内维护或过载，暂时无法处理请求。通常包含 `Retry-After` 标头。
- **504 Gateway Timeout**：反向代理将请求转发到响应时间过长的后端（例如缓慢的数据库查询超过了代理的超时时间）。
