---
title: "Fundamentos de la notación UML"
description: "Notación UML transversal a los diagramas: marcadores de visibilidad, multiplicidades y su lectura, palabras clave, estereotipos, notas, valores etiquetados, restricciones, nombres de rol, convenciones de nomenclatura y marcos de diagrama."
keywords:
    - UML
    - Notación
    - Visibilidad
    - Multiplicidad
    - Palabra clave
    - Estereotipo
    - Valor etiquetado
    - Restricción
    - Nombre de rol
    - Marco de diagrama
tags:
    - ap2
machine_translated: true
---

# Fundamentos de la notación UML

## Visión general {/*#overview*/}

Un puñado de elementos de notación aparece en casi todos los diagramas UML, con independencia del tipo de diagrama. Los marcadores de visibilidad, las multiplicidades, las palabras clave y los estereotipos, las notas, las restricciones y los marcos de diagrama significan lo mismo en un [diagrama de clases](./class-diagram.md), en un [diagrama de componentes](./component-diagram.md) y en un [diagrama de máquina de estados](./state-machine-diagram.md).

---

## Visibilidad {/*#visibility*/}

La visibilidad indica quién puede acceder a una característica (atributo, operación o miembro de un paquete o componente). Se escribe como un único carácter directamente delante del nombre de la característica.

| Marcador | Nombre     | Acceso concedido a                                      | Uso típico                            |
| -------- | ---------- | ------------------------------------------------------- | ------------------------------------- |
| `+`      | público    | Todo elemento que pueda ver el clasificador             | Interfaz de una clase                 |
| `-`      | privado    | Solo el propio clasificador                             | Estado interno, operaciones auxiliares |
| `#`      | protegido  | El clasificador y sus especializaciones (subclases)     | Puntos de extensión para subclases    |
| `~`      | paquete    | Todo elemento del mismo paquete                         | Colaboración dentro de un módulo      |

Otros dos marcadores se confunden con frecuencia con la visibilidad, pero expresan algo distinto:

- `/` delante de un nombre marca una característica **derivada**, cuyo valor se calcula a partir de otras características (`/ age` a partir de `dateOfBirth`).
- Un nombre subrayado marca una característica **estática**, que pertenece al clasificador y no a un objeto individual.

La clase siguiente utiliza todos estos marcadores. El texto plano no puede mostrar un subrayado, por lo que el atributo estático `MAX_LIMIT` se marca con `(static)`:

```text
┌──────────────────────────────────────┐
│               Account                │
├──────────────────────────────────────┤
│ + accountNumber: String              │
│ - balance: Decimal                   │
│ # owner: Customer                    │
│ ~ auditLog: LogEntry [0..*]          │
│ / available: Decimal                 │
│ + MAX_LIMIT: Decimal = 5000 (static) │
├──────────────────────────────────────┤
│ + deposit(amount: Decimal)           │
│ + withdraw(amount: Decimal): Bool    │
│ - validate(amount: Decimal): Bool    │
└──────────────────────────────────────┘
```

La visibilidad es opcional en UML. Un marcador ausente significa *no especificada*, no *pública*, aunque muchas herramientas usen público por defecto.

---

## Multiplicidades {/*#multiplicities*/}

Una multiplicidad indica cuántos objetos pueden participar en un extremo de una asociación, o cuántos valores puede contener un atributo. Se escribe junto al extremo de la asociación o entre corchetes tras el tipo del atributo.

| Notación | Rango                    | Lectura                                                |
| -------- | ------------------------ | ------------------------------------------------------ |
| `1`      | exactamente 1            | Obligatorio, exactamente un objeto                     |
| `0..1`   | 0 o 1                    | Opcional, como máximo un objeto                        |
| `*`      | de 0 a ilimitado         | Forma abreviada de `0..*`, sin límite inferior implícito de 1 |
| `0..*`   | de 0 a ilimitado         | Opcional, cualquier número                             |
| `1..*`   | de 1 a ilimitado         | Obligatorio, al menos uno                              |
| `n..m`   | de n a m                 | Rango explícito, por ejemplo `2..4`                   |
| `5`      | exactamente 5            | Número fijo                                            |
| `1..3,7` | de 1 a 3, o exactamente 7 | Varios rangos                                         |

Reglas para leer y escribir multiplicidades:

- La multiplicidad se coloca junto a la clase que describe e indica cuántos objetos de esa clase están enlazados con un objeto del otro extremo.
- El límite inferior decide si la relación es opcional (`0`) u obligatoria (`1` o superior).
- El límite superior decide si la implementación contiene una única referencia (`1`) o una colección (`*`).
- Una multiplicidad omitida está formalmente indefinida, la mayoría de las herramientas y manuales la leen como `1`.

### Lectura de una asociación {/*#reading-an-association*/}

```text
┌──────────────┐ 1          0..* ┌──────────────┐
│   Customer   ├─────────────────┤    Order     │
└──────────────┘   places   ▶    └──────────────┘
```

La frase se construye con la clase de un extremo, el nombre de la asociación y la multiplicidad del otro extremo, y se repite después en el sentido opuesto:

- Un `Customer` realiza **cero o más** objetos `Order`.
- Un `Order` es realizado por **exactamente un** `Customer`.

El pequeño triángulo relleno `▶` tras el nombre de la asociación es el marcador de **sentido de lectura**. Indica en qué sentido el nombre forma una frase y no tiene más semántica. El triángulo es opcional, sin él el nombre se lee de izquierda a derecha o de arriba abajo.

---

## Palabras clave y estereotipos {/*#keywords-and-stereotypes*/}

Una etiqueta entre comillas angulares (`«…»`) añade significado a un elemento de modelo existente sin inventar una forma nueva para él. Se escribe encima o delante del nombre del elemento.

```text
┌──────────────────────┐
│     «interface»      │
│      Printable       │
├──────────────────────┤
│ + print(): void      │
└──────────────────────┘
```

Donde no se dispone de comillas angulares, se acepta como sustituto el doble signo de menor y mayor `<<interface>>`, por lo que en la práctica aparecen ambas grafías.

De esta forma se escriben dos tipos de etiqueta:

- Una **palabra clave** está predefinida por el propio UML. Nombra una metaclase o una variante fija de ella, está reservada y puede utilizarse sin declarar nada antes.
- Un **estereotipo** lo define el modelador o una herramienta y adapta un elemento a un dominio, una tecnología o un estándar de empresa. Solo tiene significado donde está definido.

Palabras clave predefinidas por UML:

| Palabra clave              | Se aplica a                   | Significado                                  |
| -------------------------- | ----------------------------- | -------------------------------------------- |
| `<<interface>>`            | Clase                         | Declara operaciones sin implementación       |
| `<<enumeration>>`          | Clase                         | Un tipo con un conjunto fijo de literales    |
| `<<include>>`              | Relación de caso de uso       | Un caso de uso utiliza siempre otro          |
| `<<extend>>`               | Relación de caso de uso       | Un caso de uso extiende opcionalmente otro   |
| `<<use>>`                  | Dependencia                   | El cliente requiere al proveedor             |
| `<<create>>`               | Mensaje                       | El mensaje crea el objeto receptor           |
| `<<destroy>>`              | Mensaje                       | El mensaje destruye el objeto receptor       |
| `<<device>>`               | Nodo                          | Un elemento físico de hardware               |
| `<<executionEnvironment>>` | Nodo                          | Entorno de ejecución en un dispositivo       |
| `<<artifact>>`             | Artefacto                     | Un archivo desplegable                       |

Los estereotipos se apoyan en estas palabras clave y son igualmente legítimos, siempre que estén definidos en algún lugar; para un proyecto pequeño basta una leyenda breve con los estereotipos utilizados. Ejemplos clásicos del modelado de análisis son `<<entity>>` para un objeto de negocio persistente, `<<boundary>>` para un elemento en el límite del sistema y `<<control>>` para un elemento coordinador.

---

## Notas y comentarios {/*#notes-and-comments*/}

Una nota es un rectángulo con una esquina doblada, unido mediante una línea discontinua al elemento que comenta. No tiene semántica, es texto libre para el lector.

```text
┌──────────────┐         ┌───────────────────────────┐
│   Invoice    │- - - - -│ Net amounts only, VAT is  └─┐
└──────────────┘         │ added by the tax service.   │
                         └─────────────────────────────┘
```

Indicaciones para el uso de notas:

- Una nota explica el *porqué*, no el *qué*, repetir el nombre del elemento en prosa no aporta nada.
- Una nota puede unirse a varios elementos con varias líneas discontinuas.
- Suposiciones, preguntas abiertas y decisiones con su justificación son contenidos típicos.
- Un modelo que solo resulta comprensible gracias a sus notas suele tener un problema estructural.

---

## Valores etiquetados {/*#tagged-values*/}

Un valor etiquetado asocia una propiedad con nombre a un elemento de modelo y se escribe como `name = value` entre llaves. Los valores etiquetados suelen introducirse mediante un estereotipo, que define qué etiquetas existen y qué significan.

```text
┌───────────────────────────────────┐
│             «entity»              │
│             Customer              │
│ {table = "CUST", schema = "crm"}  │
└───────────────────────────────────┘
```

Aplicaciones típicas:

- Información de correspondencia técnica, por ejemplo el nombre de una tabla o columna para la persistencia
- Metadatos de proceso como `{author = "Team A", version = "1.2", status = "reviewed"}`
- Requisitos no funcionales como `{maxResponseTime = "200ms"}`
- Indicaciones de generación de código consumidas por una cadena de herramientas dirigida por modelos

Varios valores etiquetados se separan con comas dentro de un mismo par de llaves, o se escriben en líneas separadas en una nota unida al elemento.

---

## Restricciones {/*#constraints*/}

Una restricción es una condición que debe cumplirse para que el modelo sea válido. Se escribe entre llaves, directamente en el elemento o en una nota adjunta.

| Restricción            | Se aplica a              | Significado                                                |
| ---------------------- | ------------------------ | ---------------------------------------------------------- |
| `{readOnly}`           | Atributo, extremo        | El valor se establece una vez y no se modifica después     |
| `{abstract}`           | Clase, operación         | Sin implementación, alternativa a la cursiva               |
| `{xor}`                | Dos asociaciones         | Solo puede instanciarse exactamente una de las dos asociaciones |
| `{complete, disjoint}` | Conjunto de generalización | Cada objeto pertenece exactamente a una subclase         |

Una restricción en texto libre es igualmente válida y mucho más frecuente en la práctica:

```text
┌──────────────┐         ┌─────────────────────────────┐
│   Account    │- - - - -│ {balance >= overdraftLimit} └─┐
└──────────────┘         └───────────────────────────────┘
```

### OCL {/*#ocl*/}

Para condiciones que deben formularse de manera formal, el OMG define el **Object Constraint Language** (OCL), un lenguaje textual independiente que se utiliza junto con UML. La condición de la nota anterior, escrita en OCL:

```text
context Account
  inv: balance >= overdraftLimit
```

`context` nombra la clase a la que se aplica la condición, `inv` marca un invariante, una condición que debe cumplirse en todo momento. En la práctica suele bastar una condición informal entre llaves, lo importante es que esté unida al elemento correcto.

---

## Nombres de rol y navegabilidad {/*#role-names-and-navigability*/}

Un extremo de asociación puede llevar un **nombre de rol**, que indica el papel que desempeña la clase en esa relación. El nombre de rol se escribe en el extremo que describe, en minúsculas, y se convierte en el nombre del atributo en la implementación.

```text
┌──────────────┐ employer        employee ┌──────────────┐
│   Company    ├──────────────────────────┤    Person    │
└──────────────┘ 1                    0..*└──────────────┘
```

Lectura: un `Person` tiene exactamente un `Company` en el rol `employer`, un `Company` tiene cero o más objetos `Person` en el rol `employee`. La implementación llevaría un campo `employer` en `Person` y una colección `employee` en `Company`.

Los nombres de rol resultan indispensables cuando dos clases están conectadas más de una vez o cuando una clase se asocia consigo misma:

```text
┌────────────────────┐
│      Employee      │
└──┬──────────────┬──┘
   │ 0..1         │ 0..*
   │ supervisor   │ subordinate
   └──────────────┘
```

Lectura: un `Employee` tiene como máximo otro `Employee` en el rol `supervisor` y cero o más en el rol `subordinate`.

Elementos que dan una dirección a una asociación:

- **Sentido de lectura (`▶`):** junto al nombre de la asociación, una mera ayuda de lectura
- **Navegabilidad (punta de flecha abierta):** en un extremo, ese extremo es alcanzable desde el otro
- **No navegabilidad (pequeña cruz `x`):** en un extremo, ese extremo explícitamente no es alcanzable
- **Sin puntas de flecha:** navegabilidad no especificada, en la práctica se lee como *navegable en ambos sentidos*

---

## Convenciones de nomenclatura {/*#naming-conventions*/}

Las convenciones siguientes no forman parte de la especificación UML, pero son casi universales en la práctica.

| Elemento              | Convención                              | Ejemplo                       |
| --------------------- | --------------------------------------- | ----------------------------- |
| Clase                 | PascalCase, sustantivo en singular      | `Invoice`, `CustomerAccount`  |
| Interfaz              | PascalCase, a menudo un adjetivo        | `Printable`, `Comparable`     |
| Atributo              | camelCase, sustantivo                   | `orderDate`, `totalAmount`    |
| Operación             | camelCase, verbo + objeto               | `calculateTotal()`            |
| Nombre de rol         | camelCase, sustantivo que nombra el rol | `employer`, `lineItems`       |
| Nombre de asociación  | Verbo en tercera persona del singular   | `places`, `contains`          |
| Paquete               | Minúsculas, singular                    | `billing`, `reporting`        |
| Caso de uso           | Verbo + objeto en infinitivo            | `Place order`                 |
| Actor                 | Sustantivo de rol, nunca el nombre de una persona | `Customer`, `Payment Service` |
| Acción                | Verbo + objeto en infinitivo            | `Validate order`              |
| Estado                | Adjetivo o participio                   | `Paid`, `Awaiting approval`   |
| Componente            | Sustantivo que describe el servicio     | `OrderService`                |
| Nodo                  | Sustantivo que describe dispositivo o host | `Application Server`          |

Dos reglas se aplican a todos ellos:

- Un nombre para un concepto en todo el modelo, una clase llamada `Customer` en un diagrama no es `Client` en el siguiente.
- El idioma del modelo se elige una sola vez, para todo el modelo, y no se mezcla.

---

## Marcos de diagrama {/*#diagram-frames*/}

Todo diagrama UML puede dibujarse dentro de un marco: un rectángulo cuya esquina superior izquierda lleva una etiqueta pentagonal con el tipo de diagrama y el nombre del diagrama.

```text
┌─────────────────────────────────────────────┐
│ sd Place Order ╱                            │
├───────────────┘                             │
│                                             │
│          (contents of the diagram)          │
│                                             │
└─────────────────────────────────────────────┘
```

El encabezado del marco sigue el patrón `<kind> <name>`, opcionalmente con parámetros. Palabras clave de tipo habituales, en forma corta y en forma larga que también aceptan las herramientas:

| Corta | Larga           | Diagrama                              |
| ----- | --------------- | ------------------------------------- |
| `sd`  | `interaction`   | Secuencia, comunicación, tiempos      |
| `act` | `activity`      | Actividades                           |
| `stm` | `state machine` | Máquina de estados                    |
| `cmp` | `component`     | Componentes                           |
| `dep` | `deployment`    | Despliegue                            |
| `cls` | `class`         | Clases                                |
| `uc`  | `use case`      | Casos de uso                          |
| `pkg` | `package`       | Paquetes                              |

Cuando el marco es obligatorio y no opcional:

- En un [diagrama de secuencia](./sequence-diagram.md), donde el marco es estándar y los fragmentos combinados anidados (`alt`, `opt`, `loop`, `ref`) se dibujan como marcos propios
- Siempre que un diagrama se referencia desde otro, ya que la referencia utiliza el nombre del marco
- Siempre que aparecen varios diagramas en una misma página o documento y es necesario distinguirlos

Para un diagrama único en su propia página, el marco suele omitirse y un encabezado ocupa su lugar.

---

## Correspondencia con el código {/*#mapping-to-code*/}

| Notación                       | Construcción en el programa                      |
| ------------------------------ | ------------------------------------------------ |
| `+`                    | `public`                                     |
| `-`                    | `private`                                    |
| `#`                    | `protected`                                  |
| `~`                    | Package-private en Java, `internal` en C#    |
| Nombre subrayado               | `static`                                     |
| `/` delante de un nombre  | Getter que calcula el valor, sin campo almacenado |
| `1`                    | Campo que no debe ser `null`                |
| `0..1`                 | Campo anulable, `Optional<T>`, `T?`          |
| `{readOnly}`           | `final`, `readonly`, `const`                 |
| `<<interface>>`        | `interface`                                  |
| `<<enumeration>>`      | `enum`                                       |
| `{abstract}`           | `abstract class`                             |
| Nombre de rol                  | Nombre del campo que contiene la referencia      |
| `inv` en OCL           | Comprobación en el constructor y en cada setter  |

---

## Errores comunes {/*#common-mistakes*/}

1. **Confundir `-` con un guion:** un `-` inicial es el marcador de visibilidad *privado*, no una decoración, un atributo privado no es accesible desde otra clase.
2. **Leer `*` como "muchos, pero al menos uno":** `*` significa `0..*`, si se requiere al menos un objeto la notación es `1..*`.
3. **Multiplicidad en el extremo equivocado:** la multiplicidad junto a una clase indica cuántos objetos de *esa* clase participan, visto desde el extremo opuesto.
4. **Llaves y comillas angulares intercambiadas:** `{...}` contiene una restricción o un valor etiquetado, `«...»` una palabra clave o un estereotipo, los dos no son intercambiables.
5. **Estereotipos sin definición:** un estereotipo inventado que no se explica en ningún lugar es decoración, no información.
6. **Nombre de rol idéntico al nombre de la clase:** un rol `customer` en un `Customer` no aporta nada, un nombre de rol solo merece la pena si dice más que el tipo.
7. **Notas que portan semántica del modelo:** una condición que el sistema debe imponer pertenece a una restricción, no a una nota en prosa.
8. **Sentido de lectura confundido con navegabilidad:** el triángulo relleno `▶` afecta a la frase, la punta de flecha abierta afecta al acceso.
9. **Idiomas mezclados y nombres inconsistentes:** el mismo concepto con dos nombres produce dos conceptos en la mente del lector.
10. **Omitir la visibilidad en todas partes e implementar todo como público:** una visibilidad no especificada es una laguna del modelo, no una decisión.

---

## Herramientas {/*#tools*/}

- draw.io / diagrams.net (gratuito, basado en navegador, biblioteca de formas UML incluida)
- PlantUML (basado en texto, admite estereotipos, valores etiquetados y marcos directamente en el código fuente)
- Mermaid (basado en texto, se renderiza en Markdown, admite un subconjunto de la notación)
- Visual Paradigm, StarUML, Enterprise Architect (comerciales, con soporte de OCL)

## Véase también {/*#see-also*/}

- [Visión general de UML](./uml-overview.mdx): los tipos de diagrama de UML y cómo se relacionan entre sí
- [Diagrama de clases](./class-diagram.md): donde más intensivamente se usan la visibilidad, la multiplicidad y los nombres de rol
- [Diagrama de actividades](./activity-diagram.md): notas y marcos en un diagrama de comportamiento
- [Diagrama de casos de uso](./use-case-diagram.md): las palabras clave `<<include>>` y `<<extend>>` en contexto
- [Diagrama de secuencia](./sequence-diagram.md): marcos como fragmentos combinados
- [Diagrama de máquina de estados](./state-machine-diagram.md): guardas y restricciones en transiciones
- [Diagrama de componentes](./component-diagram.md): palabras clave en componentes e interfaces
- [Diagrama de despliegue](./deployment-diagram.md): las palabras clave de nodo `<<device>>` y `<<executionEnvironment>>`
- [Otros diagramas UML](./further-uml-diagrams.md): los restantes tipos de diagrama y sus palabras clave de marco
- [Modelo ER](../databases/er-model.md): cardinalidades en el modelado de datos comparadas con las multiplicidades de UML
