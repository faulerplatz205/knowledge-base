---
title: "Cálculo de ofertas"
description: "Como calcular um preço de venda a partir do preço de tabela de um fornecedor usando o esquema padrão de cálculo comercial, incluindo descontos, margens e IVA."
keywords:
    - Cálculo de ofertas
    - Cálculo comercial
    - Precificação
    - Compras
    - Comercial
tags:
    - ap2
machine_translated: true
---

# Cálculo de ofertas

## Visão geral {/*#overview*/}

O cálculo de ofertas determina o preço de venda de um produto com base no preço de compra mais todos os custos, margens e impostos associados. Ele segue um esquema padronizado, passo a passo, utilizado no comércio atacadista e varejista.

## Esquema de cálculo {/*#calculation-scheme*/}

### Lado da compra {/*#purchase-side*/}

| Operação | Item                          | Observação                          |
| -------- | ----------------------------- | ----------------------------------- |
|          | Preço de compra de tabela     | Preço de catálogo do fornecedor     |
| −        | Desconto do fornecedor        | Redução em % sobre o preço de tabela |
| =        | Preço de compra líquido       |                                     |
| −        | Desconto financeiro (Skonto) do fornecedor | Redução em % por pagamento antecipado |
| =        | Preço de compra à vista       |                                     |
| +        | Custos de aquisição           | Frete, alfândega                    |
| =        | **Preço de custo**            | Custo real das mercadorias          |

### Lado da venda {/*#sales-side*/}

| Operação | Item                               | Observação                                                       |
| -------- | ---------------------------------- | ---------------------------------------------------------------- |
|          | Preço de custo                     | Transportado do item anterior                                    |
| +        | Adicional de custos indiretos      | Custos operacionais, aluguel, pessoal etc.                       |
| =        | Preço de equilíbrio (break-even)   |                                                                  |
| +        | Margem de lucro                    | Margem de lucro desejada                                         |
| =        | Preço de venda à vista             |                                                                  |
| +        | Desconto financeiro ao cliente     | Somado de volta: permite o desconto por pagamento antecipado ao cliente |
| =        | Preço de venda líquido             |                                                                  |
| +        | Desconto comercial ao cliente      | Somado de volta: permite que o cliente receba um desconto        |
| =        | Preço de tabela de venda líquido   |                                                                  |
| +        | IVA                                | p. ex., 19 % na Alemanha                                         |
| =        | **Preço de tabela de venda bruto** | Preço final para o cliente                                       |

## Observações {/*#notes*/}

- Skonto e Rabatt são **somados de volta** no lado da venda, pois representam deduções potenciais que o cliente pode reivindicar; o preço de venda deve cobri-las
- O adicional de custos indiretos é normalmente expresso como percentual do preço de custo, com base nos custos operacionais reais da empresa
- O cálculo pode ser realizado de forma progressiva (do preço de compra ao preço de venda) ou regressiva (de um preço de venda-alvo para derivar o preço de compra necessário)
