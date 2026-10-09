---
title: "IPv6 (Internet Protocol Version 6)"
description: "Como os endereços IPv6 são estruturados, comprimidos e expandidos, incluindo os endereços reservados mais importantes (loopback, link-local), os tipos unicast/multicast/anycast e os escopos de endereço."
keywords:
    - IPv6
    - Internet Protocol
    - Redes
    - Loopback
    - Link-Local
    - Unicast
    - Multicast
    - Anycast
    - Escopo
tags:
    - ap2
machine_translated: true
---

# IPv6 (Internet Protocol Version 6)

## Visão geral {/*#overview*/}

O IPv6 é o sucessor do IPv4 e foi introduzido para superar o esgotamento do espaço de endereços IPv4 de 32 bits. Um endereço IPv6 tem **128 bits**, o que oferece 2¹²⁸ (cerca de 3,4 x 10³⁸) endereços possíveis.

O endereço é escrito como **8 grupos de 16 bits** (frequentemente chamados de *hextets* ou *grupos*), cada um representado por 4 dígitos hexadecimais e separado por dois-pontos (`:`).

```text
2001:0db8:0000:0000:0000:ff00:0042:8329
```

- 8 grupos x 16 bits = 128 bits
- Os dígitos hexadecimais não diferenciam maiúsculas de minúsculas (`ff00` equivale a `FF00`); porém, a forma canônica recomendada é em minúsculas

## Estrutura do endereço {/*#address-structure*/}

Um endereço unicast IPv6 típico é dividido em duas metades de 64 bits cada:

| Parte               | Comprimento  | Finalidade                                                  |
| ------------------ | ------- | -------------------------------------------------------- |
| **Prefixo de rede** | 64 bits | Identifica a rede (prefixo de roteamento + ID da sub-rede).     |
| **ID da interface**   | 64 bits | Identifica a interface individual dentro dessa rede. |

O comprimento do prefixo é escrito em notação CIDR, por exemplo `2001:db8:abcd:1234::/64`. Um `/64` é o tamanho padrão para uma única sub-rede.

## Abreviação (compressão) {/*#shortening-compression*/}

Duas regras permitem escrever um endereço IPv6 de forma mais compacta. Elas podem ser combinadas.

### Regra 1: remover zeros à esquerda {/*#rule-1-remove-leading-zeros*/}

Dentro de cada grupo, os zeros à esquerda podem ser omitidos. Pelo menos um dígito deve permanecer por grupo.

```text
2001:0db8:0000:0000:0000:ff00:0042:8329
2001:db8:0:0:0:ff00:42:8329
```

### Regra 2: colapsar uma sequência de grupos zerados (`::`) {/*#rule-2-collapse-one-run-of-zero-groups-*/}

Uma única sequência contígua de um ou mais grupos totalmente zerados pode ser substituída por dois-pontos duplos `::`.

```text
2001:db8:0:0:0:ff00:42:8329
2001:db8::ff00:42:8329
```

**Importante:** `::` pode aparecer **apenas uma vez** em um endereço, caso contrário o comprimento seria ambíguo. Se existirem duas sequências de zeros de mesmo tamanho, a mais à esquerda deve ser comprimida.

```text
fe80:0:0:0:1:0:0:1   =>   fe80::1:0:0:1   (correct)
fe80:0:0:0:1:0:0:1   =>   fe80::1::1      (invalid, two "::")
```

## Expansão {/*#expanding*/}

A expansão reverte a compressão para recuperar a forma completa de 128 bits. Isso é útil para comparação ou cálculo manual de sub-redes.

1. **Restaurar o `::`** – Contar os grupos presentes e inserir tantos grupos `0` quantos forem necessários para chegar a 8 grupos no total.
2. **Preencher cada grupo** – Adicionar zeros à esquerda até que cada grupo tenha 4 dígitos hexadecimais.

```text
2001:db8::ff00:42:8329

Step 1 (restore zero groups, 5 groups present => insert 3):
2001:db8:0:0:0:ff00:42:8329

Step 2 (pad to 4 digits each):
2001:0db8:0000:0000:0000:ff00:0042:8329
```

## Tipos de endereço {/*#address-types*/}

O IPv6 não tem broadcast. Seu lugar é ocupado pelo multicast.

| Tipo          | Significado                                                                                     |
| ------------- | ------------------------------------------------------------------------------------------- |
| **Unicast**   | Um para um. Identifica uma única interface; um pacote é entregue exatamente a essa interface. |
| **Multicast** | Um para muitos. Entregue a todas as interfaces que ingressaram no grupo multicast.                   |
| **Anycast**   | Um para o mais próximo. Compartilhado por várias interfaces; entregue à topologicamente mais próxima.  |

## Escopos {/*#scopes*/}

O *escopo* define a região da rede na qual um endereço é válido e roteável. Os dois escopos unicast mais relevantes são:

- **Link-Local** – Válido apenas no enlace diretamente conectado (um segmento). Não é roteado. Configurado automaticamente em toda interface IPv6.
- **Global** – Globalmente único e roteável pela internet, comparável a um endereço IPv4 público.

Endereços multicast carregam um campo de escopo explícito (por exemplo interface-local, link-local, site-local, global).

### Zone index para link-local {/*#zone-index-for-link-local*/}

Como os endereços link-local (`fe80::/10`) não são únicos entre várias interfaces, a interface de saída deve ser especificada por meio de um zone index acrescentado com `%`.

```text
ping fe80::1%eth0      # Linux (interface name)
ping fe80::1%12        # Windows (interface index)
```

## Endereços importantes {/*#important-addresses*/}

| Endereço / prefixo | Nome               | Descrição                                                                           |
| ---------------- | ------------------ | ------------------------------------------------------------------------------------- |
| `::/128`         | Não especificado        | Todos zeros. Usado como endereço de origem antes de um endereço ser atribuído (semelhante a `0.0.0.0`).    |
| `::1/128`        | Loopback           | O host local, equivalente ao `127.0.0.1` do IPv4.                                       |
| `fe80::/10`      | Link-Local         | Configurado automaticamente, válido apenas no enlace local, nunca roteado.                          |
| `fc00::/7`       | Unique Local (ULA) | Endereços privados para uso interno, não roteados na internet (semelhante à RFC 1918). |
| `2000::/3`       | Unicast global     | Endereços públicos, globalmente roteáveis.                                                  |
| `ff00::/8`       | Multicast          | Todos os endereços multicast começam com `ff`.                                              |
| `ff02::1`        | Todos os nós (enlace)   | Multicast para todos os nós no enlace.                                                  |
| `ff02::2`        | Todos os roteadores (enlace) | Multicast para todos os roteadores no enlace.                                                |
| `2001:db8::/32`  | Documentação      | Reservado para exemplos e documentação, nunca usado em produção.                    |

## IPv6 vs. IPv4 {/*#ipv6-vs-ipv4*/}

| Propriedade       | IPv4                   | IPv6                         |
| -------------- | ---------------------- | ---------------------------- |
| Comprimento do endereço | 32 bits                | 128 bits                     |
| Notação       | Decimal, separada por pontos | Hexadecimal, separada por dois-pontos |
| Broadcast      | Sim                    | Não (substituído pelo multicast)   |
| Loopback       | `127.0.0.1`            | `::1`                        |
| Autoconfiguração    | DHCP / APIPA           | SLAAC + link-local           |
