---
title: "WireGuard"
description: "Visão geral do WireGuard: um protocolo de VPN moderno e rápido que usa criptografia de última geração."
keywords:
  - "WireGuard"
  - "VPN"
  - "Tunelamento"
  - "Criptografia"
  - "Redes"
  - "UDP"
machine_translated: true
---

# WireGuard

## O que é o WireGuard? {/*#what-is-wireguard*/}

O WireGuard é um protocolo de VPN moderno que cria túneis criptografados entre dispositivos. Foi projetado para ser significativamente mais simples e rápido que protocolos mais antigos, como IPsec ou OpenVPN, com uma base de código muito menor (~4.000 linhas contra centenas de milhares).

O WireGuard opera na **[camada de rede](./osi-model.md#layer-3--network) (camada 3)** e cria uma interface de rede virtual em cada dispositivo. O tráfego roteado por essa interface é criptografado e enviado aos peers por UDP.

---

## Como funciona {/*#how-it-works*/}

O WireGuard usa um conceito chamado **cryptokey routing**: cada peer é identificado por sua chave pública, e cada peer define quais endereços IP são alcançáveis por meio dele.

```text
[Interface]
PrivateKey = <your private key>
Address    = 10.0.0.1/24
ListenPort = 51820

[Peer]
PublicKey  = <peer's public key>
AllowedIPs = 10.0.0.2/32
Endpoint   = 203.0.113.5:51820
```

Quando o IP de destino de um pacote de saída corresponde ao `AllowedIPs` de um peer, o WireGuard o criptografa e o envia ao `Endpoint` desse peer. Os pacotes de entrada são descriptografados e aceitos apenas se chegarem de uma chave pública conhecida e se o IP de origem estiver dentro do `AllowedIPs` desse peer.

---

## Conceitos-chave {/*#key-concepts*/}

### Pares de chaves {/*#key-pairs*/}

Cada interface WireGuard tem uma **chave privada** e uma **chave pública** derivada dela. As chaves públicas são trocadas fora de banda (manualmente ou por uma ferramenta como o [Tailscale](../tools/tailscale.md)) e servem como identidade de um peer.

### Interface {/*#interface*/}

Uma **interface** WireGuard é uma interface de rede virtual (p. ex. `wg0`) em um dispositivo. Ela tem seu próprio endereço IP e escuta pacotes UDP de entrada em uma porta configurada.

### Peer {/*#peer*/}

Um **peer** é qualquer outra interface WireGuard com a qual essa interface pode se comunicar. Cada entrada de peer define:

- **PublicKey**: a chave pública do peer
- **AllowedIPs**: faixas de IP cujo tráfego é roteado por esse peer
- **Endpoint** *(opcional)*: o endereço IP real e a porta UDP do peer

### AllowedIPs {/*#allowedips*/}

`AllowedIPs` tem dupla finalidade:

- **Saída**: atua como regra de roteamento — pacotes para esses IPs são enviados a esse peer
- **Entrada**: atua como filtro — pacotes desse peer só são aceitos se o IP de origem estiver dentro dessa faixa

Definir `AllowedIPs = 0.0.0.0/0` roteia todo o tráfego por um peer, o que é a base de configurações de exit node / VPN de túnel completo.

---

## Criptografia {/*#cryptography*/}

O WireGuard usa um conjunto criptográfico fixo e moderno — não há negociação, o que elimina toda uma classe de ataques de downgrade:

| Finalidade            | Algoritmo          |
| --------------------- | ------------------ |
| Troca de chaves       | Curve25519 (ECDH)  |
| Cifra simétrica       | ChaCha20           |
| Autenticação          | Poly1305 (MAC)     |
| Hashing               | BLAKE2s            |
| Derivação de chaves   | HKDF               |

---

## Comparação com outros protocolos de VPN {/*#comparison-to-other-vpn-protocols*/}

| Propriedade            | WireGuard        | OpenVPN         | IPsec                |
| ---------------------- | ---------------- | --------------- | -------------------- |
| Tamanho da base de código | ~4.000 linhas | ~70.000 linhas  | Muito grande         |
| Protocolo              | Apenas UDP       | TCP ou UDP      | UDP / ESP            |
| Configuração           | Simples          | Complexa        | Complexa             |
| Desempenho             | Muito rápido     | Moderado        | Rápido               |
| Criptografia           | Fixa, moderna    | Configurável    | Configurável         |
| NAT traversal          | Integrado        | Limitado        | Exige componentes extras |

---

## Relação com o Tailscale {/*#relation-to-tailscale*/}

O WireGuard cuida apenas do **plano de dados** => criptografa e roteia pacotes entre peers. Ele não cuida de descoberta de peers, distribuição de chaves nem controle de acesso.

O [Tailscale](../tools/tailscale.md) é construído sobre o WireGuard e adiciona um **plano de controle** gerenciado: troca automática de chaves, descoberta de peers, NAT traversal, MagicDNS e ACLs. Dessa forma, o desempenho do WireGuard é obtido sem nenhuma configuração manual.
