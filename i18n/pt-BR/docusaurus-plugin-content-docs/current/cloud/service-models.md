---
title: "Modelos de Serviço (IaaS, PaaS, SaaS)"
sidebar_position: 2
description: "On-Premise, Infrastructure-as-a-Service, Platform-as-a-Service, Function-as-a-Service e Software-as-a-Service explicados"
keywords:
    - "IaaS"
    - "PaaS"
    - "SaaS"
    - "Modelos de Serviço em Nuvem"
    - "Infraestrutura como Serviço"
    - "Plataforma como Serviço"
    - "Software como Serviço"
    - "FaaS"
    - "Função como Serviço"
    - "Serverless"
tags:
    - ap2
machine_translated: true
---

# Modelos de Serviço em Nuvem

## Visão geral {/*#overview*/}

Os serviços de computação em nuvem costumam ser classificados em três modelos de serviço principais, cada um com diferentes níveis de controle e flexibilidade.

| Modelo de Serviço | Gerenciado pelo Cliente | Gerenciado pelo Provedor | Exemplos |
| --- | --- | --- | --- |
| **[On-Premise](#on-premise)** | Tudo | Nada | Data center próprio, servidores locais |
| **[IaaS](#infrastructure-as-a-service-iaas)** (Infraestrutura como Serviço) | SO, Middleware, Runtime, Dados, Aplicações | Virtualização, Servidores, Armazenamento, Rede | AWS EC2, Azure VMs, Google Compute Engine |
| **[PaaS](#platform-as-a-service-paas)** (Plataforma como Serviço) | Dados, Aplicações | Runtime, Middleware, SO, Virtualização, Servidores, Armazenamento, Rede | Heroku, Google App Engine, Azure App Service, Vercel |
| **[FaaS](#function-as-a-service-faas--serverless)** (Função como Serviço) | Funções individuais, Dados | Runtime, Escalonamento, Middleware, SO, Virtualização, Servidores, Armazenamento, Rede | AWS Lambda, Azure Functions, Cloudflare Workers |
| **[SaaS](#software-as-a-service-saas)** (Software como Serviço) | Apenas configuração | Tudo | Gmail, Salesforce, Microsoft 365, Dropbox |

---

## On-Premise {/*#on-premise*/}

### Definição {/*#definition*/}

On-premise (também chamado de "on-prem") significa operar e gerenciar toda a infraestrutura de TI localmente, nas instalações da própria organização. Nenhum provedor de nuvem está envolvido. A organização possui, opera e mantém tudo, desde o hardware físico até as aplicações.

### O que está incluído {/*#what-is-included*/}

- Servidores físicos e hardware
- Controle completo sobre todas as camadas
- Os dados permanecem nas instalações da própria organização
- Nenhuma dependência de provedores externos

### Responsabilidades {/*#responsibilities*/}

**A organização gerencia:**

- Hardware físico (servidores, armazenamento, rede)
- Virtualização
- Sistemas operacionais
- Middleware
- Ambientes de runtime
- Aplicações
- Dados
- Segurança, backups, recuperação de desastres

### Casos de uso {/*#use-cases*/}

- **Requisitos rigorosos de conformidade:** Setores com regulamentações rígidas de dados (por exemplo, governo, saúde, finanças)
- **Sistemas legados:** Aplicações que não podem ser migradas para a nuvem
- **Necessidade de baixa latência:** Sistemas que exigem latência de rede mínima
- **Soberania total dos dados:** Manter dados sensíveis inteiramente dentro da organização

### Vantagens {/*#advantages*/}

- Controle total sobre hardware e software
- Os dados nunca saem das instalações da organização
- Sem custos recorrentes de assinatura de nuvem
- Sem dependência de conectividade com a internet
- Conformidade mais simples com regulamentações rígidas de dados

### Desvantagens {/*#disadvantages*/}

- Altos custos de capital iniciais (hardware, instalações, refrigeração)
- Exige equipe de TI dedicada para manutenção
- O escalonamento exige a compra e a instalação de novo hardware
- Responsabilidade total por todas as atualizações, patches e pela segurança
- O hardware pode ficar obsoleto

---

## Infrastructure as a Service (IaaS) {/*#infrastructure-as-a-service-iaas*/}

### Definição {/*#definition-1*/}

O IaaS fornece apenas recursos computacionais virtualizados pela internet. Oferece os blocos de construção fundamentais para montar uma infraestrutura de TI em nuvem personalizada.

### O que está incluído {/*#what-is-included-1*/}

- Máquinas virtuais
- Armazenamento
- Redes
- Imagens de sistemas operacionais

### Responsabilidades {/*#responsibilities-1*/}

**O cliente gerencia:**

- Sistemas operacionais
- Aplicações
- Dados
- Ambientes de runtime
- Middleware

**O provedor gerencia:**

- Servidores físicos
- Hardware de armazenamento
- Equipamentos de rede
- Camada de virtualização

### Casos de uso {/*#use-cases-1*/}

- **Testes e desenvolvimento:** Criar e desativar ambientes de teste rapidamente
- **Hospedagem de sites:** Hospedar sites com controle total sobre a infraestrutura
- **Armazenamento e backup:** Soluções de armazenamento de dados em larga escala
- **Computação de alto desempenho:** Cargas de trabalho com uso intensivo de computação

### Vantagens {/*#advantages-1*/}

- Controle completo sobre a infraestrutura
- Modelo de preços pay-as-you-go (pagamento conforme o uso)
- Altamente escalável
- Sem manutenção de hardware físico

### Desvantagens {/*#disadvantages-1*/}

- Exige conhecimento técnico
- Patches de segurança e atualizações são de responsabilidade exclusiva do cliente
- Mais esforço de gerenciamento do que PaaS/SaaS

### Exemplos {/*#examples*/}

- Amazon Web Services (AWS) EC2
- Microsoft Azure Virtual Machines
- Google Compute Engine
- Hetzner

---

## Platform as a Service (PaaS) {/*#platform-as-a-service-paas*/}

### Definição {/*#definition-2*/}

O PaaS fornece uma plataforma que permite aos clientes desenvolver, executar e gerenciar aplicações sem lidar com a infraestrutura.

### O que está incluído {/*#what-is-included-2*/}

- **Ambientes de runtime prontos para uso** (Node.js, Python, Java, PHP, ...)
- **Bancos de dados gerenciados** (PostgreSQL, MySQL, MongoDB, Redis)
- **Implantação automática** (enviar código via Git => builds automáticos)
- **Escalonamento integrado** (a aplicação escala automaticamente conforme o tráfego)
- **Ferramentas de desenvolvimento** (logging, monitoramento, depuração)

### Responsabilidades {/*#responsibilities-2*/}

**O cliente gerencia:**

- Aplicações
- Dados

**O provedor gerencia:**

- Ambiente de runtime
- Middleware
- Sistemas operacionais
- Virtualização
- Servidores, armazenamento, rede

### Casos de uso {/*#use-cases-2*/}

- **Desenvolvimento de aplicações:** Criar apps sem preocupações com a infraestrutura
- **Desenvolvimento e gerenciamento de APIs:** Criar e hospedar APIs
- **Arquitetura de microsserviços:** Implantar aplicações em contêineres

### Vantagens {/*#advantages-2*/}

- Desenvolvimento e implantação mais rápidos
- Escalabilidade integrada
- Menor complexidade de gerenciamento
- Foco no código, não na infraestrutura
- Ferramentas de desenvolvimento integradas

### Desvantagens {/*#disadvantages-2*/}

- Menos controle do que no IaaS
- Possível vendor lock-in
- Pode não oferecer suporte a todas as linguagens de programação e frameworks
- Opções de personalização limitadas

### Exemplos {/*#examples-1*/}

- Heroku
- Google App Engine
- Microsoft Azure App Service
- Red Hat OpenShift
- AWS Elastic Beanstalk
- Vercel, Netlify

---

## Function as a Service (FaaS) / Serverless {/*#function-as-a-service-faas--serverless*/}

### Definição {/*#definition-3*/}

O FaaS é a continuação lógica do PaaS: a unidade implantada deixa de ser uma aplicação e passa a ser uma única função. Ela não é executada de forma permanente: um evento a inicia, ela processa o evento e é encerrada novamente.

"Serverless" é o termo mais amplo para esse modelo de operação e é enganoso: os servidores continuam envolvidos, mas deixam de ser visíveis ou gerenciáveis pelo cliente. Além do FaaS, abrange serviços gerenciados que seguem o mesmo princípio, como bancos de dados serverless, armazenamento de objetos e filas de mensagens.

### O que está incluído {/*#what-is-included-3*/}

- **Execução orientada a eventos:** requisição HTTP, temporizador, mensagem em uma fila, upload de arquivo, alteração no banco de dados
- **Escalonamento automático a partir de zero:** nenhuma instância quando ocioso, muitas instâncias paralelas sob carga
- **Sem planejamento de capacidade:** sem número de instâncias, sem tamanho de máquina, sem regras de autoescalonamento
- **Cobrança por invocação:** tempo de execução e memória, geralmente com granularidade de milissegundos
- **Logging e monitoramento integrados** fornecidos pela plataforma

### Responsabilidades {/*#responsibilities-3*/}

**O cliente gerencia:**

- O código da função e suas dependências
- Configuração: gatilhos, permissões, variáveis de ambiente, memória e timeout
- Dados e estado externo

**O provedor gerencia:**

- Ambiente de runtime e suas atualizações
- Escalonamento, incluindo o número de instâncias paralelas
- Middleware, sistema operacional, virtualização
- Servidores, armazenamento, rede

### Propriedades {/*#properties*/}

| Propriedade | Consequência para o projeto |
| --- | --- |
| Stateless | Uma função não mantém estado entre invocações. O estado pertence a um banco de dados, cache ou armazenamento de objetos |
| Cold start | A primeira invocação após um período de inatividade precisa de tempo adicional para iniciar o runtime, o que é perceptível em requisições críticas quanto à latência |
| Limite de execução | Uma invocação é abortada após um tempo máximo de execução. Tarefas de longa duração precisam, portanto, ser divididas |
| Orientada a eventos | A função só é executada quando um evento a aciona e não consegue iniciar por conta própria |
| Escalonamento a partir de zero | Um pico de carga produz muitos cold starts paralelos |

### Casos de uso {/*#use-cases-3*/}

- **APIs e webhooks:** endpoints com carga irregular ou imprevisível
- **Processamento de eventos:** reagir a um upload, a uma mensagem de fila ou a uma alteração no banco de dados
- **Tarefas agendadas:** limpeza, relatórios, importações por temporizador
- **Glue code:** pequenas transformações entre dois serviços
- **Processamento de imagens e arquivos:** gerar miniaturas após um upload

### Vantagens {/*#advantages-3*/}

- Sem administração de servidores e sem planejamento de capacidade
- Os custos escalam exatamente com a carga e o tempo ocioso é gratuito
- Muito rápido da ideia até um endpoint implantado
- O escalonamento é feito pela plataforma

### Desvantagens {/*#disadvantages-3*/}

- Os cold starts tornam a latência menos previsível
- Tempo de execução, memória e tamanho de pacote limitados por função
- Forte vendor lock-in, pois gatilhos e modelos de permissão são específicos de cada provedor
- Depuração e testes locais são mais difíceis do que em uma aplicação em execução permanente
- Muitas funções pequenas distribuem a lógica e dificultam o acompanhamento do comportamento geral
- Sob carga alta constante, uma instância em execução permanente costuma ser mais barata

### Exemplos {/*#examples-2*/}

- AWS Lambda
- Azure Functions
- Google Cloud Functions / Cloud Run Functions
- Cloudflare Workers
- Vercel Functions, Netlify Functions

---

## Software as a Service (SaaS) {/*#software-as-a-service-saas*/}

### Definição {/*#definition-4*/}

O SaaS entrega aplicações totalmente funcionais pela internet. Os usuários acessam o software por meio de um navegador, sem instalação nem manutenção.

### O que está incluído {/*#what-is-included-4*/}

- Aplicações prontas para uso
- Atualizações automáticas
- Acessível a partir de qualquer dispositivo com internet
- Arquitetura multi-tenant

### Responsabilidades {/*#responsibilities-4*/}

**O cliente gerencia:**

- Configuração de usuários
- Entrada de dados
- Permissões de acesso

**O provedor gerencia:**

- Todo o resto (aplicação, dados, runtime, middleware, SO, infraestrutura)

### Casos de uso {/*#use-cases-4*/}

- **E-mail e comunicação:** E-mail corporativo, mensagens
- **Gestão de relacionamento com o cliente (CRM)**
- **Ferramentas de colaboração:** Compartilhamento de documentos, gerenciamento de projetos
- **Produtividade de escritório:** Processamento de texto, planilhas, apresentações
- **Recursos humanos:** Folha de pagamento, recrutamento, gestão de funcionários

### Vantagens {/*#advantages-4*/}

- Sem necessidade de instalação ou manutenção
- Atualizações automáticas
- Custos iniciais menores
- Fácil de usar e de escalar

### Desvantagens {/*#disadvantages-4*/}

- Sem controle sobre a infraestrutura e dependência total da empresa operadora
- Personalização limitada
- Preocupações com a segurança dos dados (dados armazenados externamente na nuvem)
- Os custos de assinatura podem se acumular
- Dependente da conectividade com a internet

### Exemplos {/*#examples-3*/}

- **Google Workspace** (Gmail, Google Docs, Drive)
- **Microsoft 365** (Outlook, Word, Excel, Teams)
- **ADITO** (CRM)
- **Slack** (Comunicação em equipe)
- **Dropbox** (Armazenamento de arquivos)
- **Zoom** (Videoconferência)

---

## A analogia da pizza {/*#the-pizza-analogy*/}

- **On-Premise:** Fazer pizza em casa
- **IaaS:** Comprar massa de pizza e coberturas e assar em casa
- **PaaS:** Pedir uma pizza com coberturas escolhidas para entrega
- **FaaS:** Comprar uma única fatia quando há fome e pagar por fatia (nada é mantido aquecido)
- **SaaS:** Comer em uma pizzaria

---

## Modelos de serviço adicionais {/*#additional-service-models*/}

Além dos três modelos principais e do [FaaS](#function-as-a-service-faas--serverless), existem outros modelos de serviço especializados:

### Database as a Service (DBaaS) {/*#database-as-a-service-dbaas*/}

- Soluções de banco de dados gerenciadas
- Exemplos: Amazon RDS, Azure SQL Database, MongoDB Atlas

### Container as a Service (CaaS) {/*#container-as-a-service-caas*/}

- Plataformas de orquestração de contêineres
- Exemplos: Amazon ECS, Google Kubernetes Engine, Azure Kubernetes Service

### Desktop as a Service (DaaS) {/*#desktop-as-a-service-daas*/}

- Desktops virtuais entregues pela nuvem
- Exemplos: Amazon WorkSpaces, Azure Virtual Desktop, Citrix DaaS

### Backend as a Service (BaaS) {/*#backend-as-a-service-baas*/}

- Backend gerenciado pelo provedor, frontend pelo cliente
- Exemplos: Supabase, Firebase
