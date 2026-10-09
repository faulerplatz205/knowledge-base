---
title: "مديرو الحزم في Linux"
description: "نظرة عامة على أكثر مديري الحزم شيوعًا في Linux، والتوزيعات التي يدعمونها، وأوامرهم الرئيسية."
keywords:
    - Linux
    - مدير الحزم
    - apt
    - pacman
    - dnf
    - yum
    - zypper
    - portage
    - Debian
    - Ubuntu
    - Arch Linux
    - Fedora
    - openSUSE
    - Gentoo
machine_translated: true
---

# مديرو الحزم في Linux

يقوم مدير الحزم بأتمتة تثبيت البرامج وتحديثها وإزالتها على نظام Linux. تستخدم كل عائلة توزيعات رئيسية أداتها الخاصة.

## apt {/*#apt*/}

يُستخدم في التوزيعات المبنية على Debian: Ubuntu وDebian وKali Linux وLinux Mint.

| الأمر                 | الوصف                           |
| ----------------------- | ------------------------------------- |
| `apt update`            | تحديث فهرس الحزم             |
| `apt upgrade`           | ترقية جميع الحزم المثبتة        |
| `apt install <package>` | تثبيت حزمة                     |
| `apt remove <package>`  | إزالة حزمة (مع الإبقاء على ملفات الإعداد)  |
| `apt purge <package>`   | إزالة حزمة مع ملفات إعدادها |
| `apt search <term>`     | البحث عن حزمة                  |
| `apt list --installed`  | عرض جميع الحزم المثبتة           |

## pacman {/*#pacman*/}

يُستخدم في التوزيعات المبنية على Arch: Arch Linux وManjaro وEndeavourOS.

| الأمر                | الوصف                                    |
| ---------------------- | ---------------------------------------------- |
| `pacman -Syu`          | مزامنة قاعدة بيانات الحزم وترقية جميع الحزم |
| `pacman -S <package>`  | تثبيت حزمة                              |
| `pacman -R <package>`  | إزالة حزمة                               |
| `pacman -Rs <package>` | إزالة حزمة مع تبعياتها غير المستخدمة   |
| `pacman -Ss <term>`    | البحث في قاعدة بيانات الحزم                    |
| `pacman -Q`            | عرض جميع الحزم المثبتة                    |

## dnf {/*#dnf*/}

يُستخدم في التوزيعات المبنية على Red Hat بدءًا من Fedora 22 وCentOS Stream 8.

| الأمر                 | الوصف                    |
| ----------------------- | ------------------------------ |
| `dnf check-update`      | التحقق من التحديثات المتاحة    |
| `dnf upgrade`           | ترقية جميع الحزم المثبتة |
| `dnf install <package>` | تثبيت حزمة              |
| `dnf remove <package>`  | إزالة حزمة               |
| `dnf search <term>`     | البحث عن حزمة           |
| `dnf list --installed`  | عرض جميع الحزم المثبتة    |

## yum {/*#yum*/}

سلف [dnf](#dnf)، ويُستخدم في Fedora 21 وCentOS 7 وRHEL 7 وما قبلها. استُبدل بـ dnf بسبب محلل التبعيات البطيء المبني على Python والديون التقنية المتراكمة.

| الأمر                 | الوصف                    |
| ----------------------- | ------------------------------ |
| `yum check-update`      | التحقق من التحديثات المتاحة    |
| `yum update`            | ترقية جميع الحزم المثبتة |
| `yum install <package>` | تثبيت حزمة              |
| `yum remove <package>`  | إزالة حزمة               |
| `yum search <term>`     | البحث عن حزمة           |
| `yum list installed`    | عرض جميع الحزم المثبتة    |

## zypper {/*#zypper*/}

يُستخدم في openSUSE وSUSE Linux Enterprise.

| الأمر                            | الوصف                    |
| ---------------------------------- | ------------------------------ |
| `zypper refresh`                   | تحديث جميع المستودعات       |
| `zypper update`                    | ترقية جميع الحزم المثبتة |
| `zypper install <package>`         | تثبيت حزمة              |
| `zypper remove <package>`          | إزالة حزمة               |
| `zypper search <term>`             | البحث عن حزمة           |
| `zypper packages --installed-only` | عرض جميع الحزم المثبتة    |

## portage {/*#portage*/}

يُستخدم في Gentoo. تُترجم الحزم من المصدر، مما يجعلها قابلة للإعداد بدرجة عالية. أداة الواجهة الأمامية هي `emerge`.

| الأمر                       | الوصف                                  |
| ----------------------------- | -------------------------------------------- |
| `emerge --sync`               | مزامنة شجرة portage                        |
| `emerge -uDN @world`          | ترقية جميع الحزم المثبتة               |
| `emerge <package>`            | تثبيت حزمة                            |
| `emerge --depclean <package>` | إزالة حزمة مع تبعياتها غير المستخدمة |
| `emerge --search <term>`      | البحث عن حزمة                         |
| `qlist -I`                    | عرض جميع الحزم المثبتة                  |
