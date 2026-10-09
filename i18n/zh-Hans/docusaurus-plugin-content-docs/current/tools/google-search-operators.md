---
title: "Google 搜索运算符"
description: "Google 高级搜索运算符和技巧概述，用于获得更精确的搜索结果。"
keywords:
    - Google
    - 搜索
    - 搜索运算符
    - Google Dorking
    - 高级搜索
machine_translated: true
---

# Google 搜索运算符

## 精确匹配 {/*#exact-match*/}

将短语用双引号括起来，即可搜索该确切的词序列。

```text
"dependency injection in Angular"
```

仅返回包含该确切短语的结果，而不是仅分别提及其中单个词的页面。

## 排除词项 {/*#exclude-terms*/}

在词前直接使用 `-`，即可排除包含该词项的结果。

```text
python -snake
```

搜索 “python”，但排除与蛇有关的页面。

## OR 运算符 {/*#or-operator*/}

在词项之间使用 `OR`（大写），即可查找包含任一词项的页面。

```text
React OR Vue
```

## 通配符 {/*#wildcard*/}

在精确匹配的短语中，使用 `*` 作为未知词的占位符。

```text
"how to * a REST API"
```

## 站点搜索 {/*#site-search*/}

使用 `site:` 将结果限制在特定域名。

```text
site:developer.mozilla.org flexbox
```

也可以针对顶级域名：

```text
site:edu machine learning
```

## 文件类型 {/*#file-type*/}

使用 `filetype:` 查找特定的文件格式。

```text
filetype:pdf network security
```

常见文件类型：`pdf`、`docx`、`xlsx`、`pptx`、`csv`、`xml`、`json`、`txt`

## URL、标题和文本过滤器 {/*#url-title-and-text-filters*/}

- `inurl:` — 词项必须出现在 URL 中
- `intitle:` — 词项必须出现在页面标题中
- `intext:` — 词项必须出现在正文中
- `allinurl:`、`allintitle:`、`allintext:` — 后面的所有词项都必须出现在相应位置

```text
intitle:cheatsheet javascript
```

```text
allinurl:api docs v2
```

## 日期范围 {/*#date-range*/}

使用 `before:` 和 `after:`，日期采用 `YYYY-MM-DD` 格式。

```text
"React Server Components" after:2025-01-01
```

## 相关站点与缓存 {/*#related-and-cache*/}

- `related:` — 查找与给定域名相似的站点
- `cache:` — 查看页面的 Google 缓存版本

```text
related:stackoverflow.com
```

## 组合运算符 {/*#combining-operators*/}

运算符可以组合使用，实现高度精准的搜索。

```text
site:github.com filetype:md "contributing guidelines"
```

```text
"error handling" site:stackoverflow.com -closed after:2024-01-01
```

```text
intitle:resume filetype:pdf site:edu "computer science"
```
