---
title: "Modelos de servicio (IaaS, PaaS, SaaS)"
sidebar_position: 2
description: "On-Premise, Infrastructure-as-a-Service, Platform-as-a-Service, Function-as-a-Service y Software-as-a-Service explicados"
keywords:
    - "IaaS"
    - "PaaS"
    - "SaaS"
    - "Modelos de servicio en la nube"
    - "Infraestructura como servicio"
    - "Plataforma como servicio"
    - "Software como servicio"
    - "FaaS"
    - "Función como servicio"
    - "Serverless"
tags:
    - ap2
machine_translated: true
---

# Modelos de servicio en la nube

## Resumen {/*#overview*/}

Los servicios de cloud computing se clasifican normalmente en tres modelos de servicio principales, cada uno con un nivel distinto de control y flexibilidad.

| Modelo de servicio                                                          | Gestionado por el cliente                   | Gestionado por el proveedor                                                    | Ejemplos                                             |
| --------------------------------------------------------------------------- | ------------------------------------------- | ------------------------------------------------------------------------------ | ---------------------------------------------------- |
| **[On-Premise](#on-premise)**                                               | Todo                                        | Nada                                                                           | Centro de datos propio, servidores locales           |
| **[IaaS](#infrastructure-as-a-service-iaas)** (Infrastructure as a Service) | SO, middleware, runtime, datos, aplicaciones | Virtualización, servidores, almacenamiento, redes                              | AWS EC2, Azure VMs, Google Compute Engine            |
| **[PaaS](#platform-as-a-service-paas)** (Platform as a Service)             | Datos, aplicaciones                         | Runtime, middleware, SO, virtualización, servidores, almacenamiento, redes     | Heroku, Google App Engine, Azure App Service, Vercel |
| **[FaaS](#function-as-a-service-faas--serverless)** (Function as a Service) | Funciones individuales, datos               | Runtime, escalado, middleware, SO, virtualización, servidores, almacenamiento, redes | AWS Lambda, Azure Functions, Cloudflare Workers |
| **[SaaS](#software-as-a-service-saas)** (Software as a Service)             | Solo configuración                          | Todo                                                                           | Gmail, Salesforce, Microsoft 365, Dropbox            |

---

## On-Premise {/*#on-premise*/}

### Definición {/*#definition*/}

On-premise (también llamado "on-prem") significa operar y gestionar toda la infraestructura de TI de forma local, en las instalaciones propias de la organización. No interviene ningún proveedor de nube. La organización posee, opera y mantiene todo, desde el hardware físico hasta las aplicaciones.

### Qué incluye {/*#what-is-included*/}

- Servidores y hardware físicos
- Control completo sobre todas las capas
- Los datos permanecen en las instalaciones propias de la organización
- Sin dependencia de proveedores externos

### Responsabilidades {/*#responsibilities*/}

**La organización gestiona:**

- Hardware físico (servidores, almacenamiento, redes)
- Virtualización
- Sistemas operativos
- Middleware
- Entornos de ejecución
- Aplicaciones
- Datos
- Seguridad, copias de seguridad, recuperación ante desastres

### Casos de uso {/*#use-cases*/}

- **Requisitos estrictos de cumplimiento normativo:** Sectores con normativas estrictas sobre datos (p. ej. administración pública, sanidad, finanzas)
- **Sistemas heredados:** Aplicaciones que no pueden migrarse a la nube
- **Necesidades de baja latencia:** Sistemas que requieren una latencia de red mínima
- **Soberanía total de los datos:** Mantener los datos sensibles por completo dentro de la organización

### Ventajas {/*#advantages*/}

- Control total sobre el hardware y el software
- Los datos nunca salen de las instalaciones de la organización
- Sin costes recurrentes de suscripción a la nube
- Sin dependencia de la conexión a internet
- Cumplimiento más sencillo de normativas estrictas sobre datos

### Desventajas {/*#disadvantages*/}

- Altos costes iniciales de capital (hardware, instalaciones, refrigeración)
- Requiere personal de TI dedicado al mantenimiento
- El escalado exige comprar e instalar hardware nuevo
- Responsabilidad total sobre todas las actualizaciones, parches y la seguridad
- El hardware puede quedar obsoleto

---

## Infrastructure as a Service (IaaS) {/*#infrastructure-as-a-service-iaas*/}

### Definición {/*#definition-1*/}

IaaS proporciona únicamente recursos de cómputo virtualizados a través de internet. Ofrece los elementos fundamentales para construir una infraestructura de TI en la nube a medida.

### Qué incluye {/*#what-is-included-1*/}

- Máquinas virtuales
- Almacenamiento
- Redes
- Imágenes de sistemas operativos

### Responsabilidades {/*#responsibilities-1*/}

**El cliente gestiona:**

- Sistemas operativos
- Aplicaciones
- Datos
- Entornos de ejecución
- Middleware

**El proveedor gestiona:**

- Servidores físicos
- Hardware de almacenamiento
- Equipamiento de red
- Capa de virtualización

### Casos de uso {/*#use-cases-1*/}

- **Pruebas y desarrollo:** Poner en marcha y apagar rápidamente entornos de prueba
- **Alojamiento web:** Alojar sitios web con control total sobre la infraestructura
- **Almacenamiento y copias de seguridad:** Soluciones de almacenamiento de datos a gran escala
- **Computación de alto rendimiento:** Cargas de trabajo de cálculo intensivo

### Ventajas {/*#advantages-1*/}

- Control completo sobre la infraestructura
- Modelo de precios de pago por uso
- Alta escalabilidad
- Sin mantenimiento de hardware físico

### Desventajas {/*#disadvantages-1*/}

- Requiere conocimientos técnicos
- Los parches de seguridad y las actualizaciones son responsabilidad exclusiva del cliente
- Mayor carga de gestión que con PaaS o SaaS

### Ejemplos {/*#examples*/}

- Amazon Web Services (AWS) EC2
- Microsoft Azure Virtual Machines
- Google Compute Engine
- Hetzner

---

## Platform as a Service (PaaS) {/*#platform-as-a-service-paas*/}

### Definición {/*#definition-2*/}

PaaS proporciona una plataforma que permite a los clientes desarrollar, ejecutar y gestionar aplicaciones sin ocuparse de la infraestructura.

### Qué incluye {/*#what-is-included-2*/}

- **Entornos de ejecución listos para usar** (Node.js, Python, Java, PHP, ...)
- **Bases de datos gestionadas** (PostgreSQL, MySQL, MongoDB, Redis)
- **Despliegue automático** (enviar código mediante Git => compilaciones automáticas)
- **Escalado integrado** (la aplicación escala automáticamente según el tráfico)
- **Herramientas de desarrollo** (registro, monitorización, depuración)

### Responsabilidades {/*#responsibilities-2*/}

**El cliente gestiona:**

- Aplicaciones
- Datos

**El proveedor gestiona:**

- Entorno de ejecución
- Middleware
- Sistemas operativos
- Virtualización
- Servidores, almacenamiento, redes

### Casos de uso {/*#use-cases-2*/}

- **Desarrollo de aplicaciones:** Crear aplicaciones sin preocuparse por la infraestructura
- **Desarrollo y gestión de APIs:** Crear y alojar APIs
- **Arquitectura de microservicios:** Desplegar aplicaciones en contenedores

### Ventajas {/*#advantages-2*/}

- Desarrollo y despliegue más rápidos
- Escalabilidad integrada
- Menor complejidad de gestión
- Foco en el código, no en la infraestructura
- Herramientas de desarrollo integradas

### Desventajas {/*#disadvantages-2*/}

- Menos control que con IaaS
- Posible dependencia del proveedor (vendor lock-in)
- Puede no admitir todos los lenguajes de programación o frameworks
- Opciones de personalización limitadas

### Ejemplos {/*#examples-1*/}

- Heroku
- Google App Engine
- Microsoft Azure App Service
- Red Hat OpenShift
- AWS Elastic Beanstalk
- Vercel, Netlify

---

## Function as a Service (FaaS) / Serverless {/*#function-as-a-service-faas--serverless*/}

### Definición {/*#definition-3*/}

FaaS es la continuación lógica de PaaS: la unidad que se despliega ya no es una aplicación, sino una función individual. No se ejecuta de forma permanente: un evento la inicia, procesa el evento y se detiene de nuevo.

"Serverless" es el término más amplio para este modelo operativo y resulta engañoso: los servidores siguen existiendo, pero ya no son visibles ni gestionables para el cliente. Además de FaaS abarca servicios gestionados que siguen el mismo principio, como bases de datos serverless, almacenamiento de objetos y colas de mensajes.

### Qué incluye {/*#what-is-included-3*/}

- **Ejecución basada en eventos:** petición HTTP, temporizador, mensaje en una cola, subida de un archivo, cambio en una base de datos
- **Escalado automático desde cero:** ninguna instancia en reposo, muchas instancias paralelas bajo carga
- **Sin planificación de capacidad:** sin número de instancias, sin tamaño de máquina, sin reglas de autoescalado
- **Facturación por invocación:** tiempo de ejecución y memoria, normalmente con granularidad de milisegundos
- **Registro y monitorización integrados** proporcionados por la plataforma

### Responsabilidades {/*#responsibilities-3*/}

**El cliente gestiona:**

- El código de la función y sus dependencias
- La configuración: disparadores, permisos, variables de entorno, memoria y timeout
- Los datos y el estado externo

**El proveedor gestiona:**

- El entorno de ejecución y sus actualizaciones
- El escalado, incluido el número de instancias paralelas
- Middleware, sistema operativo, virtualización
- Servidores, almacenamiento, redes

### Propiedades {/*#properties*/}

| Propiedad            | Consecuencia para el diseño                                                                                                                                  |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Sin estado           | Una función no conserva estado entre invocaciones. El estado pertenece a una base de datos, una caché o un almacenamiento de objetos                         |
| Arranque en frío     | La primera invocación tras un periodo de inactividad necesita tiempo adicional para iniciar el runtime, lo que se nota en las peticiones sensibles a la latencia |
| Límite de ejecución  | Una invocación se aborta tras un tiempo máximo de ejecución. Por ello, los trabajos de larga duración deben dividirse                                        |
| Basado en eventos    | La función solo se ejecuta cuando un evento la dispara y no puede iniciarse por sí misma                                                                     |
| Escalado desde cero  | Un pico de carga genera muchos arranques en frío en paralelo                                                                                                 |

### Casos de uso {/*#use-cases-3*/}

- **APIs y webhooks:** endpoints con carga irregular o impredecible
- **Procesamiento de eventos:** reaccionar a una subida de archivo, un mensaje de cola o un cambio en una base de datos
- **Tareas programadas:** limpieza, informes, importaciones con temporizador
- **Código de enlace:** pequeñas transformaciones entre dos servicios
- **Procesamiento de imágenes y archivos:** generar miniaturas tras una subida

### Ventajas {/*#advantages-3*/}

- Sin administración de servidores ni planificación de capacidad
- Los costes escalan exactamente con la carga y el tiempo de inactividad es gratuito
- Muy rápido desde la idea hasta un endpoint desplegado
- La plataforma se encarga del escalado

### Desventajas {/*#disadvantages-3*/}

- Los arranques en frío hacen la latencia menos predecible
- Tiempo de ejecución, memoria y tamaño de paquete limitados por función
- Fuerte dependencia del proveedor, porque los disparadores y los modelos de permisos son específicos de cada proveedor
- La depuración y las pruebas locales son más difíciles que con una aplicación en ejecución permanente
- Muchas funciones pequeñas distribuyen la lógica y dificultan seguir el comportamiento global
- Bajo una carga alta y constante, una instancia en ejecución permanente suele ser más barata

### Ejemplos {/*#examples-2*/}

- AWS Lambda
- Azure Functions
- Google Cloud Functions / Cloud Run Functions
- Cloudflare Workers
- Vercel Functions, Netlify Functions

---

## Software as a Service (SaaS) {/*#software-as-a-service-saas*/}

### Definición {/*#definition-4*/}

SaaS entrega aplicaciones totalmente funcionales a través de internet. Los usuarios acceden al software mediante un navegador web, sin instalación ni mantenimiento.

### Qué incluye {/*#what-is-included-4*/}

- Aplicaciones listas para usar
- Actualizaciones automáticas
- Accesible desde cualquier dispositivo con internet
- Arquitectura multi-tenant

### Responsabilidades {/*#responsibilities-4*/}

**El cliente gestiona:**

- Configuración de usuarios
- Introducción de datos
- Permisos de acceso

**El proveedor gestiona:**

- Todo lo demás (aplicación, datos, runtime, middleware, SO, infraestructura)

### Casos de uso {/*#use-cases-4*/}

- **Correo electrónico y comunicación:** Correo corporativo, mensajería
- **Gestión de relaciones con los clientes (CRM)**
- **Herramientas de colaboración:** Compartición de documentos, gestión de proyectos
- **Productividad ofimática:** Procesamiento de textos, hojas de cálculo, presentaciones
- **Recursos humanos:** Nóminas, selección de personal, gestión de empleados

### Ventajas {/*#advantages-4*/}

- No requiere instalación ni mantenimiento
- Actualizaciones automáticas
- Menores costes iniciales
- Fácil de usar y de escalar

### Desventajas {/*#disadvantages-4*/}

- Sin control sobre la infraestructura y dependencia total de la empresa operadora
- Personalización limitada
- Preocupaciones sobre la seguridad de los datos (datos almacenados externamente en la nube)
- Los costes de suscripción pueden acumularse
- Dependencia de la conexión a internet

### Ejemplos {/*#examples-3*/}

- **Google Workspace** (Gmail, Google Docs, Drive)
- **Microsoft 365** (Outlook, Word, Excel, Teams)
- **ADITO** (CRM)
- **Slack** (comunicación de equipos)
- **Dropbox** (almacenamiento de archivos)
- **Zoom** (videoconferencias)

---

## La analogía de la pizza {/*#the-pizza-analogy*/}

- **On-Premise:** Hacer la pizza en casa
- **IaaS:** Comprar masa e ingredientes y hornear en casa
- **PaaS:** Pedir una pizza con ingredientes elegidos para que la entreguen a domicilio
- **FaaS:** Comprar una sola porción cuando se tiene hambre y pagar por porción (nada se mantiene caliente)
- **SaaS:** Comer en una pizzería

---

## Otros modelos de servicio {/*#additional-service-models*/}

Además de los tres modelos principales y de [FaaS](#function-as-a-service-faas--serverless), existen otros modelos de servicio especializados:

### Database as a Service (DBaaS) {/*#database-as-a-service-dbaas*/}

- Soluciones de bases de datos gestionadas
- Ejemplos: Amazon RDS, Azure SQL Database, MongoDB Atlas

### Container as a Service (CaaS) {/*#container-as-a-service-caas*/}

- Plataformas de orquestación de contenedores
- Ejemplos: Amazon ECS, Google Kubernetes Engine, Azure Kubernetes Service

### Desktop as a Service (DaaS) {/*#desktop-as-a-service-daas*/}

- Escritorios virtuales entregados a través de la nube
- Ejemplos: Amazon WorkSpaces, Azure Virtual Desktop, Citrix DaaS

### Backend as a Service (BaaS) {/*#backend-as-a-service-baas*/}

- Backend gestionado por el proveedor, frontend por el cliente
- Ejemplos: Supabase, Firebase
