---
title: "NAT"
description: "Como o NAT traduz endereços IP privados em públicos, incluindo PAT/overloading e redirecionamento de portas."
keywords:
    - NAT
    - Network Address Translation
    - PAT
    - Port Address Translation
    - Redirecionamento de portas
    - Redes
    - Endereço IP
    - IP privado
    - IP público
tags:
    - ap2
machine_translated: true
---

# NAT (Network Address Translation)

## Visão geral {/*#overview*/}

O rápido crescimento da internet teria esgotado rapidamente o conjunto disponível de endereços IP sem mecanismos para usá-los de forma mais eficiente. O NAT (Network Address Translation) resolve isso ao permitir que muitos dispositivos de uma rede privada compartilhem um pequeno número de endereços IP públicos.

O NAT opera em um dispositivo de borda (normalmente um firewall ou roteador). Quando um pacote o atravessa, o NAT substitui o endereço IP de origem (um endereço privado, não roteável) por um endereço IP público e roteável. O endereço público na resposta é então traduzido de volta para o endereço privado, para que o pacote possa ser entregue ao host interno correto.

## Benefícios {/*#benefits*/}

- **Renumeração mais simples**: Ao trocar de provedor, os hosts internos não precisam de novos endereços IP. Apenas o endereço público atribuído pelo novo provedor muda.
- **Economia de endereços**: O [PAT](#nat-overloading-pat) permite que muitos hosts internos compartilhem um único endereço IP público, reduzindo bastante o número de endereços públicos necessários.
- **Segurança aumentada**: Os endereços internos e a topologia da rede ficam ocultos das redes externas, já que apenas o endereço público é visível.

## Como o NAT funciona {/*#how-nat-works*/}

1. Um host interno (por exemplo `10.0.0.3`) envia um pacote destinado a um host externo (por exemplo `128.23.2.2`)
2. O roteador de borda (RTA) reconhece que o pacote se dirige à internet e seleciona um endereço IP global disponível (por exemplo `179.9.8.80`)
3. O RTA substitui o endereço de origem no pacote pelo endereço global e registra o mapeamento na tabela NAT
4. O pacote é encaminhado ao destino
5. Quando a resposta chega endereçada a `179.9.8.80`, o RTA consulta a tabela NAT, encontra o endereço interno correspondente, substitui o campo de destino e encaminha o pacote internamente

A tabela NAT registra três tipos de endereços:

- **IP local interno**: O endereço IP privado do host interno
- **IP global interno**: O endereço IP público que o roteador NAT atribui para representar o host interno externamente
- **IP global externo**: O endereço IP do host de destino na rede externa

**Exemplo de tabela NAT:**

| IP local interno | IP global interno | IP global externo |
| ----------------- | ------------------ | ------------------ |
| 10.0.0.3          | 179.9.8.80         | 128.23.2.2         |

## NAT Overloading (PAT) {/*#nat-overloading-pat*/}

O NAT Overloading, também chamado de PAT (Port Address Translation), mapeia vários endereços IP privados para um único endereço IP público ao acompanhar adicionalmente os números de porta. Cada conexão interna recebe um número de porta único no lado público, o que permite ao roteador demultiplexar as respostas recebidas para o host interno correto.

**Tabela NAT com overloading:**

| IP interno | Porta interna | IP global  | Porta externa |
| ----------- | ------------- | ---------- | ------------- |
| 10.0.0.2    | 1555          | 179.9.8.80 | 1555          |
| 10.0.0.3    | 1331          | 179.9.8.80 | 1331          |
| 10.0.0.4    | 1444          | 179.9.8.80 | 1444          |

## Redirecionamento de portas (port forwarding) {/*#port-forwarding*/}

Por padrão, o NAT bloqueia todas as conexões de entrada iniciadas externamente. O redirecionamento de portas permite que determinado tráfego externo alcance um host interno ao mapear um número de porta de destino no IP público para um endereço IP interno específico.

Fluxo de exemplo:

1. Um cliente envia uma requisição para `https://knowledge.moritz-grimm.dev` (IP público `209.165.200.225`, porta `443`)
2. O roteador recebe o pacote, pois `209.165.200.225` é o seu próprio IP público
3. Uma regra de redirecionamento de portas mapeia a porta externa `443` para o host interno `192.168.1.254:443`, de modo que o roteador reescreve o destino e encaminha o pacote internamente

:::info
Os números de porta externo e interno não precisam ser iguais.
:::
