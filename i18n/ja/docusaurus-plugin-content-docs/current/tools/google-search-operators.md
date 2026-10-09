---
title: "Google検索演算子"
description: "より正確な検索結果を得るための、Googleの高度な検索演算子とテクニックの概要。"
keywords:
    - Google
    - 検索
    - 検索演算子
    - Google Dorking
    - 高度な検索
machine_translated: true
---

# Google検索演算子

## 完全一致 {/*#exact-match*/}

フレーズを二重引用符で囲むと、その語順どおりの文字列が検索される。

```text
"dependency injection in Angular"
```

そのフレーズを含む結果のみが返され、個々の単語が別々に言及されているだけのページは含まれない。

## 語句の除外 {/*#exclude-terms*/}

単語の直前に`-`を付けると、その語句を含む結果が除外される。

```text
python -snake
```

「python」を検索するが、ヘビに関するページは除外する。

## OR演算子 {/*#or-operator*/}

語句の間に`OR`(大文字)を置くと、いずれかの語句を含むページが検索される。

```text
React OR Vue
```

## ワイルドカード {/*#wildcard*/}

完全一致のフレーズ内で未知の単語の代わりに`*`をプレースホルダーとして使用する。

```text
"how to * a REST API"
```

## サイト検索 {/*#site-search*/}

`site:`を使用すると、結果が特定のドメインに限定される。

```text
site:developer.mozilla.org flexbox
```

TLDを対象にすることもできる。

```text
site:edu machine learning
```

## ファイルタイプ {/*#file-type*/}

`filetype:`を使用すると、特定のファイル形式が検索される。

```text
filetype:pdf network security
```

一般的なファイルタイプ: `pdf`, `docx`, `xlsx`, `pptx`, `csv`, `xml`, `json`, `txt`

## URL、タイトル、テキストのフィルター {/*#url-title-and-text-filters*/}

- `inurl:` — 語句がURLに含まれている必要がある
- `intitle:` — 語句がページタイトルに含まれている必要がある
- `intext:` — 語句が本文に含まれている必要がある
- `allinurl:`, `allintitle:`, `allintext:` — 後続のすべての語句が、それぞれの場所に含まれている必要がある

```text
intitle:cheatsheet javascript
```

```text
allinurl:api docs v2
```

## 日付範囲 {/*#date-range*/}

`before:`と`after:`を、`YYYY-MM-DD`形式の日付とともに使用する。

```text
"React Server Components" after:2025-01-01
```

## 関連サイトとキャッシュ {/*#related-and-cache*/}

- `related:` — 指定したドメインに類似したサイトを検索する
- `cache:` — ページのGoogleキャッシュ版を表示する

```text
related:stackoverflow.com
```

## 演算子の組み合わせ {/*#combining-operators*/}

演算子を組み合わせることで、的を絞った検索ができる。

```text
site:github.com filetype:md "contributing guidelines"
```

```text
"error handling" site:stackoverflow.com -closed after:2024-01-01
```

```text
intitle:resume filetype:pdf site:edu "computer science"
```
