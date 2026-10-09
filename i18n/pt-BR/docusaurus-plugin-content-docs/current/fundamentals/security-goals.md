---
title: "Objetivos de Segurança de TI"
description: "Os quatro objetivos centrais da segurança de TI, confidencialidade, integridade, disponibilidade e autenticidade, e o que significam na prática."
keywords:
    - Objetivos de Segurança
    - Confidencialidade
    - Integridade
    - Disponibilidade
    - Autenticidade
tags:
    - ap2
machine_translated: true
---

# Objetivos de Segurança de TI

## Visão geral {/*#overview*/}

A segurança de TI se baseia em quatro objetivos centrais que definem o que um sistema seguro deve garantir.

## Confidencialidade {/*#confidentiality*/}

As informações são acessíveis apenas a partes autorizadas.

- Os dados devem ser protegidos contra acesso ou divulgação não autorizados
- Alcançada por meio de criptografia, controles de acesso e o princípio da necessidade de conhecer
- **Exemplo**: Apenas o destinatário pretendido consegue ler um e-mail criptografado

## Integridade {/*#integrity*/}

As informações são exatas e não foram adulteradas.

- Os dados não devem ser modificados, corrompidos ou excluídos sem autorização, seja de forma intencional ou acidental
- Alcançada por meio de funções de hash, assinaturas digitais e somas de verificação
- **Exemplo**: Um arquivo baixado cujo hash coincide com o valor publicado não foi alterado

## Disponibilidade {/*#availability*/}

Sistemas e dados são acessíveis quando necessário para usuários autorizados.

- Os serviços devem permanecer operacionais e responsivos; indisponibilidade ou negação de acesso é uma falha de segurança
- Alcançada por meio de redundância, backups, proteção contra DDoS e infraestrutura tolerante a falhas
- **Exemplo**: Um serviço web protegido contra ataques DDoS permanece acessível durante um ataque

## Autenticidade {/*#authenticity*/}

A identidade de um parceiro de comunicação ou a origem dos dados pode ser verificada.

- Garante que as partes são quem afirmam ser e que os dados provêm de uma fonte confiável
- Alcançada por meio de certificados digitais, assinaturas e protocolos de autenticação (por exemplo, TLS, MFA)
- **Exemplo**: Um certificado TLS comprova que um site é operado pela organização indicada

## Resumo {/*#summary*/}

| Objetivo        | Pergunta                                 | Soluções                   |
| --------------- | ---------------------------------------- | -------------------------- |
| Confidencialidade | Quem pode acessar isto?                | Criptografia, controle de acesso |
| Integridade     | Isto foi adulterado?                     | Hashes, assinaturas digitais |
| Disponibilidade | Isto está acessível quando necessário?   | Redundância, backups       |
| Autenticidade   | Isto é realmente quem/o que afirma ser?  | Certificados, MFA          |
