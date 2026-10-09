---
title: "DNS"
description: "Como o Domain Name System resolve nomes em endereços IP: hierarquia e FQDN, zonas e tipos de registro, consultas recursivas vs. iterativas e cache."
keywords:
    - DNS
    - Domain Name System
    - FQDN
    - Zona
    - Pesquisa direta
    - Pesquisa reversa
    - Consulta recursiva
    - Consulta iterativa
tags:
    - ap2
machine_translated: true
---

# DNS (Domain Name System)

O DNS resolve nomes DNS em endereços IP e vice-versa. Um nome DNS tem duas partes: o **nome do host**, que identifica um único host, e o **nome de domínio**, que identifica um grupo de hosts em um namespace compartilhado. As duas partes são separadas por um ponto.

## Hierarquia e FQDN {/*#hierarchy-and-fqdn*/}

O DNS é um sistema hierárquico, estruturado da raiz para baixo:

- **Raiz (root)** – O topo da hierarquia (escrito como `.`)
- **Top-Level Domain (TLD)** – por exemplo `com`, `net`, `de`, `org`
- **Second-Level Domain** – por exemplo `heise` em `heise.de`
- **Subdomínio / host** – outros níveis abaixo do second-level domain, por exemplo `www`

Quando todas as partes até a raiz são especificadas, o resultado é o **FQDN** (Fully Qualified Domain Name), que deve ser único na rede, por exemplo `www.heise.de`.

## Zonas {/*#zones*/}

Cada servidor DNS é responsável por uma parte delimitada do namespace, chamada de **zona** (por exemplo `heise.de`). O servidor que gerencia o arquivo de uma zona detém a **autoridade** sobre essa zona.

- **Zona primária** – Acesso de leitura e escrita; a cópia autoritativa da zona.
- **Zona secundária** – Uma cópia somente leitura de uma zona primária (para redundância ou distribuição de carga). Pode responder a consultas, mas não pode atualizar o arquivo da zona.

Os dados da zona são trocados entre servidores por **transferência de zona** (dois servidores DNS sem controlador de domínio) ou **replicação de zona** (zonas integradas ao Active Directory em controladores de domínio).

Por direção:

- **Zona de pesquisa direta** – Resolve nomes de domínio em endereços IP.
- **Zona de pesquisa reversa** – Resolve endereços IP em nomes de domínio.

## Tipos de registro {/*#record-types*/}

| Registro    | Finalidade                                   |
| --------- | ----------------------------------------- |
| **A**     | Nome de domínio para endereço IPv4               |
| **AAAA**  | Nome de domínio para endereço IPv6               |
| **CNAME** | Alias que aponta para outro registro de host     |
| **SRV**   | Resolve um serviço em um endereço IP       |
| **PTR**   | Pesquisa reversa: endereço IP para nome de domínio |

## Consultas recursivas vs. iterativas {/*#recursive-vs-iterative-queries*/}

- **Consulta recursiva** – O cliente a envia ao seu servidor de nomes e espera uma resposta final (o endereço IP). Se o servidor mantém a zona, ele retorna uma **resposta autoritativa**.
- **Consulta iterativa** – Se o servidor não consegue responder por conta própria, ele consulta outros servidores DNS ao longo da hierarquia. Cada um pode apenas apontar para o próximo servidor responsável, em vez de dar a resposta final, até que o servidor autoritativo seja alcançado.
- **Cache** – Todo servidor envolvido armazena os resultados em seu **cache DNS**. Uma resposta em cache é retornada como **resposta não autoritativa**.

## Exemplo de resolução (`www.example.com`) {/*#example-resolution-wwwexamplecom*/}

1. O cliente envia uma consulta **recursiva** ao seu servidor DNS configurado.
2. Esse servidor não é autoritativo e não tem entrada em cache, portanto envia uma consulta **iterativa** a um servidor de nomes **raiz**.
3. O servidor raiz responde com o endereço do servidor de nomes do TLD `com.`.
4. O servidor DNS consulta o servidor de nomes `com.`.
5. O servidor `com.` responde com o endereço do servidor de nomes `example.com.`.
6. O servidor DNS consulta o servidor de nomes `example.com.`.
7. Esse servidor, autoritativo para a zona, responde com o endereço IP do FQDN.
8. O servidor DNS retorna o endereço IP ao cliente (e o armazena em cache).

## Arquivo HOSTS {/*#hosts-file*/}

Em redes muito pequenas, um arquivo estático `HOSTS` (`C:\Windows\System32\Drivers\etc\HOSTS`) pode mapear nomes de host em endereços IP no lugar do DNS. Como o Active Directory exige o DNS, essa alternativa raramente é usada hoje.

## Comandos úteis (cliente) {/*#useful-commands-client*/}

| Comando                | Finalidade                   |
| ---------------------- | ------------------------- |
| `ipconfig /displaydns` | Exibe o cache DNS local  |
| `ipconfig /flushdns`   | Limpa o cache DNS local |

## Regras de nomenclatura para domínios Windows {/*#naming-rules-for-windows-domains*/}

- Para redes internas, usar um subdomínio de um domínio oficial da internet (por exemplo `media.ct.de` em vez de `media.ct.local`).
- Manter os nomes curtos (domínios com no máximo 64 caracteres).
