---
title: "频率（Hz）与脉宽调制（PWM）"
description: "赫兹所表示的频率含义，以及脉宽调制如何利用占空比以纯数字信号近似模拟输出电平，包括周期、频率和占空比公式。"
keywords:
    - 频率
    - 赫兹
    - Hz
    - 周期
    - 脉宽调制
    - PWM
    - 占空比
    - GPIO
    - 调光
    - 电机控制
tags:
    - ap2
machine_translated: true
---

# 频率（Hz）与脉宽调制（PWM）

## 频率（Hz） {/*#frequency-hz*/}

**频率**描述周期性信号每秒重复的次数。其单位为**赫兹（Hz）**：1 Hz 等于每秒一个完整周期。

频率 `f` 与一个周期的持续时间，即**周期** `T`，互为倒数：

```text
f = 1 / T        (frequency  = 1 / period)
T = 1 / f        (period     = 1 / frequency)
```

**示例：** 某信号每 1 ms（0.001 s）重复一次。

```text
f = 1 / 0.001 s = 1000 Hz = 1 kHz
```

## PWM 解决的问题 {/*#the-problem-pwm-solves*/}

数字 GPIO 输出只能提供两种状态：**HIGH**（例如 3.3 V）或 **LOW**（0 V），没有中间值。然而许多任务需要中间值，例如为 LED 调光、让电机以一半速度运转，或驱动无源[蜂鸣器](./raspberry-pi.md)。

**脉宽调制（PWM）**通过让输出在 HIGH 和 LOW 之间极快地切换来解决这一问题。HIGH 时间与整个周期之比决定所传递的*平均*功率，所连接的设备将其感知为介于完全关闭和完全开启之间的值。

## 占空比 {/*#duty-cycle*/}

**占空比**（德语 *Puls-Pause-Verhältnis*）是一个周期内信号为 HIGH 的时间所占的比例：

```text
Duty cycle = (t_on / T) x 100%

t_on = time HIGH within one period
T    = t_on + t_off (full period)
```

| 占空比 | 信号                       | 效果（3.3 V 时）      |
| ---------- | ---------------------------- | ---------------------- |
| 0 %        | 始终为 LOW                   | 完全关闭              |
| 25 %       | 1/4 的时间为 HIGH         | 低功率              |
| 50 %       | 一半时间为 HIGH           | 一半功率             |
| 75 %       | 3/4 的时间为 HIGH         | 高功率             |
| 100 %      | 始终为 HIGH                  | 完全开启               |

**示例：** 在 1 ms 的周期内，信号有 0.25 ms 为 HIGH。

```text
Duty cycle = (0.25 ms / 1 ms) x 100% = 25%
```

## 平均输出电平 {/*#average-output-level*/}

设备所感知的平均电压与占空比成线性比例：

```text
U_avg = duty cycle x U_max
```

**示例：** 3.3 V 输出，占空比为 50 %。

```text
U_avg = 0.5 x 3.3 V = 1.65 V
```

:::note
PWM **并不会**真正降低电压，输出仍在 0 V 与完整电平之间切换。设备只是*表现得*如同收到了平均值，因为切换速度快于其响应速度。
:::

## 计算 HIGH 时间 {/*#calculating-the-high-time*/}

结合上述公式，可得到在选定频率和占空比下的 HIGH 时间：

```text
T = 1 / f
t_on = duty cycle x T
```

**示例：** 1 kHz 信号，占空比为 25 %。

```text
T = 1 / 1000 Hz = 0.001 s = 1 ms
t_on = 0.25 x 1 ms = 0.25 ms
```

## 典型应用 {/*#typical-applications*/}

- **LED 调光：** 占空比越高，LED 越亮。
- **电机和风扇转速：** 在较高频率下，输出在 HIGH 与 LOW 之间切换；比例决定功率，进而决定转速。
- **无源[蜂鸣器](./raspberry-pi.md)发声：** PWM 信号的*频率*决定音调的高低。

## 另请参阅 {/*#see-also*/}

- [Raspberry Pi 概述](./raspberry-pi.md)：传感器和执行器（如无源蜂鸣器）的接线方式
- [模数转换器（ADC）](./analog-digital-converter.mdx)：相反的方向，即将模拟信号转换为数字值
- [电气单位](./electrical-units.md)：电压和功率基础
