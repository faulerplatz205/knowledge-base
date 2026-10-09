---
title: "تحويلات البت والبايت والوحدات"
description: "أساسيات البت والبايت والوحدات الثنائية"
keywords:
  - "بت"
  - "بايت"
  - "وحدات البيانات"
  - "التحويل"
  - "ثنائي"
  - "عشري"
  - "التخزين"
machine_translated: true
---

# تحويلات البت والبايت والوحدات

:::info
البادئات العشرية المستخدمة هنا (كيلو، ميغا، غيغا…) هي [بادئات SI](./si-prefixes.md) القياسية مطبقة على البايت. أما البادئات الثنائية (kibi وmebi وgibi…) فهي المكافئات المعتمدة من IEC المخصصة لقوى العدد 2.
:::

## أساسيات البت والبايت {/*#bit--byte-basics*/}

| الوحدة | الرمز | بالبت | بالبايت |
| ------ | ----- | ----- | ------- |
| بت (Bit)  | b | 1 | 0.125 |
| بايت (Byte) | B | 8 | 1 |

**معلومة إضافية:** تستخدم سرعات الشبكات **البت/ثانية** (Mb/s وGb/s)، بينما يستخدم التخزين **البايت** (MB وGB)

---

## الوحدات العشرية (الأساس 10) {/*#decimal-units-base-10*/}

| الوحدة | الرمز | القوة | العامل | بالبايت |
| ------ | ----- | ----- | ------ | ------- |
| كيلوبايت | kB | 10³   | 1,000¹ | 1,000                 |
| ميغابايت | MB | 10⁶   | 1,000² | 1,000,000             |
| غيغابايت | GB | 10⁹   | 1,000³ | 1,000,000,000         |
| تيرابايت | TB | 10¹²  | 1,000⁴ | 1,000,000,000,000     |
| بيتابايت | PB | 10¹⁵  | 1,000⁵ | 1,000,000,000,000,000 |

**الخطوة:** تساوي كل خطوة '³'  
**يستخدمها:** مصنّعو الأقراص الصلبة، والتسويق، والشبكات

---

## الوحدات الثنائية (الأساس 2) {/*#binary-units-base-2*/}

| الوحدة | الرمز | القوة | العامل | بالبايت |
| ------ | ----- | ----- | ------ | ------- |
| كيبيبايت (Kibibyte) | KiB | 2¹⁰   | 1,024¹ | 1,024                 |
| ميبيبايت (Mebibyte) | MiB | 2²⁰   | 1,024² | 1,048,576             |
| غيبيبايت (Gibibyte) | GiB | 2³⁰   | 1,024³ | 1,073,741,824         |
| تيبيبايت (Tebibyte) | TiB | 2⁴⁰   | 1,024⁴ | 1,099,511,627,776     |
| بيبيبايت (Pebibyte) | PiB | 2⁵⁰   | 1,024⁵ | 1,125,899,906,842,624 |

**الخطوة:** تساوي كل خطوة '¹⁰'  
**يستخدمها:** أنظمة التشغيل، وذاكرة RAM، وحسابات التخزين الفعلية

---

## طرق التحويل {/*#conversion-methods*/}

### 1. بت ↔ بايت {/*#1-bit--byte*/}

#### بت → بايت {/*#bit--byte*/}

```text
Formula: bits ÷ 8 = bytes

Example: 64 bits → bytes
64 ÷ 8 = 8 bytes
```

#### بايت → بت {/*#byte--bit*/}

```text
Formula: bytes × 8 = bits

Example: 100 bytes → bits
100 × 8 = 800 bits
```

---

### 2. الوحدات العشرية (باستخدام 1,000) {/*#2-decimal-units-using-1000*/}

#### صعودًا (من الأصغر إلى الأكبر) {/*#upward-smaller--larger*/}

```text
Steps: kB → MB → GB → TB → PB
Formula: value ÷ 10^steps

Example: 5,000,000 kB → GB
Steps: kB → MB → GB = 2 steps
5,000,000 kB ÷ 10⁶ = 5 GB
```

#### نزولًا (من الأكبر إلى الأصغر) {/*#downward-larger--smaller*/}

```text
Steps: PB → TB → GB → MB → kB
Formula: value × 10^steps

Example: 2 TB → MB
Steps: TB → GB → MB = 2 steps
2 TB × 10⁶ = 2,000,000 MB
```

---

### 3. الوحدات الثنائية (باستخدام 1,024) {/*#3-binary-units-using-1024*/}

#### صعودًا (من الأصغر إلى الأكبر) {/*#upward-smaller--larger-1*/}

```text
Steps: KiB → MiB → GiB → TiB → PiB
Formula: value ÷ 2^steps

Example: 6,800,000 KiB → GiB
Steps: KiB → MiB → GiB = 2 steps
6,800,000 KiB ÷ 2²⁰ = 6.485 GiB
```

#### نزولًا (من الأكبر إلى الأصغر) {/*#downward-larger--smaller-1*/}

```text
Steps: PiB → TiB → GiB → MiB → KiB
Formula: value × 2^steps

Example: 3 GiB → KiB
Steps: GiB → MiB → KiB = 2 steps
3 GiB × 2²⁰ = 3,145,728 KiB
```

---

### 4. التحويل بين العشري والثنائي {/*#4-decimal--binary-conversion*/}

#### من عشري إلى ثنائي (مثل MB → MiB) {/*#decimal--binary-eg-mb--mib*/}

```text
Formula: (decimal value) ÷ 1.024^steps ≈ binary value

Example: 1,000 MB → MiB
Steps: Both are "Mega" level = same position, but different base
1,000 MB ÷ 1.024 ≈ 976.56 MiB

Alternative (precise):
1,000 MB * 10⁶ = 1,000,000,000 bytes
1,000,000,000 bytes ÷ 2¹⁰ = 953.67 MiB
```

#### من ثنائي إلى عشري (مثل GiB → GB) {/*#binary--decimal-eg-gib--gb*/}

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

## مرجع سريع {/*#quick-reference*/}

| نوع التحويل | الصيغة | مثال |
| ----------- | ------ | ---- |
| بت → بايت | ÷ 8 | 1,000 b → 125 B |
| بايت → بت | × 8 | 125 B → 1,000 b |
| عشري صعودًا | ÷ 10^steps | 5,000 MB → 5 GB |
| عشري نزولًا | × 10^steps | 2 TB → 2,000,000 MB |
| ثنائي صعودًا | ÷ 2^steps | 2,048 KiB → 2 MiB |
| ثنائي نزولًا | × 2^steps | 3 GiB → 3,145,728 KiB |
| MB → MiB | ÷ 1.024 | 1,000 MB ≈ 976.56 MiB |
| GiB → GB | × 1.024 | 500 GiB ≈ 512 GB |

---

## أخطاء شائعة {/*#common-pitfalls*/}

- **خلط الوحدات:** `1 GB ≠ 1 GiB` (1 GB = 0.931 GiB)
- **حيلة تسويقية:** القرص الصلب «500 GB» هو في الواقع نحو 465.66 GiB
- **سرعات الشبكات:** 100 Mb/s ≠ 100 MB/s (100 Mb/s = 12.5 MB/s)

## انظر أيضًا {/*#see-also*/}

- [بادئات SI](./si-prefixes.md): البادئات المترية العامة (كيلو، ميغا، غيغا، ميلي، ميكرو، وغيرها) المطبقة على أي وحدة، لا على البايت فقط
