---
title: "位、字节与单位换算"
description: "位、字节与二进制前缀基础"
keywords:
  - "位"
  - "字节"
  - "数据单位"
  - "换算"
  - "二进制"
  - "十进制"
  - "存储"
machine_translated: true
---

# 位、字节与单位换算

:::info
此处使用的十进制前缀（kilo、mega、giga……）是应用于字节的标准 [SI 前缀](./si-prefixes.md)。二进制前缀（kibi、mebi、gibi……）是专用于 2 的幂的 IEC 对应前缀。
:::

## 位与字节基础 {/*#bit--byte-basics*/}

| 单位 | 符号 | 以位计 | 以字节计 |
| ---- | ------ | ------- | -------- |
| 位  | b      | 1       | 0.125    |
| 字节 | B      | 8       | 1        |

**补充说明：**网络速率使用 **bits/s**（Mb/s、Gb/s），存储使用**字节**（MB、GB）

---

## 十进制单位（以 10 为底） {/*#decimal-units-base-10*/}

| 单位     | 符号 | 幂 | 因数 | 以字节计              |
| -------- | ------ | ----- | ------ | --------------------- |
| 千字节 | kB     | 10³   | 1,000¹ | 1,000                 |
| 兆字节 | MB     | 10⁶   | 1,000² | 1,000,000             |
| 吉字节 | GB     | 10⁹   | 1,000³ | 1,000,000,000         |
| 太字节 | TB     | 10¹²  | 1,000⁴ | 1,000,000,000,000     |
| 拍字节 | PB     | 10¹⁵  | 1,000⁵ | 1,000,000,000,000,000 |

**步长：**一步相当于 '³'  
**使用者：**硬盘制造商、市场营销、网络

---

## 二进制单位（以 2 为底） {/*#binary-units-base-2*/}

| 单位     | 符号 | 幂 | 因数 | 以字节计              |
| -------- | ------ | ----- | ------ | --------------------- |
| Kibibyte | KiB    | 2¹⁰   | 1,024¹ | 1,024                 |
| Mebibyte | MiB    | 2²⁰   | 1,024² | 1,048,576             |
| Gibibyte | GiB    | 2³⁰   | 1,024³ | 1,073,741,824         |
| Tebibyte | TiB    | 2⁴⁰   | 1,024⁴ | 1,099,511,627,776     |
| Pebibyte | PiB    | 2⁵⁰   | 1,024⁵ | 1,125,899,906,842,624 |

**步长：**一步相当于 '¹⁰'  
**使用者：**操作系统、RAM、实际存储计算

---

## 换算方法 {/*#conversion-methods*/}

### 1. 位 ↔ 字节 {/*#1-bit--byte*/}

#### 位 => 字节 {/*#bit--byte*/}

```text
Formula: bits ÷ 8 = bytes

Example: 64 bits → bytes
64 ÷ 8 = 8 bytes
```

#### 字节 => 位 {/*#byte--bit*/}

```text
Formula: bytes × 8 = bits

Example: 100 bytes → bits
100 × 8 = 800 bits
```

---

### 2. 十进制单位（使用 1,000） {/*#2-decimal-units-using-1000*/}

#### 向上（小 => 大） {/*#upward-smaller--larger*/}

```text
Steps: kB → MB → GB → TB → PB
Formula: value ÷ 10^steps

Example: 5,000,000 kB → GB
Steps: kB → MB → GB = 2 steps
5,000,000 kB ÷ 10⁶ = 5 GB
```

#### 向下（大 => 小） {/*#downward-larger--smaller*/}

```text
Steps: PB → TB → GB → MB → kB
Formula: value × 10^steps

Example: 2 TB → MB
Steps: TB → GB → MB = 2 steps
2 TB × 10⁶ = 2,000,000 MB
```

---

### 3. 二进制单位（使用 1,024） {/*#3-binary-units-using-1024*/}

#### 向上（小 => 大） {/*#upward-smaller--larger-1*/}

```text
Steps: KiB → MiB → GiB → TiB → PiB
Formula: value ÷ 2^steps

Example: 6,800,000 KiB → GiB
Steps: KiB → MiB → GiB = 2 steps
6,800,000 KiB ÷ 2²⁰ = 6.485 GiB
```

#### 向下（大 => 小） {/*#downward-larger--smaller-1*/}

```text
Steps: PiB → TiB → GiB → MiB → KiB
Formula: value × 2^steps

Example: 3 GiB → KiB
Steps: GiB → MiB → KiB = 2 steps
3 GiB × 2²⁰ = 3,145,728 KiB
```

---

### 4. 十进制 ↔ 二进制换算 {/*#4-decimal--binary-conversion*/}

#### 十进制 => 二进制（例如 MB => MiB） {/*#decimal--binary-eg-mb--mib*/}

```text
Formula: (decimal value) ÷ 1.024^steps ≈ binary value

Example: 1,000 MB → MiB
Steps: Both are "Mega" level = same position, but different base
1,000 MB ÷ 1.024 ≈ 976.56 MiB

Alternative (precise):
1,000 MB * 10⁶ = 1,000,000,000 bytes
1,000,000,000 bytes ÷ 2¹⁰ = 953.67 MiB
```

#### 二进制 => 十进制（例如 GiB => GB） {/*#binary--decimal-eg-gib--gb*/}

```text
Formula: (binary value) × 1.024^steps ≈ decimal value

Example: 500 GiB → GB
Steps: Both are "Giga" level = same position, but different base
500 × 1.024 ≈ 512 GB

Alternative (precise):
500 GiB * 2³⁰ = 536,870,912,000 bytes
536,870,912,000 bytes ÷ 10⁹ = 536,87
```

---

## 速查表 {/*#quick-reference*/}

| 换算类型 | 公式    | 示例               |
| --------------- | ---------- | --------------------- |
| 位 => 字节      | ÷ 8        | 1,000 b => 125 B       |
| 字节 => 位      | x 8        | 125 B => 1,000 b       |
| 十进制向上      | ÷ 10^步数 | 5,000 MB => 5 GB       |
| 十进制向下    | x 10^步数 | 2 TB => 2,000,000 MB   |
| 二进制向上       | ÷ 2^步数  | 2,048 KiB => 2 MiB     |
| 二进制向下     | x 2^步数  | 3 GiB => 3,145,728 KiB |
| MB => MiB        | ÷ 1.024    | 1,000 MB ≈ 976.56 MiB |
| GiB => GB        | x 1.024    | 500 GiB ≈ 512 GB      |

---

## 常见陷阱 {/*#common-pitfalls*/}

- **不要混用单位：**`1 GB ≠ 1 GiB`（1 GB = 0.931 GiB）
- **营销手法：**标称 "500 GB" 的硬盘实际约为 465.66 GiB
- **网络速率：**100 Mb/s ≠ 100 MB/s（100 Mb/s = 12.5 MB/s）

## 另请参阅 {/*#see-also*/}

- [SI 前缀](./si-prefixes.md)：适用于任何单位而不仅限于字节的通用公制前缀（kilo、mega、giga、milli、micro 等）
