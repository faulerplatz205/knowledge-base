---
title: "Operadores de pesquisa do Google"
description: "Visão geral de operadores de pesquisa avançados do Google e técnicas para resultados de busca mais precisos."
keywords:
    - Google
    - Pesquisa
    - Operadores de pesquisa
    - Google Dorking
    - Pesquisa avançada
machine_translated: true
---

# Operadores de pesquisa do Google

## Correspondência exata {/*#exact-match*/}

Colocar uma frase entre aspas duplas pesquisa exatamente essa sequência de palavras.

```text
"dependency injection in Angular"
```

Retorna apenas resultados que contêm exatamente essa frase, e não páginas que mencionam as palavras separadamente.

## Excluir termos {/*#exclude-terms*/}

Usar `-` diretamente antes de uma palavra exclui os resultados que contêm esse termo.

```text
python -snake
```

Pesquisa "python", mas exclui páginas sobre cobras.

## Operador OR {/*#or-operator*/}

Usar `OR` (em maiúsculas) entre termos encontra páginas que contêm qualquer um dos termos.

```text
React OR Vue
```

## Curinga {/*#wildcard*/}

Usar `*` como marcador para palavras desconhecidas dentro de uma frase de correspondência exata.

```text
"how to * a REST API"
```

## Pesquisa em um site {/*#site-search*/}

Usar `site:` restringe os resultados a um domínio específico.

```text
site:developer.mozilla.org flexbox
```

Também é possível direcionar a um TLD:

```text
site:edu machine learning
```

## Tipo de arquivo {/*#file-type*/}

Usar `filetype:` encontra formatos de arquivo específicos.

```text
filetype:pdf network security
```

Tipos de arquivo comuns: `pdf`, `docx`, `xlsx`, `pptx`, `csv`, `xml`, `json`, `txt`

## Filtros de URL, título e texto {/*#url-title-and-text-filters*/}

- `inurl:` — o termo deve aparecer na URL
- `intitle:` — o termo deve aparecer no título da página
- `intext:` — o termo deve aparecer no corpo do texto
- `allinurl:`, `allintitle:`, `allintext:` — todos os termos seguintes devem aparecer no respectivo local

```text
intitle:cheatsheet javascript
```

```text
allinurl:api docs v2
```

## Intervalo de datas {/*#date-range*/}

Usar `before:` e `after:` com datas no formato `YYYY-MM-DD`.

```text
"React Server Components" after:2025-01-01
```

## Related e cache {/*#related-and-cache*/}

- `related:` — encontra sites semelhantes a um determinado domínio
- `cache:` — exibe a versão em cache do Google de uma página

```text
related:stackoverflow.com
```

## Combinação de operadores {/*#combining-operators*/}

Os operadores podem ser combinados para pesquisas altamente direcionadas.

```text
site:github.com filetype:md "contributing guidelines"
```

```text
"error handling" site:stackoverflow.com -closed after:2024-01-01
```

```text
intitle:resume filetype:pdf site:edu "computer science"
```
