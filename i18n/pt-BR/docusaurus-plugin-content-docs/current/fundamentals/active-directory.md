---
title: "Active Directory"
description: "Conceitos centrais do Active Directory e do controlador de domínio: estrutura lógica, relações de confiança, nomenclatura LDAP, perfis móveis e políticas de grupo."
keywords:
    - Active Directory
    - Controlador de Domínio
    - Unidade Organizacional
    - Floresta
    - LDAP
    - Distinguished Name
    - Política de Grupo
    - GPO
machine_translated: true
---

# Active Directory

**Active Directory (AD)** é um serviço de diretório que fornece gerenciamento central de identidades e acessos em um ambiente Windows. Em vez de configurar cada máquina individualmente, usuários, computadores e recursos são gerenciados de forma centralizada. Um **controlador de domínio (DC)** é um Windows Server que hospeda o Active Directory Domain Services (AD DS).

Um controlador de domínio requer um nome exclusivo (p. ex. `dc1`), um endereço IP estático e um servidor DNS funcional; a função "Active Directory Domain Services" é instalada e, em seguida, o servidor é promovido.

## Estrutura Lógica {/*#logical-structure*/}

O Active Directory separa a estrutura lógica da física (sites, sub-redes, DCs). Os blocos de construção lógicos são:

- **Objeto** – A menor unidade gerenciável; todo recurso de rede (usuário, computador, impressora …) é representado por um objeto.
- **Unidade Organizacional (OU)** – Um contêiner que agrupa objetos (usuários, computadores, grupos) para modelar a estrutura da empresa. As OUs também são usadas para vincular políticas de grupo.
- **Domínio** – A unidade central que contém o Active Directory. As políticas de segurança se aplicam dentro de um domínio, que deve ter pelo menos um DC.
- **Árvore** – Vários domínios dispostos hierarquicamente, que compartilham um namespace contíguo (p. ex. `de.abc.com` sob `abc.com`).
- **Floresta** – Uma ou mais árvores, normalmente com namespaces diferentes. Os domínios funcionam de forma independente, mas podem se comunicar em toda a floresta.

## Catálogo Global {/*#global-catalog*/}

O **catálogo global** é um banco de dados usado para pesquisar objetos em toda a floresta, incluindo objetos de outros namespaces. Cada site do AD deve hospedar pelo menos um DC com uma cópia do catálogo global.

## Relações de Confiança {/*#trusts*/}

Uma **relação de confiança (trust)** descreve o vínculo entre dois domínios: o domínio confiante aceita a autenticação do domínio confiável.

- **Unidirecional** – confiança em uma direção / **Bidirecional** – confiança em ambas as direções
- **Transitiva** – a confiança se estende a outras relações de confiança / **Não transitiva** – apenas para a relação explicitamente configurada

O padrão é **bidirecional e transitiva**.

## LDAP e Nomenclatura {/*#ldap-and-naming*/}

O **LDAP** (Lightweight Directory Access Protocol) é usado para acessar o serviço de diretório.

- **Distinguished Name (DN)** – O "caminho LDAP" exclusivo de um objeto, usando `CN` (Common Name), `OU` (Organizational Unit) e `DC` (Domain Component), p. ex. `CN=HPjet5, OU=Assistenz, DC=Firma, DC=DE`.
- **Canonical Name** – A mesma informação no formato de nome de domínio DNS, p. ex. `HPjet5.Assistenz.firma.de`.

## Perfis Móveis {/*#roaming-profiles*/}

Um **perfil móvel (roaming profile)** é armazenado centralmente em um servidor, de modo que o usuário encontre o mesmo ambiente em qualquer computador do domínio. O perfil é copiado para a máquina no logon e sincronizado de volta no logoff.

- **Vantagem** – O mesmo ambiente em todos os computadores.
- **Desvantagem** – Requer muito armazenamento; logon e logoff podem ser lentos.

Os compartilhamentos **SYSVOL** e **NETLOGON** são criados quando um servidor é promovido a DC. Eles armazenam políticas de grupo e scripts de logon que os clientes recuperam.

## Níveis Funcionais {/*#functional-levels*/}

Ao promover um DC, são escolhidos um **nível funcional da floresta** e um **nível funcional do domínio**. Eles definem quais recursos do AD estão disponíveis e garantem que DCs com diferentes versões do Windows Server possam interoperar (compatibilidade retroativa). Níveis mais altos oferecem mais recursos, mas não podem ser revertidos. Um domínio pode operar em um nível mais alto que a floresta, mas não em um mais baixo.

## Políticas de Grupo (GPO) {/*#group-policies-gpo*/}

**Políticas de grupo** são instruções de configuração usadas para impor definições (p. ex. políticas de senha, configurações de energia, restrições de acesso). Elas são armazenadas no Active Directory e ficam disponíveis em todo o domínio por meio de replicação. Um **Group Policy Object (GPO)** armazena as definições individuais e é **vinculado** ao objeto que deve afetar. Os GPOs contêm definições separadas para usuários e computadores e atuam sobre as contas de usuário e de computador contidas em uma OU, não sobre grupos.

### Ordem de Processamento {/*#processing-order*/}

As políticas de grupo podem ser vinculadas a um site, a um domínio ou a uma OU; além disso, todo computador possui uma política local. A ordem de processamento é **L-S-D-OU**:

1. **Local**
2. **Site**
3. **Domínio**
4. **OU**

Cada etapa posterior substitui as definições conflitantes da anterior. Assim, a política local tem a menor prioridade e a política da OU, a maior. Se vários GPOs estiverem vinculados no mesmo nível, a ordem de vínculo decide (o menor valor de vínculo prevalece, pois é processado por último).

### Atualização {/*#refresh*/}

As definições de política de grupo são atualizadas em segundo plano aproximadamente a cada **90 minutos** nos clientes e a cada **5 minutos** nos controladores de domínio. Uma atualização pode ser forçada com `gpupdate /force`. O redirecionamento de pastas é uma exceção: ele é aplicado somente no logon do usuário.
