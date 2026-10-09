---
title: "Compilador frente a intérprete"
description: "Cómo traducen el código fuente los compiladores y los intérpretes, sus ventajas y desventajas, y el papel del bytecode, las máquinas virtuales y la compilación just-in-time"
keywords:
    - "Compilador"
    - "Intérprete"
    - "Just-in-Time"
    - "JIT"
    - "Bytecode"
    - "Máquina virtual"
    - "Enlazador"
    - "Ahead-of-Time"
    - "Transpilador"
    - "Lenguajes de programación"
tags:
    - ap2
machine_translated: true
---

# Compilador frente a intérprete

## Resumen {/*#overview*/}

Un procesador solo puede ejecutar código máquina. Por ello, el código fuente escrito en un lenguaje de alto nivel
debe traducirse primero. Existen dos enfoques fundamentales:

- **Compilador**: traduce el programa completo **antes** de la ejecución en un artefacto independiente legible por la máquina
- **Intérprete**: lee el código fuente **durante** la ejecución y lleva a cabo cada instrucción de inmediato

Que un lenguaje sea compilado o interpretado es una propiedad de la **implementación**, no del lenguaje
en sí. C suele compilarse, pero existen intérpretes de C; JavaScript se interpretaba históricamente y
los motores modernos lo compilan en tiempo de ejecución.

---

## Compilador {/*#compiler*/}

### Proceso de traducción {/*#translation-process*/}

La traducción se realiza normalmente en varias fases:

1. **Análisis léxico**: el flujo de caracteres se divide en tokens (palabras clave, identificadores, operadores)
2. **Análisis sintáctico**: los tokens se comprueban con la gramática y se convierten en un árbol sintáctico
3. **Análisis semántico**: se verifican la compatibilidad de tipos, las declaraciones y los ámbitos
4. **Optimización**: se mejora la representación intermedia (p. ej. eliminación de código muerto, desenrollado de bucles)
5. **Generación de código**: se emite código máquina, normalmente como archivos objeto

A continuación, un **enlazador** (linker) combina los archivos objeto con las bibliotecas necesarias en un programa ejecutable.

```text
Source Code => [Compiler] => Object Code => [Linker] => Executable => [CPU]
```

Los errores se notifican en tiempo de compilación, por lo que un programa con errores de sintaxis o de tipos nunca llega a ejecutarse.

### Ventajas {/*#advantages*/}

- **Velocidad de ejecución**: el código máquina traducido se ejecuta directamente en el procesador
- **Detección temprana de errores**: los errores sintácticos y muchos semánticos salen a la luz antes de distribuir el programa
- **Optimización**: se ve el programa completo, lo que permite optimizaciones extensas
- **Protección del código fuente**: solo hay que distribuir el artefacto compilado
- **Sin dependencia en tiempo de ejecución**: el sistema de destino no necesita tener instalada la herramienta compiladora

### Desventajas {/*#disadvantages*/}

- **Tiempo de compilación**: cada cambio requiere una nueva compilación antes de poder probarse
- **Dependencia de la plataforma**: el código máquina está ligado a una arquitectura de procesador y a un sistema operativo, por lo que se
  necesita una compilación distinta para cada plataforma de destino
- **Esfuerzo de depuración**: el código máquina ejecutado ya no se parece al código fuente, lo que requiere
  símbolos de depuración

---

## Intérprete {/*#interpreter*/}

El intérprete lee el código fuente instrucción por instrucción, lo analiza y lo ejecuta de inmediato. No se genera ningún
archivo ejecutable independiente. El intérprete debe estar presente en el sistema de destino.

```text
Source Code => [Interpreter] => Statement analysed and executed => [CPU]
```

Los errores solo son visibles cuando se alcanza la línea afectada. Un error de sintaxis en una rama poco utilizada
puede pasar así desapercibido durante mucho tiempo.

### Ventajas {/*#advantages-1*/}

- **Ciclo de desarrollo rápido**: el código modificado puede ejecutarse de inmediato, sin paso de compilación
- **Independencia de la plataforma**: el mismo código fuente se ejecuta en cualquier lugar donde haya un intérprete disponible
- **Depuración más sencilla**: los errores se notifican con referencia a la línea original del código fuente
- **Flexibilidad**: el código puede generarse y ejecutarse en tiempo de ejecución

### Desventajas {/*#disadvantages-1*/}

- **Velocidad de ejecución**: la sobrecarga de traducción se produce en cada ejecución y, para el código dentro de bucles, de forma repetida
- **Detección tardía de errores**: los errores solo aparecen en tiempo de ejecución
- **Dependencia en tiempo de ejecución**: el intérprete debe estar instalado en el sistema de destino
- **Divulgación del código fuente**: el programa suele entregarse como código fuente legible

---

## Bytecode y máquinas virtuales {/*#bytecode-and-virtual-machines*/}

La mayoría de las plataformas modernas combinan ambos enfoques. El código fuente se compila en **bytecode**, un código
intermedio compacto que no está ligado a un procesador concreto. Una **máquina virtual** (VM) ejecuta después este
bytecode en el sistema de destino.

```text
Source Code => [Compiler] => Bytecode => [Virtual Machine] => Machine Code => [CPU]
```

| Plataforma | Compilador   | Código intermedio                  | Entorno de ejecución          |
| ---------- | ------------ | ---------------------------------- | ----------------------------- |
| Java       | `javac`      | Bytecode (`.class`)                | JVM (Java Virtual Machine)    |
| C# / .NET  | `csc`        | CIL (Common Intermediate Language) | CLR (Common Language Runtime) |
| Python     | integrado    | Bytecode (`.pyc`)                  | VM de Python                  |

Esto separa los dos aspectos dependientes de la plataforma: el compilador se ejecuta una vez y produce bytecode portable,
mientras que solo la máquina virtual debe implementarse para cada plataforma. El resultado es el principio
*write once, run anywhere* (escribir una vez, ejecutar en cualquier lugar), a costa de una capa adicional entre el programa y el hardware.

---

## Compilación Just-in-Time {/*#just-in-time-compilation*/}

Un **compilador just-in-time** (JIT) forma parte de la máquina virtual. El bytecode se interpreta inicialmente y el
entorno de ejecución registra con qué frecuencia se ejecutan las distintas secciones. Las secciones de uso frecuente, los llamados *hot spots*, se
compilan en código máquina nativo en tiempo de ejecución y se almacenan en caché, de modo que las llamadas posteriores se ejecutan a velocidad nativa.

```text
Bytecode => [Interpretation + Profiling] => hot code => [JIT Compiler] => cached Machine Code
```

### Ventajas {/*#advantages-2*/}

- **Velocidad casi nativa** conservando la portabilidad del bytecode
- **Información en tiempo de ejecución**, como los tipos de datos reales y las frecuencias de las ramas, permite optimizaciones que un compilador
  estático no puede realizar

### Desventajas {/*#disadvantages-2*/}

- **Fase de calentamiento**: las primeras ejecuciones son lentas, lo que se nota en programas de corta duración
- **Consumo de memoria**: los datos de perfilado y el código compilado ocupan memoria adicional
- **Tiempos menos predecibles**: la compilación durante la ejecución hace que los tiempos de ejecución fluctúen, lo que es problemático
  para los sistemas de tiempo real

El contrapunto es la **compilación ahead-of-time** (AOT), en la que el bytecode se traduce por completo antes de la
ejecución. Esto elimina la fase de calentamiento y acorta el tiempo de arranque, pero pierde la información en tiempo de ejecución y,
por ello, se utiliza para procesos de corta duración, como herramientas de línea de comandos o funciones serverless.

### JIT frente a AOT {/*#jit-vs-aot*/}

| Criterio                          | Just-in-Time (JIT)                                       | Ahead-of-Time (AOT)                                        |
| --------------------------------- | -------------------------------------------------------- | ---------------------------------------------------------- |
| Momento de la traducción          | En tiempo de ejecución, para el código de uso frecuente  | Por completo antes de la ejecución                         |
| Tiempo de arranque                | Lento, fase de calentamiento                             | Rápido, sin calentamiento                                  |
| Rendimiento máximo                | Alto, mediante optimización en tiempo de ejecución       | Limitado, solo optimización estática                       |
| Base de la optimización           | Perfil real en tiempo de ejecución (hot spots, tipos)    | Solo análisis estático del código                          |
| Consumo de memoria                | Mayor, datos de perfilado y caché de código              | Menor                                                      |
| Previsibilidad de los tiempos     | Fluctuante                                               | Predecible                                                 |
| Funciones dinámicas del lenguaje  | Sin restricciones                                        | Restringidas, requieren configuración                      |
| Casos de uso típicos              | Aplicaciones de servidor y de escritorio de larga duración | Procesos de corta duración, herramientas CLI, serverless |

---

## Transpilador {/*#transpiler*/}

Un **transpilador** (compilador de código fuente a código fuente) traduce el código fuente al código fuente de otro
lenguaje del mismo nivel de abstracción, en lugar de a código máquina. Ejemplos típicos son TypeScript,
que se transpila a JavaScript, y Sass, que se transpila a CSS.

```text
TypeScript => [Transpiler] => JavaScript => [Engine with JIT] => Machine Code
```

---

## Comparación {/*#comparison*/}

| Criterio                           | Compilador                    | Intérprete                                      |
| ---------------------------------- | ----------------------------- | ----------------------------------------------- |
| Momento de la traducción           | Por completo antes de la ejecución | Durante la ejecución, instrucción por instrucción |
| Resultado                          | Archivo ejecutable            | Ningún artefacto independiente                  |
| Velocidad de ejecución             | Alta                          | Baja                                            |
| Detección de errores               | En tiempo de compilación      | En tiempo de ejecución, solo en el código ejecutado |
| Ciclo de desarrollo                | Más lento, requiere compilación | Más rápido, ejecución inmediata               |
| Independencia de la plataforma     | Baja, una compilación por plataforma | Alta, requiere un intérprete             |
| Requisito en el sistema de destino | Ninguno                       | El intérprete debe estar instalado              |
| Protección del código fuente       | Garantizada                   | Normalmente no garantizada                      |

---

## Representantes típicos {/*#typical-representatives*/}

- **Compilados a código máquina**: C, C++, Rust, Go, Delphi
- **Interpretados**: scripts de shell, Perl, PHP, Ruby, Python
- **Bytecode con VM y JIT**: Java, Kotlin, C# y JavaScript en motores como V8
