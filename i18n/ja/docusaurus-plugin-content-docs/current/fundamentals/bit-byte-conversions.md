---
title: "ビット、バイト、単位変換"
description: "ビット、バイト、キビの基礎"
keywords:
  - "ビット"
  - "バイト"
  - "データ単位"
  - "変換"
  - "2進数"
  - "10進数"
  - "ストレージ"
machine_translated: true
---

# ビット、バイト、単位変換

:::info
ここで使われている10進接頭辞(キロ、メガ、ギガなど)は、バイトに適用される標準の[SI接頭辞](./si-prefixes.md)である。2進接頭辞(キビ、メビ、ギビなど)は、2のべき乗に特化したIEC規格の相当物である。
:::

## ビットとバイトの基礎 {/*#bit--byte-basics*/}

| 単位 | 記号 | ビット換算 | バイト換算 |
| ---- | ------ | ------- | -------- |
| ビット  | b      | 1       | 0.125    |
| バイト | B      | 8       | 1        |

**補足:** ネットワーク速度には**ビット/秒**(Mb/s、Gb/s)が、ストレージには**バイト**(MB、GB)が使われる

---

## 10進単位(底10) {/*#decimal-units-base-10*/}

| 単位     | 記号 | べき乗 | 係数 | バイト換算 |
| -------- | ------ | ----- | ------ | --------------------- |
| キロバイト | kB     | 10³   | 1,000¹ | 1,000                 |
| メガバイト | MB     | 10⁶   | 1,000² | 1,000,000             |
| ギガバイト | GB     | 10⁹   | 1,000³ | 1,000,000,000         |
| テラバイト | TB     | 10¹²  | 1,000⁴ | 1,000,000,000,000     |
| ペタバイト | PB     | 10¹⁵  | 1,000⁵ | 1,000,000,000,000,000 |

**1段階:** 1段階は'³'に相当する  
**使用者:** ハードディスクメーカー、マーケティング、ネットワーキング

---

## 2進単位(底2) {/*#binary-units-base-2*/}

| 単位     | 記号 | べき乗 | 係数 | バイト換算 |
| -------- | ------ | ----- | ------ | --------------------- |
| キビバイト | KiB    | 2¹⁰   | 1,024¹ | 1,024                 |
| メビバイト | MiB    | 2²⁰   | 1,024² | 1,048,576             |
| ギビバイト | GiB    | 2³⁰   | 1,024³ | 1,073,741,824         |
| テビバイト | TiB    | 2⁴⁰   | 1,024⁴ | 1,099,511,627,776     |
| ペビバイト | PiB    | 2⁵⁰   | 1,024⁵ | 1,125,899,906,842,624 |

**1段階:** 1段階は'¹⁰'に相当する  
**使用者:** オペレーティングシステム、RAM、実際のストレージ計算

---

## 変換方法 {/*#conversion-methods*/}

### 1. ビット ↔ バイト {/*#1-bit--byte*/}

#### ビット → バイト {/*#bit--byte*/}

```text
Formula: bits ÷ 8 = bytes

Example: 64 bits → bytes
64 ÷ 8 = 8 bytes
```

#### バイト → ビット {/*#byte--bit*/}

```text
Formula: bytes × 8 = bits

Example: 100 bytes → bits
100 × 8 = 800 bits
```

---

### 2. 10進単位(1,000を使用) {/*#2-decimal-units-using-1000*/}

#### 上方向(小さい単位 → 大きい単位) {/*#upward-smaller--larger*/}

```text
Steps: kB → MB → GB → TB → PB
Formula: value ÷ 10^steps

Example: 5,000,000 kB → GB
Steps: kB → MB → GB = 2 steps
5,000,000 kB ÷ 10⁶ = 5 GB
```

#### 下方向(大きい単位 → 小さい単位) {/*#downward-larger--smaller*/}

```text
Steps: PB → TB → GB → MB → kB
Formula: value × 10^steps

Example: 2 TB → MB
Steps: TB → GB → MB = 2 steps
2 TB × 10⁶ = 2,000,000 MB
```

---

### 3. 2進単位(1,024を使用) {/*#3-binary-units-using-1024*/}

#### 上方向(小さい単位 → 大きい単位) {/*#upward-smaller--larger-1*/}

```text
Steps: KiB → MiB → GiB → TiB → PiB
Formula: value ÷ 2^steps

Example: 6,800,000 KiB → GiB
Steps: KiB → MiB → GiB = 2 steps
6,800,000 KiB ÷ 2²⁰ = 6.485 GiB
```

#### 下方向(大きい単位 → 小さい単位) {/*#downward-larger--smaller-1*/}

```text
Steps: PiB → TiB → GiB → MiB → KiB
Formula: value × 2^steps

Example: 3 GiB → KiB
Steps: GiB → MiB → KiB = 2 steps
3 GiB × 2²⁰ = 3,145,728 KiB
```

---

### 4. 10進 ↔ 2進の変換 {/*#4-decimal--binary-conversion*/}

#### 10進 → 2進(例: MB → MiB) {/*#decimal--binary-eg-mb--mib*/}

```text
Formula: (decimal value) ÷ 1.024^steps ≈ binary value

Example: 1,000 MB → MiB
Steps: Both are "Mega" level = same position, but different base
1,000 MB ÷ 1.024 ≈ 976.56 MiB

Alternative (precise):
1,000 MB * 10⁶ = 1,000,000,000 bytes
1,000,000,000 bytes ÷ 2¹⁰ = 953.67 MiB
```

#### 2進 → 10進(例: GiB → GB) {/*#binary--decimal-eg-gib--gb*/}

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

## クイックリファレンス {/*#quick-reference*/}

| 変換の種類 | 式    | 例               |
| --------------- | ---------- | --------------------- |
| ビット → バイト      | ÷ 8        | 1,000 b → 125 B       |
| バイト → ビット      | × 8        | 125 B → 1,000 b       |
| 10進で上へ      | ÷ 10^段階数 | 5,000 MB → 5 GB       |
| 10進で下へ    | × 10^段階数 | 2 TB → 2,000,000 MB   |
| 2進で上へ       | ÷ 2^段階数  | 2,048 KiB → 2 MiB     |
| 2進で下へ     | × 2^段階数  | 3 GiB → 3,145,728 KiB |
| MB → MiB        | ÷ 1.024    | 1,000 MB ≈ 976.56 MiB |
| GiB → GB        | × 1.024    | 500 GiB ≈ 512 GB      |

---

## よくある落とし穴 {/*#common-pitfalls*/}

- **単位を混同しない:** `1 GB ≠ 1 GiB`(1 GB = 0.931 GiB)
- **マーケティング上の手法:** 「500 GB」のハードディスクは、実際には約465.66 GiBである
- **ネットワーク速度:** 100 Mb/s ≠ 100 MB/s(100 Mb/s = 12.5 MB/s)

## 関連項目 {/*#see-also*/}

- [SI接頭辞](./si-prefixes.md): バイトに限らず、あらゆる単位に適用される一般的なメートル法の接頭辞(キロ、メガ、ギガ、ミリ、マイクロなど)
