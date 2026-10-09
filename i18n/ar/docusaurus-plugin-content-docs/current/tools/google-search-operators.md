---
title: "عوامل بحث Google"
description: "نظرة عامة على عوامل بحث Google المتقدمة وتقنياته للحصول على نتائج بحث أدق."
keywords:
    - Google
    - البحث
    - عوامل البحث
    - Google Dorking
    - البحث المتقدم
machine_translated: true
---

# عوامل بحث Google

## المطابقة التامة {/*#exact-match*/}

توضع العبارة بين علامتي اقتباس مزدوجتين للبحث عن تسلسل الكلمات هذا تمامًا.

```text
"dependency injection in Angular"
```

تعرض فقط النتائج التي تحتوي على هذه العبارة بالضبط، وليس الصفحات التي تذكر الكلمات منفصلة فحسب.

## استبعاد المصطلحات {/*#exclude-terms*/}

يُستخدم `-` مباشرةً قبل الكلمة لاستبعاد النتائج التي تحتوي على ذلك المصطلح.

```text
python -snake
```

يبحث عن "python" مع استبعاد الصفحات المتعلقة بالثعابين.

## عامل OR {/*#or-operator*/}

يُستخدم `OR` (بأحرف كبيرة) بين المصطلحات للعثور على الصفحات التي تحتوي على أحدها.

```text
React OR Vue
```

## البدل (Wildcard) {/*#wildcard*/}

يُستخدم `*` كعنصر نائب للكلمات المجهولة داخل عبارة مطابقة تامة.

```text
"how to * a REST API"
```

## البحث في موقع {/*#site-search*/}

يُستخدم `site:` لحصر النتائج في نطاق معين.

```text
site:developer.mozilla.org flexbox
```

يمكن أيضًا استهداف نطاق المستوى الأعلى (TLD):

```text
site:edu machine learning
```

## نوع الملف {/*#file-type*/}

يُستخدم `filetype:` للعثور على صيغ ملفات محددة.

```text
filetype:pdf network security
```

أنواع الملفات الشائعة: `pdf`، `docx`، `xlsx`، `pptx`، `csv`، `xml`، `json`، `txt`

## مرشحات URL والعنوان والنص {/*#url-title-and-text-filters*/}

- `inurl:` — يجب أن يظهر المصطلح في عنوان URL
- `intitle:` — يجب أن يظهر المصطلح في عنوان الصفحة
- `intext:` — يجب أن يظهر المصطلح في نص المحتوى
- `allinurl:` و`allintitle:` و`allintext:` — يجب أن تظهر جميع المصطلحات التالية في الموضع المعني

```text
intitle:cheatsheet javascript
```

```text
allinurl:api docs v2
```

## النطاق الزمني {/*#date-range*/}

يُستخدم `before:` و`after:` مع تواريخ بصيغة `YYYY-MM-DD`.

```text
"React Server Components" after:2025-01-01
```

## المواقع ذات الصلة والذاكرة المؤقتة {/*#related-and-cache*/}

- `related:` — العثور على مواقع مشابهة لنطاق معين
- `cache:` — عرض النسخة المخزنة مؤقتًا من الصفحة لدى Google

```text
related:stackoverflow.com
```

## الجمع بين العوامل {/*#combining-operators*/}

يمكن الجمع بين العوامل للحصول على عمليات بحث موجَّهة بدقة عالية.

```text
site:github.com filetype:md "contributing guidelines"
```

```text
"error handling" site:stackoverflow.com -closed after:2024-01-01
```

```text
intitle:resume filetype:pdf site:edu "computer science"
```
