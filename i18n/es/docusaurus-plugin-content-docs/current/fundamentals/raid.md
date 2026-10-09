---
title: "RAID"
description: "Visión general de JBOD y de los niveles RAID 0, 1, 5, 6, 10 y 01, con sus compromisos entre rendimiento, redundancia y eficiencia de almacenamiento."
keywords:
    - RAID
    - Matriz redundante de discos independientes
    - Matriz redundante de discos económicos
    - almacenamiento
    - redundancia de discos
tags:
    - ap2
machine_translated: true
---

# RAID

## Visión general {/*#overview*/}

RAID (Redundant Array of Independent/Inexpensive Disks) es un método para combinar varios discos físicos en una unidad lógica con el fin de mejorar el rendimiento, la redundancia o ambos.

## JBOD – Just a Bunch of Disks {/*#jbod--just-a-bunch-of-disks*/}

JBOD es la ausencia de un nivel RAID: los discos se utilizan tal cual. O bien cada disco aparece individualmente en el sistema operativo, o bien varios discos se concatenan en un único volumen lógico grande (también llamado spanning o modo lineal). Los datos se escriben en un disco hasta que se llena y después se utiliza el siguiente.

- **Discos mínimos:** 1
- **Rendimiento:** Igual que un solo disco, no hay striping y, por tanto, tampoco acceso en paralelo
- **Redundancia:** Ninguna
- **Capacidad utilizable:** 100 %, pueden combinarse discos de distintos tamaños sin perder espacio

**Ideal para:** archivos, destinos de copias de seguridad y bibliotecas multimedia en los que importa la capacidad por euro y los datos están disponibles en otro lugar.

**Ventajas:**

- Pueden combinarse discos de distintos tamaños y antigüedades.
- No se pierde capacidad por paridad ni por duplicación.
- Un disco averiado solo afecta a los datos almacenados en ese disco, no a todo el volumen.
- Añadir otro disco no requiere reconstruir la matriz.

**Desventajas:**

- No hay redundancia ni mejora de rendimiento.
- En un volumen concatenado, también se pierden los archivos que cruzan el límite entre dos discos.
- Un fallo es más difícil de evaluar que en un nivel RAID real, porque depende de qué archivos se encontraban en el disco averiado.

## RAID 0 – Striping {/*#raid-0--striping*/}

Los datos se dividen en bloques y se escriben en paralelo en todos los discos.

- **Discos mínimos:** 2
- **Rendimiento:** Máxima velocidad de lectura y escritura (escala con el número de discos)
- **Redundancia:** Ninguna, el fallo de un disco provoca la pérdida de todos los datos
- **Capacidad utilizable:** 100 %

**Ideal para:** datos temporales, cachés u otros escenarios en los que la velocidad importa más que la fiabilidad.

**Ventajas:**

- Máximo rendimiento de lectura y escritura
- Capacidad de almacenamiento utilizable completa
- Fácil de configurar

**Desventajas:**

- Sin tolerancia a fallos
- Pérdida de todos los datos con el fallo de un solo disco

## RAID 1 – Mirroring {/*#raid-1--mirroring*/}

Los datos se escriben de forma idéntica en todos los discos.

- **Discos mínimos:** 2
- **Rendimiento:** Lecturas más rápidas (puede leerse de cualquier disco), misma velocidad de escritura que un solo disco
- **Redundancia:** Puede sobrevivir al fallo de todos los discos menos uno
- **Capacidad utilizable:** 50 %

**Ideal para:** unidades del sistema operativo o datos críticos en los que la fiabilidad es la prioridad.

**Ventajas:**

- Alta redundancia, recuperación sencilla
- Rendimiento de lectura rápido
- Fácil de entender y gestionar

**Desventajas:**

- El 50 % de la capacidad de almacenamiento se pierde por la duplicación
- Escrituras no más rápidas que las de un solo disco

## RAID 5 – Striping con paridad distribuida {/*#raid-5--striping-with-distributed-parity*/}

Los datos y la información de paridad se reparten por todos los discos. La paridad permite recuperar los datos si falla un disco.

- **Discos mínimos:** 3
- **Rendimiento:** Buena velocidad de lectura; velocidad de escritura reducida por el cálculo de paridad
- **Redundancia:** Tolera el fallo de 1 disco
- **Capacidad utilizable:** `(n - 1) / n` (p. ej. 3 discos => 67 %)

**Ideal para:** servidores de archivos de uso general que equilibran capacidad, rendimiento y redundancia.

**Ventajas:**

- Buen equilibrio entre capacidad, rendimiento y redundancia
- Solo se pierde la capacidad de un disco por la paridad

**Desventajas:**

- El cálculo de paridad reduce el rendimiento de escritura.
- Los tiempos de reconstrucción pueden ser muy largos en discos grandes.
- La matriz es vulnerable a un segundo fallo durante la reconstrucción.

## RAID 6 – Striping con doble paridad {/*#raid-6--striping-with-double-parity*/}

Como [RAID 5](#raid-5--striping-with-distributed-parity), pero con dos bloques de paridad independientes, lo que tolera dos fallos de disco simultáneos.

- **Discos mínimos:** 4
- **Rendimiento:** Escrituras algo más lentas que en RAID 5 por la doble paridad
- **Redundancia:** Tolera el fallo de 2 discos
- **Capacidad utilizable:** `(n - 2) / n` (p. ej. 4 discos => 50 %)

**Ideal para:** matrices grandes o entornos en los que el tiempo de reconstrucción aumenta el riesgo de fallo.

**Ventajas:**

- Sobrevive a dos fallos de disco simultáneos
- Más seguro para matrices grandes en las que una reconstrucción puede durar días

**Desventajas:**

- Mayor penalización de escritura que RAID 5
- Se pierde la capacidad de dos discos por la paridad
- Requiere al menos 4 discos

## RAID 10 – Striping + Mirroring {/*#raid-10--striping--mirroring*/}

Combina [RAID 1](#raid-1--mirroring) (duplicación) y [RAID 0](#raid-0--striping) (striping): los datos se duplican por pares y después se reparten entre los pares.

- **Discos mínimos:** 4
- **Rendimiento:** Alta velocidad de lectura y escritura
- **Redundancia:** Tolera 1 fallo por cada par duplicado
- **Capacidad utilizable:** 50 %

**Ideal para:** bases de datos y cargas de trabajo de alto rendimiento que necesitan velocidad y redundancia.

**Ventajas:**

- Excelente rendimiento de lectura y escritura
- Reconstrucción rápida en comparación con los niveles RAID basados en paridad
- Proceso de recuperación sencillo

**Desventajas:**

- El 50 % de la capacidad de almacenamiento se pierde por la duplicación
- Requiere al menos 4 discos, con costes que escalan rápidamente

## RAID 01 – Mirroring + Striping {/*#raid-01--mirroring--striping*/}

RAID 01 (también escrito RAID 0+1) combina los mismos dos niveles que RAID 10, pero en el orden inverso: los discos se agrupan primero en conjuntos de striping RAID 0 y después esos conjuntos se duplican.

- **Discos mínimos:** 4
- **Rendimiento:** Igual que RAID 10, alta velocidad de lectura y escritura
- **Redundancia:** Tolera con seguridad el fallo de 1 disco
- **Capacidad utilizable:** 50 %

```text
RAID 10:  mirror(Disk1, Disk2) + mirror(Disk3, Disk4), striped across both mirrors
RAID 01:  stripe(Disk1, Disk2) + stripe(Disk3, Disk4), mirrored onto each other
```

**Ideal para:** nada en particular. RAID 10 logra lo mismo con mejor comportamiento ante fallos y, por tanto, se utiliza en su lugar.

**Diferencia con RAID 10:** el fallo de un solo disco inutiliza todo el conjunto de striping al que pertenece, por lo que la matriz funciona con el espejo restante. Un segundo fallo destruye la matriz, a menos que afecte a uno de los discos del conjunto ya averiado. En RAID 10 solo se degrada el par duplicado afectado, y un segundo fallo se sobrevive siempre que ocurra en un par distinto. La reconstrucción difiere en consecuencia: RAID 10 solo resincroniza a un integrante del espejo, mientras que RAID 01 tiene que reconstruir todo el conjunto de striping.

**Ventajas:**

- Alto rendimiento de lectura y escritura
- Fácil de entender como combinación de dos niveles básicos

**Desventajas:**

- Peor comportamiento ante fallos que RAID 10 con idéntico coste
- El 50 % de la capacidad de almacenamiento se pierde por la duplicación
- Reconstrucción más larga, ya que debe restaurarse un conjunto de striping completo

## Comparación {/*#comparison*/}

| Nivel                                               | Discos mín. | Tolerancia a fallos | Capacidad utilizable | Rendimiento                        |
| --------------------------------------------------- | ----------- | ------------------- | -------------------- | ---------------------------------- |
| [JBOD](#jbod--just-a-bunch-of-disks)                | 1           | 0 discos            | 100 %                | Como un solo disco                 |
| [RAID 0](#raid-0--striping)                         | 2           | 0 discos            | 100 %                | Lecturas y escrituras muy altas    |
| [RAID 1](#raid-1--mirroring)                        | 2           | n-1 discos          | 50 %                 | Lecturas rápidas, escrituras normales |
| [RAID 5](#raid-5--striping-with-distributed-parity) | 3           | 1 disco             | (n-1)/n              | Lecturas rápidas, escrituras lentas |
| [RAID 6](#raid-6--striping-with-double-parity)      | 4           | 2 discos            | (n-2)/n              | Lecturas rápidas, escrituras más lentas |
| [RAID 10](#raid-10--striping--mirroring)            | 4           | 1 por par           | 50 %                 | Lecturas y escrituras muy altas    |
| [RAID 01](#raid-01--mirroring--striping)            | 4           | 1 disco             | 50 %                 | Lecturas y escrituras muy altas    |

## Notas importantes {/*#important-notes*/}

- RAID **no es una copia de seguridad**: protege frente al fallo de discos, no frente a borrados accidentales, corrupción ni desastres.
- El tiempo de reconstrucción en discos grandes puede durar de horas a días, y durante ese tiempo la matriz es vulnerable.
- Los controladores RAID por hardware ofrecen mejor rendimiento y caché, pero añaden coste y dependencia del fabricante.
- El RAID por software (p. ej. Linux `mdadm`, Windows Storage Spaces, ZFS) es una alternativa económica.
