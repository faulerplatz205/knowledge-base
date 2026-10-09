---
title: "正则表达式"
description: "正则表达式语法、字符类、量词、锚点、分组、环视以及常用模式概述。"
keywords:
    - "正则表达式"
    - "Regex"
    - "模式匹配"
    - "字符类"
    - "量词"
    - "锚点"
    - "先行断言"
    - "后行断言"
    - "分组"
tags:
    - ap2
machine_translated: true
---

# 正则表达式

## 概述 {/*#overview*/}

正则表达式（regex）是用于匹配字符串中字符组合的模式。几乎所有编程语言和许多命令行工具（例如 `grep`、`sed`、`awk`）都支持它。正则引擎会扫描输入字符串，并检查模式是否（以及在何处）匹配。

## 基础 {/*#basics*/}

### 字符类 {/*#character-classes*/}

匹配所定义集合中的**单个字符**。

| 语法   | 含义                               |
| -------- | ------------------------------------- |
| `.`      | 除换行符外的任意字符          |
| `[abc]`  | `a`、`b` 或 `c` 之一               |
| `[^abc]` | 除 `a`、`b` 或 `c` 之外的任意字符 |
| `[a-z]`  | 任意小写字母                  |
| `[0-9]`  | 任意数字                  |
| `\d`     | 数字（`[0-9]`）                       |
| `\D`     | 非数字（`[^0-9]`）                  |
| `\w`     | 单词字符（`[a-zA-Z0-9_]`）       |
| `\W`     | 非单词字符（`[^a-zA-Z0-9_]`）  |
| `\s`     | 空白字符（`[ \t\n\r\f\v]`）          |
| `\S`     | 非空白字符（`[^\t\n\r\f\v]`）      |

#### 示例 {/*#examples*/}

```text
Pattern: [A-Z]\w+
Input:   "Hello World 123"
Matches: Hello, World
```

`[A-Z]` 匹配一个大写字母，随后 `\w+` 匹配其后的一个或多个单词字符。`123` 开头没有大写字母，因此被跳过。`\w` 确实包含数字，但 `[A-Z]` 将第一个字符限定为仅限字母。

```text
Pattern: \d\d\d
Input:   "Call 555-1234"
Matches: 555, 123
```

三个连续的数字。`-` 打断了序列，因此 `1234` 会产生两个重叠的窗口，但只有 `123` 作为完整的三位数字组匹配（随后引擎从 `4` 处继续，而它本身不足以匹配）。

### 量词 {/*#quantifiers*/}

控制前面的元素必须出现**多少次**。

| 语法  | 含义                               |
| ------- | ------------------------------------- |
| `*`     | 0 次或多次 [（贪婪）](#greedy-vs-lazy) |
| `+`     | 1 次或多次 [（贪婪）](#greedy-vs-lazy) |
| `?`     | 0 次或 1 次（可选）                     |
| `{n}`   | 恰好 n 次                       |
| `{n,}`  | n 次或更多次                       |
| `{n,m}` | n 到 m 次                 |

#### 示例 {/*#examples-1*/}

```text
Pattern: colou?r
Input:   "color and colour"
Matches: color, colour
```

`?` 使 `u` 成为可选，因此 `color`（`u` 出现 0 次）和 `colour`（`u` 出现 1 次）都能匹配。

```text
Pattern: \d{2,4}
Input:   "1 22 333 4444 55555"
Matches: 22, 333, 4444, 5555
```

匹配 2 到 4 个连续数字。`1` 太短。`55555` 得到 `5555`（贪婪，因此引擎取最大值 4），剩余的 `5` 太短，无法再次匹配。

### 锚点 {/*#anchors*/}

匹配一个**位置**而不是字符。

| 语法 | 含义                            |
| ------ | ---------------------------------- |
| `^`    | 字符串开头（使用 `m` 时为行首） |
| `$`    | 字符串结尾（使用 `m` 时为行尾）   |
| `\b`   | 单词边界                      |
| `\B`   | 非单词边界                  |

#### 示例 {/*#examples-2*/}

```text
Pattern: \bcat\b
Matches: "the cat sat"    => cat
No match: "concatenate"
```

`\b` 标记单词字符与非单词字符之间的边界。在 `concatenate` 中，`cat` 被其他字母包围，因此 `\b` 不会在这些位置匹配。

```text
Pattern: ^\d+
Input:   "42 is the answer"
Match:   42
```

`^` 将匹配锚定在字符串开头。随后 `\d+` 从该位置起匹配一个或多个数字。由于 `42` 位于最开头，因此匹配成功。

```text
Pattern: \.$
Input:   "End of sentence."
Match:   .
```

`$` 将匹配锚定在字符串结尾。`\.` 匹配字面量的点（需要转义，因为 `.` 通常表示“任意字符”）。二者合起来匹配字符串末尾的一个点。

### 分组与选择 {/*#groups-and-alternation*/}

圆括号 `()` 创建分组，用于捕获匹配到的子串。

```text
Pattern: (foo)(bar)
Input:   foobar
Group 1: foo
Group 2: bar
```

每对 `()` 创建一个编号分组。完整匹配为 `foobar`，而分组使得可以单独访问 `foo` 和 `bar`（例如用于搜索替换或提取）。

竖线 `|` 相当于逻辑“或”。

```text
Pattern: cat|dog
Matches: cat, dog
```

引擎先尝试 `cat`，如果在当前位置失败，则尝试 `dog`。

```text
Pattern: (\d{3})-(\d{4})
Input:   "555-1234"
Group 1: 555
Group 2: 1234
```

分组可以分别捕获结构化字符串的各个部分。此处区号和号码被拆分为两个分组，而 `-` 被匹配但不被捕获。

### 标志 {/*#flags*/}

标志用于修改模式的应用方式。

| 标志 | 名称             | 效果                                   |
| ---- | ---------------- | ---------------------------------------- |
| `g`  | 全局           | 查找所有匹配，而不仅是第一个     |
| `i`  | 不区分大小写 | 忽略大小写                  |
| `m`  | 多行        | `^` 和 `$` 匹配每一行的开头/结尾 |
| `s`  | Dotall           | `.` 也匹配换行符      |
| `u`  | Unicode          | 将模式和输入视为 Unicode       |

#### 示例 {/*#examples-3*/}

```text
Pattern (no flag): /hello/
Input:   "Hello World"
No match

Pattern (with i): /hello/i
Input:   "Hello World"
Match:   Hello
```

没有 `i` 标志时，`hello` 无法匹配 `Hello`，因为 `H` 是大写。使用 `i` 标志后，大小写被忽略，匹配成功。

## 高级模式 {/*#advanced-patterns*/}

### 贪婪与懒惰 {/*#greedy-vs-lazy*/}

- **贪婪**（默认）：尽可能多地匹配
- **懒惰**（附加 `?`）：尽可能少地匹配

| 语法 | 含义          |
| ------ | ---------------- |
| `*?`   | 0 次或多次（懒惰） |
| `+?`   | 1 次或多次（懒惰） |
| `??`   | 0 次或 1 次（懒惰）    |

#### 示例 {/*#examples-4*/}

```text
Input:   <b>bold</b> and <b>more</b>

Greedy:  <.*>   => 1 match:  <b>bold</b> and <b>more</b>
Lazy:    <.*?>  => 4 matches: <b>, </b>, <b>, </b>
```

贪婪的 `.*` 尽可能向外扩展，从第一个 `<` 一直匹配到最后一个 `>`，即一次匹配整个字符串。懒惰的 `.*?` 在最早可能的 `>` 处停止，因此每个标签被单独匹配。

### 非捕获分组 {/*#non-capturing-groups*/}

需要分组但不需要捕获时，使用 `(?:...)`。

```text
Pattern: (?:foo|bar)baz
Matches: foobaz, barbaz
```

### 命名分组 {/*#named-groups*/}

使用 `(?<name>...)` 为分组指定名称。

```text
Pattern: (?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})
Input:   2026-03-18
year:    2026
month:   03
day:     18
```

### 反向引用 {/*#backreferences*/}

使用 `\1`、`\2` 等引用先前捕获的分组。

```text
Pattern: (\w+)\s\1
Matches: "hello hello"    => hello hello
No match: "hello world"
```

### 环视 {/*#lookaround*/}

环视断言**在不消耗**字符的情况下检查某个模式。

| 语法     | 名称                | 含义             |
| ---------- | ------------------- | ------------------- |
| `(?=...)`  | 正向先行断言  | 后面跟着 ...     |
| `(?!...)`  | 负向先行断言  | 后面不跟着 ... |
| `(?<=...)` | 正向后行断言 | 前面是 ...     |
| `(?<!...)` | 负向后行断言 | 前面不是 ... |

#### 示例 {/*#examples-5*/}

```text
Pattern: \d+(?= USD)
Input:   "100 USD and 200 EUR"
Match:   100
```

```text
Pattern: \b\w+\b(?!\.com)
Input:   "test.com and example.org"
Effect:  Matches words NOT followed by .com
```

```text
Pattern: (?<=\$)\d+
Input:   "Price: $50"
Match:   50
```

```text
Pattern: (?<!un)happy
Input:   "happy and unhappy"
Match:   happy (first one only)
```

### 常用模式 {/*#common-patterns*/}

```text
Email (simplified):     [a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}
IPv4 address:           \b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b
ISO date (YYYY-MM-DD):  \d{4}-\d{2}-\d{2}
Hex color code:         #[0-9a-fA-F]{3,8}
URL (simplified):       https?://[^\s]+
```

### JavaScript 函数 {/*#javascript-functions*/}

JavaScript 提供两种将正则应用于字符串的主要方式：`.test()` 和 `.match()`。

#### `test()` {/*#test*/}

返回 `true` 或 `false`，适用于只需知道模式**是否**匹配的情况。

```javascript
const pattern = /\d{3}/;
pattern.test("abc 123"); // true
pattern.test("no digits"); // false
```

#### `match()` {/*#match*/}

返回匹配到的子串（或 `null`），适用于需要从字符串中**提取**数据的情况。

没有 `g` 标志时，`match()` 返回第一个匹配及捕获的分组：

```javascript
const result = "2026-03-18".match(/(\d{4})-(\d{2})-(\d{2})/);
// result[0] => "2026-03-18"  (full match)
// result[1] => "2026"        (group 1)
// result[2] => "03"          (group 2)
// result[3] => "18"          (group 3)
```

使用 `g` 标志时，`match()` 返回所有匹配，但**不包含捕获的分组**：

```javascript
"cat bat sat".match(/[a-z]at/g);
// => ["cat", "bat", "sat"]
```

如果没有任何匹配，`match()` 返回 `null`，而**不是**空数组：

```javascript
"hello".match(/\d+/); // null
```

#### 何时使用哪一个 {/*#when-to-use-which*/}

| 目标                        | 函数  |
| --------------------------- | --------- |
| 检查模式是否匹配  | `test()`  |
| 提取匹配到的字符串 | `match()` |
