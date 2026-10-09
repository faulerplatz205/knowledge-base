---
title: "Active Directory"
description: "Conceptos básicos de Active Directory y del controlador de dominio: estructura lógica, relaciones de confianza, nomenclatura LDAP, perfiles móviles y directivas de grupo."
keywords:
    - Active Directory
    - Controlador de dominio
    - Unidad organizativa
    - Bosque
    - LDAP
    - Nombre distintivo
    - Directiva de grupo
    - GPO
machine_translated: true
---

# Active Directory

**Active Directory (AD)** es un servicio de directorio que proporciona una gestión centralizada de identidades y accesos en un entorno Windows. En lugar de configurar cada equipo individualmente, los usuarios, los equipos y los recursos se gestionan de forma centralizada. Un **controlador de dominio (DC)** es un Windows Server que aloja los Active Directory Domain Services (AD DS).

Un controlador de dominio requiere un nombre único (p. ej. `dc1`), una dirección IP estática y un servidor DNS operativo; se instala el rol "Active Directory Domain Services" y, a continuación, se promueve el servidor.

## Estructura lógica {/*#logical-structure*/}

Active Directory separa la estructura lógica de la física (sitios, subredes, DC). Los bloques lógicos son:

- **Objeto** – La unidad gestionable más pequeña; cada recurso de red (usuario, equipo, impresora …) está representado por un objeto.
- **Unidad organizativa (OU)** – Un contenedor que agrupa objetos (usuarios, equipos, grupos) para modelar la estructura de la empresa. Las OU también se utilizan para vincular directivas de grupo.
- **Dominio** – La unidad central que contiene el Active Directory. Las directivas de seguridad se aplican dentro de un dominio, que debe tener al menos un DC.
- **Árbol** – Varios dominios dispuestos jerárquicamente que comparten un espacio de nombres contiguo (p. ej. `de.abc.com` bajo `abc.com`).
- **Bosque** – Uno o más árboles, normalmente con espacios de nombres distintos. Los dominios funcionan de forma independiente, pero pueden comunicarse a través del bosque.

## Catálogo global {/*#global-catalog*/}

El **catálogo global** es una base de datos que se utiliza para buscar objetos en todo el bosque, incluidos los objetos de otros espacios de nombres. Cada sitio de AD debería alojar al menos un DC con una copia del catálogo global.

## Relaciones de confianza {/*#trusts*/}

Una **relación de confianza** (trust) describe la relación entre dos dominios: el dominio que confía acepta la autenticación del dominio de confianza.

- **Unidireccional** – confianza en una dirección / **Bidireccional** – confianza en ambas direcciones
- **Transitiva** – la confianza se extiende a través de otras relaciones de confianza / **No transitiva** – solo para la relación de confianza configurada explícitamente

El valor predeterminado es **bidireccional y transitiva**.

## LDAP y nomenclatura {/*#ldap-and-naming*/}

**LDAP** (Lightweight Directory Access Protocol) se utiliza para acceder al servicio de directorio.

- **Nombre distintivo (Distinguished Name, DN)** – La "ruta LDAP" única de un objeto, que utiliza `CN` (Common Name), `OU` (Organizational Unit) y `DC` (Domain Component), p. ej. `CN=HPjet5, OU=Assistenz, DC=Firma, DC=DE`.
- **Nombre canónico (Canonical Name)** – La misma información en formato de nombre de dominio DNS, p. ej. `HPjet5.Assistenz.firma.de`.

## Perfiles móviles {/*#roaming-profiles*/}

Un **perfil móvil** (roaming profile) se almacena de forma centralizada en un servidor para que el usuario encuentre el mismo entorno en cualquier equipo del dominio. El perfil se copia al equipo al iniciar sesión y se sincroniza de nuevo al cerrar sesión.

- **Ventaja** – El mismo entorno en cada equipo.
- **Desventaja** – Requiere mucho almacenamiento; el inicio y el cierre de sesión pueden ser lentos.

Los recursos compartidos **SYSVOL** y **NETLOGON** se crean al promover un servidor a DC. Almacenan las directivas de grupo y los scripts de inicio de sesión que recuperan los clientes.

## Niveles funcionales {/*#functional-levels*/}

Al promover un DC se eligen un **nivel funcional de bosque** y un **nivel funcional de dominio**. Definen qué funciones de AD están disponibles y garantizan que los DC con distintas versiones de Windows Server puedan interoperar (compatibilidad con versiones anteriores). Los niveles superiores ofrecen más funciones, pero no pueden revertirse. Un dominio puede funcionar en un nivel superior al del bosque, pero no inferior.

## Directivas de grupo (GPO) {/*#group-policies-gpo*/}

Las **directivas de grupo** son instrucciones de configuración que se utilizan para aplicar ajustes (p. ej. directivas de contraseñas, ajustes de energía, restricciones de acceso). Se almacenan en Active Directory y están disponibles en todo el dominio mediante replicación. Un **objeto de directiva de grupo (Group Policy Object, GPO)** almacena los ajustes individuales y se **vincula** al objeto sobre el que debe actuar. Los GPO contienen ajustes independientes para usuarios y equipos, y actúan sobre las cuentas de usuario y de equipo contenidas en una OU, no sobre grupos.

### Orden de procesamiento {/*#processing-order*/}

Las directivas de grupo pueden vincularse a un sitio, a un dominio o a una OU; además, cada equipo tiene una directiva local. El orden de procesamiento es **L-S-D-OU**:

1. **Local**
2. **Sitio (Site)**
3. **Dominio**
4. **OU**

Cada paso posterior sobrescribe los ajustes en conflicto del anterior. Así, la directiva local tiene la prioridad más baja y la directiva de la OU la más alta. Si varios GPO están vinculados al mismo nivel, decide el orden de vinculación (gana el valor de vínculo más bajo, ya que se procesa en último lugar).

### Actualización {/*#refresh*/}

Los ajustes de las directivas de grupo se actualizan en segundo plano aproximadamente cada **90 minutos** en los clientes y cada **5 minutos** en los controladores de dominio. Una actualización puede forzarse con `gpupdate /force`. La redirección de carpetas es una excepción: solo se aplica al iniciar sesión el usuario.
