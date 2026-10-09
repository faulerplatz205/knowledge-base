---
title: "RAID"
description: "Visão geral do JBOD e dos níveis RAID 0, 1, 5, 6, 10 e 01, com seus compromissos entre desempenho, redundância e eficiência de armazenamento."
keywords:
    - RAID
    - Redundant Array of Independent Disks
    - Redundant Array of Inexpensive Disks
    - armazenamento
    - redundância de discos
tags:
    - ap2
machine_translated: true
---

# RAID

## Visão geral {/*#overview*/}

RAID (Redundant Array of Independent/Inexpensive Disks) é um método de combinar vários discos físicos em uma unidade lógica para melhorar o desempenho, a redundância ou ambos.

## JBOD – Just a Bunch of Disks {/*#jbod--just-a-bunch-of-disks*/}

JBOD é a ausência de um nível RAID: os discos são usados como estão. Ou cada disco aparece individualmente para o sistema operacional, ou vários discos são concatenados em um grande volume lógico (também chamado de spanning ou modo linear). Os dados são gravados em um disco até que ele fique cheio, e então o próximo é usado.

- **Mínimo de discos:** 1
- **Desempenho:** Igual ao de um único disco, não há striping e, portanto, nenhum acesso paralelo
- **Redundância:** Nenhuma
- **Capacidade utilizável:** 100%, discos de tamanhos diferentes podem ser combinados sem perda de espaço

**Mais indicado para:** arquivos, destinos de backup e bibliotecas de mídia em que a capacidade por real importa e os dados estão disponíveis em outro lugar.

**Vantagens:**

- Discos de tamanhos e idades diferentes podem ser combinados.
- Nenhuma capacidade é perdida com paridade ou espelhamento.
- Um disco com falha afeta apenas os dados armazenados nesse disco, não o volume inteiro.
- Adicionar outro disco não exige reconstruir o array.

**Desvantagens:**

- Não há redundância nem ganho de desempenho.
- Em um volume concatenado, arquivos que ultrapassam o limite de um disco também são perdidos.
- Uma falha é mais difícil de avaliar do que em um nível RAID real, porque depende de quais arquivos estavam no disco com falha.

## RAID 0 – Striping {/*#raid-0--striping*/}

Os dados são divididos em blocos e gravados em paralelo em todos os discos.

- **Mínimo de discos:** 2
- **Desempenho:** Maior velocidade de leitura/gravação (escala com o número de discos)
- **Redundância:** Nenhuma, a falha de um disco leva à perda de todos os dados
- **Capacidade utilizável:** 100%

**Mais indicado para:** dados temporários, caches ou outros cenários em que a velocidade importa mais que a confiabilidade.

**Vantagens:**

- Desempenho máximo de leitura e gravação
- Capacidade total de armazenamento utilizável
- Simples de configurar

**Desvantagens:**

- Nenhuma tolerância a falhas
- Perda de todos os dados na falha de um único disco

## RAID 1 – Mirroring (espelhamento) {/*#raid-1--mirroring*/}

Os dados são gravados de forma idêntica em todos os discos.

- **Mínimo de discos:** 2
- **Desempenho:** Leituras mais rápidas (pode ler de qualquer disco), mesma velocidade de gravação que um único disco
- **Redundância:** Suporta a falha de todos os discos, exceto um
- **Capacidade utilizável:** 50%

**Mais indicado para:** unidades de sistema operacional ou dados críticos em que a confiabilidade é a prioridade.

**Vantagens:**

- Alta redundância, recuperação simples
- Desempenho de leitura rápido
- Fácil de entender e gerenciar

**Desvantagens:**

- 50% da capacidade de armazenamento é perdida com o espelhamento
- Gravações não são mais rápidas que as de um único disco

## RAID 5 – Striping com paridade distribuída {/*#raid-5--striping-with-distributed-parity*/}

Dados e informações de paridade são distribuídos (striped) por todos os discos. A paridade permite recuperar os dados se um disco falhar.

- **Mínimo de discos:** 3
- **Desempenho:** Boa velocidade de leitura; velocidade de gravação reduzida devido ao cálculo de paridade
- **Redundância:** Tolera a falha de 1 disco
- **Capacidade utilizável:** `(n - 1) / n` (por exemplo 3 discos => 67%)

**Mais indicado para:** servidores de arquivos de uso geral que equilibram capacidade, desempenho e redundância.

**Vantagens:**

- Bom equilíbrio entre capacidade, desempenho e redundância
- Apenas a capacidade de um disco é perdida com a paridade

**Desvantagens:**

- O cálculo de paridade reduz o desempenho de gravação.
- Os tempos de reconstrução podem ser muito longos em discos grandes.
- O array fica vulnerável a uma segunda falha durante a reconstrução.

## RAID 6 – Striping com paridade dupla {/*#raid-6--striping-with-double-parity*/}

Como o [RAID 5](#raid-5--striping-with-distributed-parity), mas com dois blocos de paridade independentes, tolerando duas falhas simultâneas de disco.

- **Mínimo de discos:** 4
- **Desempenho:** Gravações ligeiramente mais lentas que no RAID 5 devido à paridade dupla
- **Redundância:** Tolera a falha de 2 discos
- **Capacidade utilizável:** `(n - 2) / n` (por exemplo 4 discos => 50%)

**Mais indicado para:** arrays grandes ou ambientes em que o tempo de reconstrução aumenta o risco de falha.

**Vantagens:**

- Sobrevive a duas falhas simultâneas de disco
- Mais seguro para arrays grandes, nos quais uma reconstrução pode levar dias

**Desvantagens:**

- Penalidade de gravação maior que no RAID 5
- A capacidade de dois discos é perdida com a paridade
- Exige pelo menos 4 discos

## RAID 10 – Striping + Mirroring {/*#raid-10--striping--mirroring*/}

Combina o [RAID 1](#raid-1--mirroring) (espelhamento) e o [RAID 0](#raid-0--striping) (striping): os dados são espelhados em pares e depois distribuídos (striped) entre os pares.

- **Mínimo de discos:** 4
- **Desempenho:** Alta velocidade de leitura e gravação
- **Redundância:** Tolera 1 falha por par espelhado
- **Capacidade utilizável:** 50%

**Mais indicado para:** bancos de dados e cargas de trabalho de alto throughput que precisam de velocidade e redundância.

**Vantagens:**

- Excelente desempenho de leitura e gravação
- Reconstrução rápida em comparação com níveis RAID baseados em paridade
- Processo de recuperação simples

**Desvantagens:**

- 50% da capacidade de armazenamento é perdida com o espelhamento
- Exige pelo menos 4 discos, com custos que crescem rapidamente

## RAID 01 – Mirroring + Striping {/*#raid-01--mirroring--striping*/}

O RAID 01 (também escrito RAID 0+1) combina os mesmos dois níveis do RAID 10, mas na ordem inversa: os discos são primeiro agrupados em conjuntos de striping RAID 0, e esses conjuntos são então espelhados.

- **Mínimo de discos:** 4
- **Desempenho:** Igual ao RAID 10, alta velocidade de leitura e gravação
- **Redundância:** Tolera com certeza apenas 1 falha de disco
- **Capacidade utilizável:** 50%

```text
RAID 10:  mirror(Disk1, Disk2) + mirror(Disk3, Disk4), striped across both mirrors
RAID 01:  stripe(Disk1, Disk2) + stripe(Disk3, Disk4), mirrored onto each other
```

**Mais indicado para:** nada em particular. O RAID 10 consegue o mesmo com melhor comportamento em falhas e, por isso, é usado no lugar dele.

**Diferença em relação ao RAID 10:** a falha de um único disco derruba todo o conjunto de striping ao qual ele pertence, de modo que o array passa a operar com o espelho restante. Uma segunda falha destrói o array, a menos que atinja um dos discos do conjunto já com falha. No RAID 10, apenas o par espelhado afetado fica degradado, e uma segunda falha é suportada desde que ocorra em um par diferente. A reconstrução difere de acordo: o RAID 10 ressincroniza apenas um parceiro do espelho, enquanto o RAID 01 precisa reconstruir o conjunto de striping inteiro.

**Vantagens:**

- Alto desempenho de leitura e gravação
- Simples de entender como combinação de dois níveis básicos

**Desvantagens:**

- Comportamento em falhas pior que o do RAID 10 com o mesmo custo
- 50% da capacidade de armazenamento é perdida com o espelhamento
- Reconstrução mais longa, pois um conjunto de striping completo precisa ser restaurado

## Comparação {/*#comparison*/}

| Nível                                               | Mín. de discos | Tolerância a falhas | Capacidade utilizável | Desempenho               |
| --------------------------------------------------- | ---------- | --------------- | --------------- | ------------------------- |
| [JBOD](#jbod--just-a-bunch-of-disks)                | 1          | 0 discos         | 100%            | Como um único disco        |
| [RAID 0](#raid-0--striping)                         | 2          | 0 discos         | 100%            | Leituras e gravações muito altas  |
| [RAID 1](#raid-1--mirroring)                        | 2          | n-1 discos       | 50%             | Leituras rápidas, gravações normais |
| [RAID 5](#raid-5--striping-with-distributed-parity) | 3          | 1 disco          | (n-1)/n         | Leituras rápidas, gravações lentas   |
| [RAID 6](#raid-6--striping-with-double-parity)      | 4          | 2 discos         | (n-2)/n         | Leituras rápidas, gravações mais lentas |
| [RAID 10](#raid-10--striping--mirroring)            | 4          | 1 por par      | 50%             | Leituras e gravações muito altas  |
| [RAID 01](#raid-01--mirroring--striping)            | 4          | 1 disco          | 50%             | Leituras e gravações muito altas  |

## Observações importantes {/*#important-notes*/}

- O RAID **não é um backup**: ele protege contra falha de disco, não contra exclusão acidental, corrupção ou desastres.
- O tempo de reconstrução em discos grandes pode levar de horas a dias, período durante o qual o array fica vulnerável.
- Controladoras RAID de hardware oferecem melhor desempenho e cache, mas acrescentam custo e dependência de fornecedor (vendor lock-in).
- O RAID por software (por exemplo Linux `mdadm`, Windows Storage Spaces, ZFS) é uma alternativa de bom custo-benefício.
