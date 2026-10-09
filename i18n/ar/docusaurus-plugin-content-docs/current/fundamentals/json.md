---
title: "JSON"
description: "اصطلاحات JSON: تسمية الملفات وتسمية المفاتيح، ومقارنة بين JSON وJSONC وJSON5"
keywords:
  - "JSON"
  - "JSONC"
  - "JSON5"
  - "تسمية الملفات"
  - "تسمية المفاتيح"
  - "kebab-case"
  - "camelCase"
  - "اصطلاحات التسمية"
tags:
  - ap2
machine_translated: true
---

# JSON

## نظرة عامة {/*#overview*/}

JSON (JavaScript Object Notation) صيغة بيانات نصية خفيفة قدّمها Douglas Crockford في أوائل الألفية. وهي مشتقة من صياغة الكائنات الحرفية في JavaScript لكنها مستقلة عن اللغة. واليوم تُعدّ JSON الصيغة الأوسع استخداماً لتبادل البيانات بين عملاء الويب والخوادم وملفات الإعدادات وواجهات API.

## تسمية الملفات {/*#file-naming*/}

### الإجابة: kebab-case {/*#answer-kebab-case*/}

```text
user-data.json
api-config.json
database-schema.json
```

### لماذا kebab-case؟ {/*#why-kebab-case*/}

- **آمن عبر المنصات**: لا مشاكل مع أنظمة الملفات غير الحساسة لحالة الأحرف (Windows/macOS)
- **قراءة أفضل** في قوائم الملفات ومستكشفاتها
- **ملائم للروابط**: يعمل دون ترميز إذا قُدِّمت الملفات عبر HTTP

## تسمية المفاتيح {/*#key-naming*/}

### الإجابة: camelCase {/*#answer-camelcase*/}

```json
{
  "userId": 123,
  "firstName": "Alice",
  "isActive": true
}
```

### لماذا camelCase؟ {/*#why-camelcase*/}

- معيار في منظومة JavaScript/TypeScript التي نشأت فيها JSON
- لا تفرض مواصفة JSON نفسها نمطاً للمفاتيح
- تستخدم معظم واجهات API العامة على الويب (Google وGitHub وStripe) نمط camelCase

### ملاحظة {/*#note*/}

`snake_case` شائع في واجهات API المرتكزة على Python (مثل Django REST Framework وFastAPI). ويُختار نمط واحد ويُلتزم به باتساق داخل المشروع.

## JSON مقابل JSONC مقابل JSON5 {/*#json-vs-jsonc-vs-json5*/}

| الميزة                | JSON                | JSONC                              | JSON5                           |
| --------------------- | ------------------- | ---------------------------------- | ------------------------------- |
| التعليقات             | لا                  | `//` و`/* */`                   | `//` و`/* */`                |
| الفواصل اللاحقة       | لا                  | نعم                                | نعم                             |
| المفاتيح بلا علامات اقتباس | لا             | لا                                 | نعم                             |
| السلاسل بعلامات اقتباس مفردة | لا           | لا                                 | نعم                             |
| الاستخدام النموذجي    | تبادل البيانات وواجهات API | ملفات الإعدادات (VS Code وTypeScript) | ملفات الإعدادات والبيانات المحرَّرة يدوياً |
