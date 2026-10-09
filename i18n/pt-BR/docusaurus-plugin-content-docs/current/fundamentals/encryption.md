---
title: "Criptografia e assinaturas digitais"
description: "Criptografia simétrica e assimétrica, incluindo AES, RSA e Diffie-Hellman, funções hash, hashing de senhas com salt e bcrypt, e assinaturas digitais."
keywords:
    - Criptografia
    - Assinatura digital
    - Criptografia simétrica
    - Criptografia assimétrica
    - Chave pública
    - Chave privada
    - Hash
    - AES
    - RSA
    - Diffie-Hellman
    - Salting
    - bcrypt
    - Hashing de senhas
    - Segurança
tags:
    - ap2
machine_translated: true
---

# Criptografia e assinaturas digitais

## Visão geral {/*#overview*/}

A criptografia protege os dados contra acesso não autorizado ao transformá-los em um formato ilegível. As assinaturas digitais verificam a autenticidade e a integridade dos dados, garantindo que não foram manipulados durante a transmissão.

## Criptografia simétrica {/*#symmetric-encryption*/}

Remetente e destinatário usam a **mesma chave** para criptografar e descriptografar os dados.

- **Rápida** e eficiente para criptografar grandes volumes de dados
- A **distribuição de chaves** é um desafio, porque a chave precisa ser compartilhada com segurança de antemão
- **Algoritmos comuns:** AES (Advanced Encryption Standard), DES (Data Encryption Standard), 3DES (Triple Data Encryption Standard)
- **Caso de uso típico:** criptografia de grandes volumes de dados

```text
Plaintext => [Encrypt with Key] => Ciphertext => [Decrypt with Key] => Plaintext
```

### AES {/*#aes*/}

O AES (Advanced Encryption Standard) foi padronizado em 2001 como sucessor do DES e é o algoritmo simétrico em uso atualmente.

- **Cifra de bloco:** criptografa blocos de 128 bits; dados mais longos são divididos em blocos e preenchidos (padding)
- **Tamanhos de chave:** 128, 192 ou 256 bits, que determinam o número de rodadas (10, 12 ou 14)
- **Desempenho:** implementado em hardware nas CPUs atuais (AES-NI), o que o torna rápido o suficiente para a criptografia de disco completo
- **Considerado seguro:** não existe ataque prático melhor do que testar todas as chaves

Como uma cifra de bloco criptografa cada bloco isoladamente, um **modo de operação** determina como os blocos são encadeados:

| Modo                        | Propriedade                                                                                                                 |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| ECB (Electronic Codebook)   | Cada bloco é criptografado de forma independente, blocos idênticos de texto claro produzem blocos idênticos de texto cifrado, portanto é inadequado |
| CBC (Cipher Block Chaining) | Cada bloco é combinado com o bloco de texto cifrado anterior, exige um vetor de inicialização, sem proteção de integridade    |
| CTR (Counter Mode)          | Transforma a cifra de bloco em uma cifra de fluxo paralelizável                                                               |
| GCM (Galois/Counter Mode)   | Escolha padrão atual: CTR mais uma tag de autenticação que também detecta manipulação                                    |

Uso típico: criptografia de arquivos e discos (LUKS, BitLocker, VeraCrypt), criptografia da carga útil no [TLS](#hybrid-encryption), arquivos compactados criptografados e colunas de bancos de dados.

### DES e 3DES {/*#des-and-3des*/}

O DES é o antecessor do AES, com chave de 56 bits, que hoje pode ser quebrada por força bruta em poucas horas e, por isso, está comprometido. O 3DES aplica o DES três vezes e alcança assim 112 bits efetivos, mas é lento e só é encontrado em sistemas legados. Nenhum dos dois é usado em novos desenvolvimentos.

---

## Criptografia assimétrica {/*#asymmetric-encryption*/}

Usa um **par de chaves**: uma chave pública (compartilhada abertamente) e uma chave privada (mantida em segredo).

- Dados criptografados com a chave pública só podem ser descriptografados com a chave privada correspondente
- **Mais lenta** que a criptografia simétrica devido à complexidade matemática
- **Algoritmos comuns:** RSA (Rivest-Shamir-Adleman), ECC (Elliptic Curve Cryptography)
- **Casos de uso típicos:** troca de chaves (criptografia híbrida), assinaturas digitais

```text
Plaintext => [Encrypt with Public Key of Receiver] => Ciphertext => [Decrypt with Private Key of Receiver] => Plaintext
```

### RSA {/*#rsa*/}

O RSA é o algoritmo assimétrico mais conhecido. Seu nome é formado a partir de seus inventores Rivest, Shamir e Adleman.

- **Base de segurança:** multiplicar dois números primos grandes é fácil; fatorar o produto de volta nesses números não é
- **Tamanhos de chave:** 2048 bits como mínimo, 3072 ou 4096 bits para proteção de longo prazo, não comparáveis aos tamanhos de chave simétricos
- **Capacidades:** criptografia e assinaturas digitais com o mesmo par de chaves
- **Limitação:** a carga útil precisa ser menor que a chave, razão pela qual o RSA criptografa uma chave simétrica em vez dos próprios dados

O ECC (Elliptic Curve Cryptography) alcança segurança comparável com chaves muito menores. Uma chave ECC de 256 bits corresponde aproximadamente a uma chave RSA de 3072 bits. Por isso o ECC se tornou o padrão para a troca de chaves no [TLS](#hybrid-encryption) (ECDHE) e é cada vez mais usado para assinaturas de certificados (ECDSA).

### Diffie-Hellman {/*#diffie-hellman*/}

O Diffie-Hellman não é um algoritmo de criptografia, mas um procedimento de **acordo de chaves**. Ambos os lados derivam um segredo compartilhado a partir de valores públicos e de seu próprio valor secreto, sem que esse segredo seja transmitido.

```text
Alice                                  Bob
secret a                               secret b
       ── public value A ────────────►
       ◄──────────── public value B ──
shared key from (B, a)  ==  shared key from (A, b)
```

- Um espião vê ambos os valores públicos, mas não consegue derivar deles a chave compartilhada
- Variantes **efêmeras** (DHE, ECDHE) geram um novo par de chaves por sessão, de modo que um comprometimento posterior da chave de longo prazo não descriptografa o tráfego gravado (forward secrecy)
- O Diffie-Hellman sozinho não autentica ninguém: sem um certificado, um atacante no meio pode acordar uma chave com cada lado e repassar o tráfego

---

## Criptografia híbrida {/*#hybrid-encryption*/}

Na prática, nenhum dos métodos é usado isoladamente: a criptografia assimétrica resolve a distribuição de chaves, e a criptografia simétrica faz o trabalho propriamente dito. O TLS os combina exatamente dessa forma:

1. O servidor comprova sua identidade com um **certificado** que contém sua chave pública.
2. Ambos os lados acordam uma chave de sessão por **ECDHE** e autenticam a troca com o certificado.
3. A carga útil é criptografada **simetricamente** com essa chave de sessão, geralmente AES-GCM.
4. A chave de sessão é descartada quando a conexão termina.

---

## Funções hash {/*#hash-functions*/}

Uma função hash mapeia dados de tamanho arbitrário para uma saída de tamanho fixo (hash/digest).

- **Unidirecional:** os dados originais não podem ser derivados do hash
- **Determinística:** a mesma entrada sempre produz o mesmo hash
- **Resistente a colisões:** entradas diferentes não devem produzir o mesmo hash
- **Efeito avalanche:** alterar um único bit da entrada altera aproximadamente metade dos bits do hash

Aplicações típicas: verificações de integridade em downloads, detecção de duplicatas, assinaturas e, em combinação com os procedimentos abaixo, o armazenamento de senhas.

| Algoritmo | Tamanho do digest | Avaliação                                                                                                   |
| --------- | ------------- | ------------------------------------------------------------------------------------------------------------ |
| MD5       | 128 bits       | Comprometido, colisões podem ser produzidas em segundos, aceitável apenas como checksum contra erros de transmissão |
| SHA-1     | 160 bits       | Comprometido, existem ataques práticos de colisão, não é mais usado para assinaturas                                     |
| SHA-256   | 256 bits       | Padrão atual, parte da família SHA-2                                                                   |
| SHA-512   | 512 bits       | Como o SHA-256 com digest mais longo, mais rápido que o SHA-256 em sistemas de 64 bits                                     |
| SHA-3     | variável      | Construção interna diferente da do SHA-2, concebido como reserva caso o SHA-2 seja enfraquecido                   |

---

## Hashing de senhas {/*#hashing-passwords*/}

Senhas nunca são armazenadas em texto claro e nunca criptografadas, porque uma chave capaz de descriptografá-las precisaria existir em algum lugar. Elas passam por hash, de modo que um banco de dados roubado não revele as senhas em si.

Um simples `SHA-256` não basta para isso, por dois motivos:

- **Senhas idênticas produzem hashes idênticos**, de modo que o hash revela quais contas compartilham uma senha, e uma tabela pré-computada (rainbow table) resolve senhas comuns imediatamente
- **Funções hash são rápidas por projeto**, e o hardware atual calcula bilhões de hashes SHA-256 por segundo, o que torna prático o ataque de força bruta a senhas curtas

### Salt {/*#salt*/}

Um salt é um valor aleatório gerado por senha e submetido a hash junto com ela. O salt não é secreto e é armazenado ao lado do hash.

```text
hash = H(salt + password)
```

- Senhas idênticas produzem hashes diferentes, pois o salt difere
- Rainbow tables perdem o valor, porque um atacante precisaria de uma tabela por salt
- Cada senha precisa ser atacada individualmente, em vez de todas de uma vez

Um **pepper** é um valor secreto adicional, idêntico para todas as senhas e armazenado fora do banco de dados, por exemplo na configuração da aplicação. Ele só ajuda se o banco de dados vazar sem que a configuração vaze.

### Fator de trabalho {/*#work-factor*/}

A segunda medida é tornar o hashing deliberadamente lento: um procedimento projetado para senhas repete sua operação interna muitas vezes. O número de repetições é configurável como **fator de custo** e é aumentado à medida que o hardware fica mais rápido. Um atraso de cerca de 100 ms por login é imperceptível para o usuário e torna impraticável testar bilhões de candidatas.

### bcrypt {/*#bcrypt*/}

O bcrypt é o procedimento mais difundido desse tipo e se baseia na cifra Blowfish.

- O salt é gerado e armazenado **dentro do hash**, portanto nenhuma coluna separada é necessária
- O fator de custo faz parte do hash, o que permite verificar hashes antigos depois que ele foi aumentado
- Deliberadamente lento e dependente de memória, o que dificulta a aceleração em GPUs em comparação com procedimentos baseados em SHA
- Limitação: apenas os primeiros 72 bytes da entrada são usados

```text
$2b$12$eImiTXuWVxfM37uY4JANjQ.../hJ6CtPTuOrAXTlHGDLcJU3wG6Hpu
 │   │  └── salt (22 characters) ──┘└── hash ────────────────┘
 │   └───── cost factor 12, meaning 2^12 rounds
 └───────── algorithm identifier
```

Alternativas com a mesma finalidade:

| Procedimento | Observação                                                                                                                        |
| --------- | --------------------------------------------------------------------------------------------------------------------------- |
| Argon2id  | Vencedor da Password Hashing Competition, ajustável em tempo, memória e paralelismo, recomendação atual para novos sistemas |
| scrypt    | Memory-hard, portanto caro de paralelizar em hardware especializado                                                     |
| PBKDF2    | Amplamente disponível e padronizado, mas dependente apenas de computação, o que o torna o mais fraco dessas opções                  |
| bcrypt    | Consolidado, bem compreendido, disponível em todas as linguagens                                                                   |

O que nunca pertence a um armazenamento de senhas: texto claro, criptografia reversível, hashes sem salt e uma única função hash rápida como MD5, SHA-1 ou SHA-256.

---

## Assinaturas digitais {/*#digital-signatures*/}

As assinaturas digitais verificam que os dados foram enviados por uma parte específica e não foram alterados.

**Assinatura (remetente):**

1. Criar um [hash](#hash-functions) da mensagem
2. Criptografar o hash com a **chave privada** do próprio remetente => essa é a assinatura
3. Enviar a mensagem junto com a assinatura

**Verificação (destinatário):**

1. Descriptografar a assinatura usando a **chave pública** do remetente => revela o hash original
2. Calcular de forma independente o hash da mensagem recebida
3. Comparar ambos os hashes: se coincidirem, a assinatura é válida e a mensagem é autêntica

Esse procedimento descreve assinaturas RSA. O [ECDSA](#rsa) não criptografa o hash, mas calcula a assinatura a partir do hash e da chave privada. O destinatário a verifica com a chave pública.
