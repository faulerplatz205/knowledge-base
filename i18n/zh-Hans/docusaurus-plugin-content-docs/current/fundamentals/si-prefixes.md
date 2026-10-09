---
title: "SI 前缀"
description: "常见的 SI（公制）前缀及其倍数，从皮到太，用于缩放米、克、秒、伏特、瓦特和赫兹等单位。"
keywords:
    - SI 前缀
    - 公制前缀
    - 单位
    - 太
    - 吉
    - 兆
    - 千
    - 分
    - 厘
    - 毫
    - 微
    - 纳
    - 皮
machine_translated: true
---

# SI 前缀

SI 前缀是附加在基本单位上的标准化倍数，用于表示非常大或非常小的量。  
它们适用于任何 SI 单位：米、克、秒、伏特、瓦特、赫兹等。

## 常用前缀 {/*#common-prefixes*/}

该表按前缀从大到小排列。基本单位（因子 1）位于中间。

| 前缀 | 符号 | 因子                | 幂 | 示例         |
| ------ | ------ | --------------------- | ----- | --------------- |
| tera（太）   | T      | 1,000,000,000,000     | 10¹²  | TB, THz         |
| giga（吉）   | G      | 1,000,000,000         | 10⁹   | GHz, GW         |
| mega（兆）   | M      | 1,000,000             | 10⁶   | MW, MΩ          |
| kilo（千）   | k      | 1,000                 | 10³   | km, kg, kV, kWh |
| —      | —      | 1                     | 10⁰   | m, g, V, W      |
| deci（分）   | d      | 0.1                   | 10⁻¹  | dl, dm          |
| centi（厘）  | c      | 0.01                  | 10⁻²  | cm              |
| milli（毫）  | m      | 0.001                 | 10⁻³  | mm, mV, ms      |
| micro（微）  | µ      | 0.000001              | 10⁻⁶  | µs, µm, µF      |
| nano（纳）   | n      | 0.000000001           | 10⁻⁹  | nm, ns          |
| pico（皮）   | p      | 0.000000000001        | 10⁻¹² | pF, ps          |

:::info
“主”序列（kilo => mega => giga => tera 以及 milli => micro => nano => pico）每个前缀以 **1,000**（10³）为步长。**Deci** 和 **centi** 位于基本单位与 milli 之间，是更小的中间步长（10⁻¹ 和 10⁻²）。
:::

## 前缀之间的换算 {/*#scaling-between-prefixes*/}

每个前缀都是 10 的幂（参见上方的[幂](#common-prefixes)列）。要在两个前缀之间换算，取二者幂之差，并将其作为步数应用。

### 向上（较小 => 较大） {/*#upward-smaller--larger*/}

```text
Formula: value / 10^steps

Example: 2,500 mV => V
Steps: mV (10⁻³) => V (10⁰) = 3 powers of 10
2,500 mV / 10³ = 2.5 V
```

### 向下（较大 => 较小） {/*#downward-larger--smaller*/}

```text
Formula: value x 10^steps

Example: 5 km => mm
Steps: km (10³) => mm (10⁻³) = 6 powers of 10
5 km x 10⁶ = 5,000,000 mm
```

## 实际应用中的常见示例 {/*#common-examples-in-practice*/}

- **kV**：千伏，1,000 V（高压输电线路）
- **mA**：毫安，0.001 A（小型电子设备）
- **MHz**：兆赫，1,000,000 Hz（无线电频率、CPU 时钟）
- **nm**：纳米，0.000000001 m（半导体工艺节点、光波长）
- **kWh**：千瓦时，1,000 Wh（电费账单）
- **µF**：微法，0.000001 F（电容值）

## 另请参阅 {/*#see-also*/}

- [位、字节与单位换算](./bit-byte-conversions.md)：将这些前缀应用于字节（十进制），并与二进制 IEC 前缀（kibi、mebi、gibi 等）进行对比
- [电气单位](./electrical-units.md)：对 V、A、W、Wh 等使用这些前缀
