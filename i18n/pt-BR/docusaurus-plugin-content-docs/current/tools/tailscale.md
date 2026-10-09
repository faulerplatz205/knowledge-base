---
title: "Tailscale"
description: "Visão geral do Tailscale: uma VPN em malha (mesh) construída sobre o WireGuard para conectar dispositivos com segurança entre redes."
keywords:
  - "Tailscale"
  - "VPN"
  - "WireGuard"
  - "Rede em malha"
  - "Tailnet"
  - "VPN sem configuração"
  - "Redes"
machine_translated: true
---

# Tailscale

## O que é o Tailscale? {/*#what-is-tailscale*/}

O Tailscale é um serviço de VPN em malha sem configuração, construído sobre o [WireGuard](../fundamentals/wireguard.md). Ele conecta dispositivos em uma rede privada chamada "**tailnet**", independentemente de sua localização ou de estarem atrás de NAT, firewalls ou provedores de internet diferentes.

Ao contrário das VPNs tradicionais, que roteiam todo o tráfego por um gateway central, o Tailscale estabelece **conexões ponto a ponto diretas** entre os dispositivos sempre que possível. Isso resulta em menor latência e maior vazão.

---

## Arquitetura {/*#architecture*/}

O Tailscale tem dois componentes principais:

- **Plano de controle**: o servidor de coordenação do Tailscale gerencia a troca de chaves e a autenticação e distribui a configuração da rede a todos os nós. Ele nunca vê o tráfego real.
- **Plano de dados**: o tráfego real flui diretamente entre os nós por túneis WireGuard criptografados, sem passar pelos servidores do Tailscale.

```text
Device A <===[WireGuard tunnel (direct P2P)]===> Device B
             (Tailscale control plane: key exchange only)
```

Quando uma conexão direta não é possível (p. ex. firewalls rígidos em ambos os lados), o Tailscale recorre aos seus servidores **DERP** (Designated Encrypted Relay for Packets), que retransmitem pacotes criptografados sem conseguir lê-los.

---

## Conceitos-chave {/*#key-concepts*/}

### Tailnet {/*#tailnet*/}

Uma tailnet é a rede privada formada por todos os dispositivos conectados ao Tailscale. Dispositivos na mesma tailnet podem se comunicar diretamente, como se estivessem na mesma rede local.

### Nós {/*#nodes*/}

Qualquer dispositivo (notebook, servidor, celular, Raspberry Pi) registrado no Tailscale e associado a uma tailnet é chamado de **nó**. Cada nó recebe um endereço IP privado estável na faixa `100.64.0.0/10` (espaço de Carrier-Grade NAT).

### MagicDNS {/*#magicdns*/}

O MagicDNS atribui automaticamente nomes de host legíveis a todos os nós da tailnet (p. ex. `my-laptop`, `home-server`). Assim, é possível conectar-se aos dispositivos pelo nome em vez do endereço IP, sem configurar nenhum DNS manualmente.

### Exit nodes {/*#exit-nodes*/}

Um **exit node** é um nó que roteia por si todo o tráfego de internet de outros nós. Isso é útil para:

- Acessar a internet como se fosse de outra localização
- Impor um único IP de saída para todos os dispositivos
- Proteger o tráfego em redes não confiáveis (p. ex. Wi-Fi público)

### Subnet routers {/*#subnet-routers*/}

Um **subnet router** permite que um nó do Tailscale anuncie o acesso a uma rede local (sub-rede) existente. Os demais membros da tailnet podem então alcançar dispositivos dessa sub-rede sem instalar o Tailscale em cada um deles.

```text
Tailnet Node (subnet router) <===> Local Network (192.168.1.0/24)
                                         |
                               [Non-Tailscale devices]
```

**Caso de uso típico:** expor uma LAN doméstica ou de escritório a todos os dispositivos Tailscale da tailnet.

### ACLs (Access Control Lists) {/*#acls-access-control-lists*/}

O Tailscale usa uma política de ACL gerenciada de forma centralizada para controlar quais nós podem se comunicar entre si. As regras são escritas em um formato HuJSON, baseado em JSON, no console de administração do Tailscale.

---

## Benefícios {/*#benefits*/}

- **Sem configuração**: sem encaminhamento de portas, sem regras de firewall, sem gerenciamento manual de chaves
- **Funciona atrás de NAT**: usa técnicas de NAT traversal para estabelecer conexões diretas
- **Criptografia de ponta a ponta**: todo o tráfego é criptografado pelo WireGuard; os servidores do Tailscale nunca veem os dados transportados
- **Multiplataforma**: disponível para Linux, macOS, Windows, iOS, Android e outros
- **Acesso baseado em identidade**: autenticação por provedores de SSO (Google, GitHub, Microsoft etc.)

---

## Casos de uso comuns {/*#common-use-cases*/}

| Caso de uso                        | Como                                      |
| ---------------------------------- | ----------------------------------------- |
| Acessar um servidor doméstico remotamente | Registrar o servidor como nó       |
| Proteger Wi-Fi público             | Rotear o tráfego por um exit node         |
| Alcançar dispositivos sem Tailscale | Usar um subnet router                    |
| Conectar uma equipe distribuída    | Todos os membros entram na mesma tailnet  |
| Acesso a um home lab               | Registrar todas as máquinas do lab como nós |
