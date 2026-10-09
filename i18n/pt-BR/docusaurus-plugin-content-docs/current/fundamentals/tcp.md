---
title: "TCP"
description: "Transmission Control Protocol: estabelecimento e encerramento de conexão, mecanismos de confiabilidade, controle de fluxo e de congestionamento, casos de uso típicos."
keywords:
    - TCP
    - Transmission Control Protocol
    - Handshake de Três Vias
    - Orientado a Conexão
    - Confiabilidade
    - Controle de Fluxo
    - Controle de Congestionamento
    - Camada de Transporte
tags:
    - ap2
machine_translated: true
---

# TCP (Transmission Control Protocol)

## Visão geral {/*#overview*/}

O TCP é um protocolo de transporte orientado a conexão na camada 4 do [modelo OSI](./osi-model.md), especificado na RFC 9293. Ele transforma a entrega não confiável de pacotes do IP em um fluxo de bytes confiável e ordenado entre duas aplicações: tudo o que é escrito em um lado chega ao outro completo, na ordem correta e sem duplicatas, ou a conexão reporta um erro. Um endpoint TCP é endereçado pela combinação de endereço IP e número de porta.

---

## Características {/*#characteristics*/}

| Propriedade           | Comportamento no TCP                                                      |
| --------------------- | ------------------------------------------------------------------------- |
| Conexão               | Orientado a conexão, uma conexão é estabelecida antes da primeira carga útil |
| Entrega               | Confiável, segmentos perdidos são retransmitidos                          |
| Ordem                 | Garantida, os segmentos são reordenados pelo número de sequência antes da entrega |
| Duplicatas            | Detectadas e descartadas                                                  |
| Modelo de dados       | Fluxo contínuo de bytes, os limites das mensagens não são preservados     |
| Direção               | Full duplex, ambos os lados podem enviar ao mesmo tempo                   |
| Controle de fluxo     | Sim, por meio da janela de recepção                                       |
| Controle de congestionamento | Sim, a taxa de envio se adapta à carga da rede                     |
| Tamanho do cabeçalho  | 20 bytes no mínimo, até 60 bytes com opções                               |
| Broadcast / multicast | Não é possível, uma conexão sempre tem exatamente dois endpoints          |

O custo dessas garantias consiste em um cabeçalho maior, uma ida e volta adicional para o estabelecimento da conexão e atraso sempre que um segmento perdido precisa ser retransmitido.

---

## Cabeçalho do segmento {/*#segment-header*/}

| Campo                  | Finalidade                                                             |
| ---------------------- | ---------------------------------------------------------------------- |
| Porta de origem        | Porta da aplicação remetente                                           |
| Porta de destino       | Porta da aplicação destinatária                                        |
| Número de sequência    | Posição do primeiro byte de carga útil deste segmento no fluxo de bytes |
| Número de confirmação  | Próximo byte que o remetente deste segmento espera receber             |
| Flags                  | Bits de controle, ver abaixo                                           |
| Janela                 | Número de bytes que o remetente deste segmento consegue aceitar no momento |
| Checksum               | Detecção de erros sobre cabeçalho e carga útil                         |
| Opções                 | Maximum Segment Size, escalonamento de janela, confirmação seletiva    |

### Flags de controle {/*#control-flags*/}

| Flag                    | Significado                                                         |
| ----------------------- | ------------------------------------------------------------------- |
| `SYN` (Synchronize)     | Solicita uma conexão e sincroniza os números de sequência           |
| `ACK` (Acknowledgement) | O número de confirmação é válido                                    |
| `FIN` (Finish)          | Nenhum dado adicional será enviado nesta direção                    |
| `RST` (Reset)           | Aborta a conexão imediatamente, sem encerramento ordenado           |
| `PSH` (Push)            | Solicita ao receptor que repasse os dados à aplicação sem atraso    |
| `URG` (Urgent)          | Marca dados urgentes (obsoleto na prática)                          |

---

## Estabelecimento da conexão (handshake de três vias) {/*#connection-establishment-three-way-handshake*/}

Ambos os lados anunciam o próprio número de sequência inicial (`x` e `y` no diagrama) e confirmam o do outro lado com `ack = x + 1` ou `ack = y + 1`.

```text
Client                                           Server

  | ---- SYN, seq = x -------------------------> |   listening
  |                                              |
  | <--- SYN, ACK, seq = y, ack = x + 1 -------- |   connection accepted
  |                                              |
  | ---- ACK, ack = y + 1 ---------------------> |   connection established
  |                                              |
  | ==== payload ==============================> |
```

- O cliente sabe após o segundo segmento, e o servidor após o terceiro, que a conexão funciona nos dois sentidos.
- O handshake custa uma ida e volta antes que o primeiro byte de carga útil possa ser enviado.
- Um `SYN` enviado a uma porta fechada é respondido com `RST`, e é assim que um port scan distingue uma porta fechada de uma filtrada.

---

## Encerramento da conexão {/*#connection-teardown*/}

Um encerramento ordenado fecha cada direção separadamente e, por isso, exige quatro segmentos. `FIN` significa apenas que *este lado terminou de enviar*. A outra direção ainda pode transportar dados (half-close).

```text
Client                                           Server

  | ---- FIN ----------------------------------> |
  | <--- ACK ----------------------------------- |
  | <--- FIN ----------------------------------- |
  | ---- ACK ----------------------------------> |
  |                                              |
  | (TIME_WAIT, then the connection is released) |
```

O lado que fecha primeiro permanece em `TIME_WAIT` por um curto período, para que segmentos atrasados da conexão antiga não sejam confundidos com segmentos de uma nova conexão no mesmo par de portas. Um `RST` ignora esse procedimento e descarta tudo o que ainda está em trânsito.

---

## Confiabilidade {/*#reliability*/}

- **Números de sequência:** cada byte de carga útil tem uma posição no fluxo, o que permite reordenação e detecção de duplicatas.
- **Confirmações:** o receptor confirma o próximo byte esperado e, assim, confirma de forma cumulativa tudo o que foi recebido até então.
- **Timeout de retransmissão:** um segmento não confirmado dentro do timeout é enviado novamente. O timeout é derivado do tempo de ida e volta medido.
- **Fast retransmit:** várias confirmações duplicadas para o mesmo byte indicam um único segmento perdido e disparam uma retransmissão antes de o timeout expirar.
- **Checksum:** um segmento corrompido é descartado e, portanto, nunca confirmado. A confirmação ausente dispara uma retransmissão.
- **Confirmação seletiva (SACK):** uma opção que permite ao receptor informar exatamente quais intervalos de bytes chegaram, de modo que apenas os intervalos ausentes sejam reenviados.

---

## Controle de fluxo {/*#flow-control*/}

O controle de fluxo protege o *receptor* contra sobrecarga. Cada segmento anuncia, em seu campo de janela, quantos bytes o remetente consegue armazenar no momento. O outro lado nunca pode ter mais dados não confirmados em trânsito do que essa janela permite.

Um receptor com o buffer cheio anuncia uma janela de zero. O remetente então faz uma pausa até que um segmento posterior anuncie uma janela maior.

## Controle de congestionamento {/*#congestion-control*/}

O controle de congestionamento protege a *rede* contra sobrecarga e funciona independentemente da janela de recepção. O limite efetivo de envio é o menor valor entre a janela de recepção e a janela de congestionamento.

| Fase                 | Comportamento                                                             |
| -------------------- | ------------------------------------------------------------------------- |
| Slow start           | A janela de congestionamento começa pequena e cresce exponencialmente     |
| Congestion avoidance | Acima de um limiar, a janela cresce apenas linearmente                    |
| Perda detectada      | A janela é reduzida, pois a perda de pacotes sinaliza congestionamento    |
| Fast recovery        | Após um fast retransmit, a transferência continua com uma janela reduzida |

---

## Casos de uso típicos {/*#typical-use-cases*/}

### TCP vs. UDP {/*#tcp-vs-udp*/}

|           | TCP                                                                           | [UDP](./udp.md)                                                                 |
| --------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| Critério  | A completude importa mais que a latência                                      | Um pacote atrasado não tem valor, ou o custo de uma conexão supera a carga útil |
| Exemplos  | Transferência de arquivos, páginas web, e-mail, administração remota, conexões de banco de dados | Áudio e vídeo ao vivo, jogos online, protocolos simples de consulta/resposta |

### Portas TCP conhecidas {/*#well-known-tcp-ports*/}

| Porta   | Serviço                                                       |
| ------- | ------------------------------------------------------------- |
| 20/21   | FTP dados / controle                                          |
| 22      | SSH                                                           |
| 25      | SMTP                                                          |
| 53      | Transferências de zona DNS e respostas que excedem o limite de tamanho do UDP |
| 80      | HTTP                                                          |
| 110/995 | POP3 / POP3S                                                  |
| 143/993 | IMAP / IMAPS                                                  |
| 443     | HTTPS                                                         |
| 3306    | MySQL / MariaDB                                               |

## Veja também {/*#see-also*/}

- [UDP](./udp.md): a contraparte sem conexão, sem estabelecimento de conexão, confiabilidade ou controle de fluxo
- [Modelo OSI](./osi-model.md): onde a camada de transporte se situa entre as camadas de rede e de sessão
