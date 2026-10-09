---
title: "UDP"
description: "User Datagram Protocol: transporte sem conexão, estrutura do cabeçalho e casos de uso típicos."
keywords:
    - UDP
    - User Datagram Protocol
    - Sem Conexão
    - Datagrama
    - Camada de Transporte
    - TCP vs UDP
    - Streaming
tags:
    - ap2
machine_translated: true
---

# UDP (User Datagram Protocol)

## Visão geral {/*#overview*/}

O UDP é um protocolo de transporte sem conexão na camada 4 do [modelo OSI](./osi-model.md), especificado na RFC 768. Ele acrescenta quase nada à entrega de pacotes do IP: números de porta, um campo de comprimento e um checksum. Cada datagrama é endereçado e roteado de forma independente, sem estabelecimento prévio de conexão, estado compartilhado, confirmação ou retransmissão. Um datagrama é enviado e chega ou não chega, e o remetente nunca é informado de qual dos dois casos ocorreu. Um endpoint UDP é endereçado pela combinação de endereço IP e número de porta.

---

## Características {/*#characteristics*/}

| Propriedade           | Comportamento no UDP                                                 |
| --------------------- | -------------------------------------------------------------------- |
| Conexão               | Sem conexão, um datagrama pode ser enviado imediatamente             |
| Entrega               | Não confiável, datagramas perdidos não são percebidos nem repetidos  |
| Ordem                 | Não garantida, os datagramas podem chegar em ordem diferente         |
| Duplicatas            | Possíveis, a detecção fica a cargo da aplicação                      |
| Modelo de dados       | Orientado a mensagens, uma operação de envio resulta em exatamente um datagrama |
| Direção               | Ambos os lados podem enviar a qualquer momento, cada datagrama é independente |
| Controle de fluxo     | Nenhum                                                               |
| Controle de congestionamento | Nenhum, um remetente pode inundar a rede                      |
| Tamanho do cabeçalho  | 8 bytes, fixo                                                        |
| Broadcast / multicast | Suportado, um datagrama pode endereçar muitos receptores             |

Em troca do pequeno custo adicional, o UDP não oferece garantias.

---

## Cabeçalho do datagrama {/*#datagram-header*/}

O cabeçalho consiste em quatro campos de 2 bytes cada:

| Campo            | Finalidade                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------------- |
| Porta de origem  | Porta da aplicação remetente, pode ser 0 se nenhuma resposta for esperada                               |
| Porta de destino | Porta da aplicação destinatária                                                                         |
| Comprimento      | Comprimento de cabeçalho e carga útil em bytes                                                          |
| Checksum         | Detecção de erros sobre cabeçalho, carga útil e partes do cabeçalho IP, opcional no IPv4 e obrigatório no IPv6 |

Um datagrama corrompido é descartado silenciosamente.

---

## Comunicação sem conexão {/*#communication-without-a-connection*/}

Ao contrário do TCP, em que a carga útil só segue o handshake de três vias, o primeiro datagrama já carrega carga útil. Nenhum estado de conexão permanece em qualquer dos lados após o último datagrama.

```text
Client                                           Server

  | ---- datagram (query) ---------------------> |   application reads it
  |                                              |
  | <--- datagram (answer) --------------------- |
  |                                              |
  | ---- datagram (query) --------X              |   lost, nobody is informed
  |                                              |
  |  (timeout in the application)                |
  |                                              |
  | ---- datagram (query, repeated) -----------> |
```

- O cliente só fica sabendo pela resposta que sua consulta chegou. Uma resposta ausente pode significar uma consulta perdida, uma resposta perdida ou um servidor indisponível.
- O endereço do remetente de um datagrama nunca é verificado por um handshake. Requisições falsificadas são, portanto, possíveis, o que os ataques de amplificação via DNS ou NTP exploram.
- Um datagrama enviado a uma porta fechada é respondido com a mensagem ICMP *port unreachable*. Uma porta aberta e uma porta filtrada normalmente permanecem ambas em silêncio, de modo que um port scan UDP muitas vezes não consegue distinguir as duas.

---

## Sem controle de fluxo ou de congestionamento {/*#no-flow-or-congestion-control*/}

O UDP repassa os datagramas tão rápido quanto a aplicação os envia. Se o buffer de recepção estiver cheio, os datagramas seguintes são descartados sem aviso. Se a rede estiver sobrecarregada, datagramas são perdidos nas filas dos roteadores.

Uma aplicação que envia grandes volumes por UDP precisa limitar a própria taxa (RFC 8085). Caso contrário, ela desloca o tráfego TCP, pois o TCP reduz sua taxa diante de perda de pacotes e o UDP assume a capacidade liberada.

---

## Casos de uso típicos {/*#typical-use-cases*/}

### UDP vs. TCP {/*#udp-vs-tcp*/}

|           | UDP                                                                                   | [TCP](./tcp.md)                                                               |
| --------- | ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Critério  | Um pacote atrasado não tem valor, ou o custo de uma conexão supera a carga útil       | A completude importa mais que a latência                                      |
| Exemplos  | Áudio e vídeo ao vivo, jogos online, consultas curtas, telemetria, descoberta via multicast | Transferência de arquivos, páginas web, e-mail, administração remota, conexões de banco de dados |

### Portas UDP conhecidas {/*#well-known-udp-ports*/}

| Porta    | Serviço       | Por que UDP                                                              |
| -------- | ------------- | ------------------------------------------------------------------------ |
| 53       | DNS           | Uma consulta curta, uma resposta curta, repetir é mais barato que uma conexão |
| 67/68    | DHCP          | O cliente ainda não tem endereço IP e depende de broadcast               |
| 69       | TFTP          | Deliberadamente mínimo, usado em ambientes de boot                       |
| 123      | NTP           | Um carimbo de tempo retransmitido já estaria desatualizado               |
| 161/162  | SNMP          | Muitas mensagens de status pequenas, a perda de uma única é aceitável    |
| 443      | QUIC / HTTP/3 | A confiabilidade é implementada no QUIC sobre o UDP                      |
| 500/4500 | IPsec (IKE)   | Troca de chaves e NAT traversal                                          |
| 5060     | SIP           | Sinalização para conexões de voz                                         |

No DNS, os dois protocolos trabalham lado a lado: consultas e respostas curtas passam por UDP, enquanto transferências de zona e respostas que excedem o limite de tamanho do UDP usam TCP. Esse limite é de 512 bytes ou do tamanho de buffer que o cliente anuncia via EDNS(0).

## Veja também {/*#see-also*/}

- [TCP](./tcp.md): a contraparte orientada a conexão, com confiabilidade, ordenação e controle de fluxo
- [Modelo OSI](./osi-model.md): onde a camada de transporte se situa entre as camadas de rede e de sessão
- [DHCP](./dhcp.md): um protocolo que depende de broadcasts UDP
- [DNS](./dns.md): usa UDP para consultas e TCP para respostas grandes
