---
title: "Subnetting (IPv4)"
description: "Fundamentos, cálculos e exemplos de subnetting (IPv4)"
keywords:
    - Subnetting
    - IPv4
last_update:
    author: moritz-grimm
tags:
    - ap2
machine_translated: true
---

# Subnetting (IPv4)

## Fundamentos de subnetting {/*#subnetting-basics*/}

O subnetting divide uma rede grande em sub-redes (subnets) menores e mais fáceis de gerenciar. Isso melhora o desempenho, a organização e a segurança.

| Termo            | Símbolo/Ref | Definição                                                    | Exemplo                |
| ---------------- | ---------- | ------------------------------------------------------------ | ---------------------- |
| **Endereço IP**  | IP         | Endereço único de um dispositivo na rede.                    | `192.168.1.10`         |
| **Máscara de sub-rede** | Netmask | Separa a parte de rede da parte de host.                  | `255.255.255.0`        |
| **CIDR**         | Notação com barra | Formato abreviado da máscara (quantidade de bits "1"). | `/24`                  |
| **ID de rede**   | Net ID     | O "nome da rua". O primeiro endereço da sub-rede.            | `192.168.1.0`          |
| **Broadcast**    | Bcast      | Chamada para *todos* os dispositivos. O último endereço.     | `192.168.1.255`        |
| **Host**         | Host       | Um dispositivo (PC, roteador) dentro da sub-rede.            | `.1` a `.254`         |
| **Bits de rede** | Net-Bits   | Bits do endereço IP que identificam a rede.                  | `/24` => primeiros 24 bits |
| **Bits de host** | Host-Bits  | Bits do endereço IP que identificam os hosts dentro da rede. | `24` => últimos 8 bits    |

**Regra:** Um endereço IPv4 consiste em **32 bits**, divididos em 4 octetos (8 bits cada).  
**Formato:** `x.x.x.x` (decimal) ou `11000000.10101000.00000001.00001010` (binário)

---

## Entendendo máscaras de sub-rede e CIDR {/*#understanding-subnet-masks--cidr*/}

A máscara de sub-rede informa ao computador qual parte do IP é a **rede** (rua) e qual é o **host** (número da casa).

### Notação CIDR (Classless Inter-Domain Routing) {/*#cidr-notation-classless-inter-domain-routing*/}

O CIDR (por exemplo, `/24`) apenas conta o número de **bits ativos** na máscara, da esquerda para a direita.

| CIDR | Máscara de sub-rede decimal | Máscara de sub-rede binária (primeiros octetos) | Hosts por sub-rede* |
| ---- | ------------------- | --------------------------------- | ----------------- |
| /8   | 255.0.0.0           | `11111111.00000000...`            | 16.777.214        |
| /16  | 255.255.0.0         | `11111111.11111111...`            | 65.534            |
| /24  | 255.255.255.0       | `11111111...11111111.0`           | 254               |
| /25  | 255.255.255.128     | `11111111...1.10000000`           | 126               |
| /26  | 255.255.255.192     | `11111111...1.11000000`           | 62                |
| /30  | 255.255.255.252     | `11111111...1.11111100`           | 2                 |

**Nota:** Total de endereços menos 2 (1 para o ID de rede, 1 para o broadcast).

---

## Métodos de cálculo {/*#calculation-methods*/}

### 1. Cálculo do tamanho da sub-rede (número de hosts) {/*#1-calculating-subnet-size-number-of-hosts*/}

Quantos **endereços IP no total** uma sub-rede contém (considerando todos os octetos)

```text
Formula (Total Addresses): 2^(Host-Bits) = Total Addresses
Formula (Usable Hosts): 2^(Host-Bits) - 2 = Usable Hosts

Host-Bits = 32 - (CIDR)
```

#### Exemplo: rede /24 {/*#example-24-network*/}

1. **Bits de host:** 32 - 24 = 8 bits
2. **Cálculo:** 2⁸ = 256
3. **Utilizáveis:** 256 - 2 = **254 hosts**

#### Exemplo: rede /26 {/*#example-26-network*/}

1. **Bits de host:** 32 - 26 = 6 bits
2. **Cálculo:** 2⁶ = 64
3. **Utilizáveis:** 64 - 2 = **62 hosts**

---

### 2. Encontrando o "número mágico" (tamanho do bloco no octeto interessante) {/*#2-finding-the-magic-number-block-size-in-the-interesting-octet*/}

O número mágico representa o **tamanho do passo** dentro do octeto em que ocorre o subnetting.

**Importante:** O número mágico só se aplica ao "octeto interessante" (o octeto em que a máscara de sub-rede não é nem 0 nem 255).

```text
Method 1 (Binary Place):
Look at the last bit set to '1' in the subnetmask. Its value is the Magic Number.

Method 2 (Subtraction):
256 - (Last non-zero octet of the mask) = Magic Number
```

#### Qual octeto é "interessante"? {/*#which-octet-is-interesting*/}

- `/24 - /32`: o **4º octeto** muda
- `/16 - /23`: o **3º octeto** muda
- `/8 - /15`: o **2º octeto** muda

#### Relação entre os métodos [1](#1-calculating-subnet-size-number-of-hosts) e [2](#2-finding-the-magic-number-block-size-in-the-interesting-octet) {/*#relationship-between-methods-1--2*/}

- **Para `/24+` (subnetting no 4º octeto):** número mágico = 2^(bits de host) ✔
- **Para `/23-` (subnetting em octetos anteriores):** os valores diferem:
  - **Cálculo do tamanho da sub-rede:** o total de endereços abrange vários octetos
  - **Encontrar o "número mágico":** o número mágico é apenas o tamanho do passo em um octeto

#### Exemplo: máscara /26 => 255.255.255.192 - subnetting no 4º octeto {/*#example-26-mask--255255255192---4th-octet-subnetting*/}

- **Octeto interessante:** 192
- **Cálculo:** 256 - 192 = **64**
- **Resultado:** As redes aumentam em passos de 64 (0, 64, 128, 192).

#### Exemplo: máscara `/18` => 255.255.192.0 - subnetting no 3º octeto {/*#example-18-mask--2552551920---3rd-octet-subnetting*/}

**Tamanho total:**

- Bits de host: 32 - 18 = 14
- Total de endereços: 2^14 = **16.384**

**Número mágico (tamanho do passo no 3º octeto):**

- Máscara: `255.255.192.0`
- Octeto interessante: 3º (192)
- Número mágico: 256 - 192 = **64**
- Significado: o 3º octeto incrementa em 64 (0, 64, 128, 192)

**Como se conectam:**

- O 64 é o passo no 3º octeto
- Cada passo contém 256 endereços (o 4º octeto completo)
- Total: 64 x 256 = 16.384 ✔

---

### 3. Cálculo do número de sub-redes {/*#3-calculating-number-of-subnets*/}

Ao dividir uma rede em sub-redes, bits da parte de host são "emprestados" para criar mais redes.

```text
Formula: 2^(Borrowed Bits) = Number of Subnets

Borrowed Bits = New CIDR - Original CIDR
```

#### Exemplo: de /24 para /26 {/*#example-from-24-to-26*/}

**Cenário:** Existe a rede `192.168.1.0/24` e ela deve ser dividida em `/26` sub-redes.

1. **Rede original:** `/24` (256 endereços no total)
2. **Novo tamanho de sub-rede:** `/26`
3. **Bits emprestados:** 26 - 24 = **2 bits**
4. **Número de sub-redes:** 2² = **4 sub-redes**

**Resultado:** Resultam 4 sub-redes, cada uma com 64 endereços (62 hosts utilizáveis).

| Sub-rede nº | ID de rede    | Primeiro host | Último host   | Broadcast     |
| -------- | ------------- | ------------- | ------------- | ------------- |
| 1        | 192.168.1.0   | 192.168.1.1   | 192.168.1.62  | 192.168.1.63  |
| 2        | 192.168.1.64  | 192.168.1.65  | 192.168.1.126 | 192.168.1.127 |
| 3        | 192.168.1.128 | 192.168.1.129 | 192.168.1.190 | 192.168.1.191 |
| 4        | 192.168.1.192 | 192.168.1.193 | 192.168.1.254 | 192.168.1.255 |

#### Exemplo: de /16 para /24 {/*#example-from-16-to-24*/}

**Cenário:** O provedor de internet atribui `10.0.0.0/16` e são necessárias `/24` redes para departamentos.

1. **Original:** `/16`
2. **Novo:** `/24`
3. **Bits emprestados:** 24 - 16 = **8 bits**
4. **Número de sub-redes:** 2⁸ = **256 sub-redes**

**Resultado:** É possível criar 256 redes de departamento (10.0.0.0/24, 10.0.1.0/24, ..., 10.0.255.0/24).

---

## Exemplo de cálculo passo a passo {/*#step-by-step-example-calculation*/}

**Tarefa:** Analisar o IP `192.168.10.150` com a máscara `255.255.255.192` (/26).

### Passo 1: encontrar o número mágico (tamanho do bloco) {/*#step-1-find-the-magic-number-block-size*/}

- A máscara é `/26`. A mudança ocorre no 4º octeto.
- Máscara no 4º octeto: `192`
- Número mágico: `256 - 192 = 64`

### Passo 2: determinar as faixas de sub-rede {/*#step-2-determine-subnet-ranges*/}

Incrementa-se de 64 em 64 até ultrapassar o endereço IP (`150`).

- Sub-rede 1: `0 - 63`
- Sub-rede 2: `64 - 127`
- Sub-rede 3: `128 - 191`  (o 150 se enquadra nesta faixa)
- Sub-rede 4: `192 - 255`

### Passo 3: calcular os endereços {/*#step-3-calculate-addresses*/}

O IP `192.168.10.150` pertence à sub-rede `.128`.

| Tipo           | Cálculo              | Resultado          |
| -------------- | -------------------- | ------------------ |
| **ID de rede** | Início do bloco      | **192.168.10.128** |
| **Primeiro host** | ID de rede + 1    | **192.168.10.129** |
| **Último host** | Broadcast - 1       | **192.168.10.190** |
| **Broadcast**  | Próximo bloco (192) - 1 | **192.168.10.191** |

---

## Referência rápida: sub-redes comuns {/*#quick-reference-common-subnets*/}

| CIDR    | Máscara (.x) | Número mágico | Hosts utilizáveis | Caso de uso típico               |
| ------- | --------- | ------------ | ------------ | -------------------------------- |
| **/24** | .0        | 256          | 254          | LAN padrão (residencial/escritório) |
| **/25** | .128      | 128          | 126          | Divisão de uma LAN ao meio       |
| **/26** | .192      | 64           | 62           | Redes de departamento            |
| **/27** | .224      | 32           | 30           | Equipes pequenas                 |
| **/28** | .240      | 16           | 14           | Grupos muito pequenos            |
| **/29** | .248      | 8            | 6            | Redes de transferência (roteador a roteador) |
| **/30** | .252      | 4            | 2            | Enlaces ponto a ponto            |
| **/32** | .255      | 1            | 1            | IP de host único (loopback)      |

---

## Armadilhas comuns {/*#common-pitfalls*/}

- **Esquecer ID/broadcast:** Sempre subtrair 2 para obter os hosts *utilizáveis*.
- **Passo errado:** As faixas de sub-rede são inclusivas. A primeira sub-rede termina, portanto, em `start + block size − 1`. Quando a primeira sub-rede está correta, os finais das sub-redes seguintes podem ser calculados somando o tamanho do bloco ao final da sub-rede anterior ou aplicando a mesma fórmula `start + block size − 1` com o endereço de rede de cada sub-rede.
- **Par/ímpar:** IDs de rede costumam ser números pares; broadcasts costumam ser números ímpares.
- **Octeto errado:** Uma sub-rede `/18` muda no *3º* octeto, não no 4º.
- `/8 - /15`: mudança no 2º octeto
- `/16 - /23`: mudança no 3º octeto
- `/24 - /32`: mudança no 4º octeto
