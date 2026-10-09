---
title: "Enlaces duros y simbólicos"
description: "Enlaces duros y enlaces simbólicos (blandos) en Linux. Qué son, en qué se diferencian y cómo crearlos y gestionarlos con el comando `ln`."
keywords:
    - Linux
    - Enlace duro
    - Enlace blando
    - Enlace simbólico
    - symlink
    - ln
    - Sistema de archivos
    - inodo
machine_translated: true
---

# Enlaces duros y simbólicos

Un **enlace** es una referencia desde una ruta del sistema de archivos a otro archivo o directorio. Linux admite dos tipos: **enlaces duros** y **enlaces simbólicos (blandos)**. Ambos se crean con el comando `ln`, pero se comportan de forma muy distinta.

## Inodos {/*#inodes*/}

Cada archivo de un sistema de archivos Linux se identifica mediante un **inodo**, un número que apunta a los datos reales en el disco. Un nombre de archivo es solo una etiqueta que se corresponde con un inodo, y varios nombres de archivo pueden apuntar al mismo inodo.

```bash
ls -i file.txt    # Show the inode number of a file
```

## Enlaces duros {/*#hard-links*/}

Un enlace duro crea un **nombre de archivo adicional para el mismo inodo**. Ambos nombres se refieren exactamente al mismo archivo en el disco. Ninguno es «el original». Los datos del archivo solo se liberan cuando se elimina el último enlace duro que apunta a ellos.

### Crear un enlace duro {/*#creating-a-hard-link*/}

```bash
ln target.txt linkname.txt
```

### Propiedades {/*#properties*/}

- Ambos nombres comparten el mismo inodo
- Eliminar un nombre no afecta al otro
- No pueden cruzar sistemas de archivos, ambos nombres deben residir en la misma partición
- No pueden enlazar directorios (con raras excepciones reservadas al sistema)
- No pueden enlazar a un archivo que no existe

### Ejemplo {/*#example*/}

```bash
echo "hello" > original.txt
ln original.txt hardlink.txt
ls -li original.txt hardlink.txt
# 12345 -rw-r--r-- 2 user user 6 Apr 25 10:00 original.txt
# 12345 -rw-r--r-- 2 user user 6 Apr 25 10:00 hardlink.txt
rm original.txt
cat hardlink.txt    # still prints "hello"
```

## Enlaces simbólicos (blandos) {/*#symbolic-soft-links*/}

Un enlace simbólico es un pequeño archivo especial que **almacena la ruta** a otro archivo o directorio. Tiene su propio inodo. Si el destino se mueve o se elimina, el enlace simbólico queda «colgante» y roto.

### Crear un enlace simbólico {/*#creating-a-symbolic-link*/}

```bash
ln -s target.txt linkname.txt
```

### Propiedades {/*#properties-1*/}

- Tiene su propio inodo, distinto del destino
- Puede cruzar sistemas de archivos libremente
- Puede enlazar directorios
- Puede apuntar a un destino inexistente (enlace roto o colgante)
- Puede usar rutas absolutas o relativas como destino

### Ejemplo {/*#example-1*/}

```bash
echo "hello" > original.txt
ln -s original.txt softlink.txt
ls -li original.txt softlink.txt
# 12345 -rw-r--r-- 1 user user  6 Apr 25 10:00 original.txt
# 12346 lrwxrwxrwx 1 user user 12 Apr 25 10:00 softlink.txt -> original.txt
rm original.txt
cat softlink.txt    # error: No such file or directory
```

## Enlaces duros frente a enlaces blandos {/*#hard-vs-soft-links*/}

| Propiedad                               | Enlace duro               | Enlace blando |
| --------------------------------------- | ------------------------- | ------------- |
| Apunta a                                | inodo                     | ruta          |
| ¿Inodo propio?                          | No (el mismo que el destino) | Sí         |
| ¿Puede cruzar sistemas de archivos?     | No                        | Sí            |
| ¿Puede enlazar directorios?             | No                        | Sí            |
| ¿Puede apuntar a un archivo inexistente? | No                       | Sí            |
| ¿Sobrevive a la eliminación del destino? | Sí                       | No            |
| Se crea con                             | `ln`                   | `ln -s`       |

## Opciones habituales de `ln` {/*#common-ln-options*/}

| Comando              | Descripción                                                                                |
| -------------------- | ------------------------------------------------------------------------------------------ |
| `ln target name`     | Crear un enlace duro                                                                       |
| `ln -s target name`  | Crear un enlace simbólico (blando)                                                         |
| `ln -f target name`  | Eliminar (sobrescribir) un archivo de destino existente                                    |
| `ln -i target name`  | Preguntar antes de sobrescribir un destino existente                                       |
| `ln -b target name`  | Hacer una copia de seguridad de un destino existente antes de reemplazarlo (añade `~` al nombre de archivo) |
| `ln -v target name`  | Mostrar el nombre de cada archivo enlazado (detallado)                                     |
| `ln -sf target name` | Reemplazar a la fuerza un enlace existente con el mismo nombre                             |
| `readlink name`      | Mostrar la ruta a la que apunta un enlace simbólico                                        |
| `readlink -f name`   | Resolver todos los enlaces simbólicos hasta la ruta absoluta canónica                      |

## Cuándo usar cada uno {/*#when-to-use-which*/}

- Los **enlaces duros** resultan útiles para mantener varios nombres estables para el mismo archivo (por ejemplo, instantáneas de copias de seguridad que comparten contenido sin modificar) sin usar espacio adicional en disco.
- Los **enlaces blandos** son la opción más habitual para los accesos directos. Por ejemplo, para alternar entre versiones de una herramienta (p. ej. `/usr/bin/python => python3.12`) o para referenciar archivos entre puntos de montaje.
