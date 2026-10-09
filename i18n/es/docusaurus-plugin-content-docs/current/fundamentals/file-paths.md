---
title: "Rutas de archivo"
description: "Rutas absolutas y relativas en un sistema de archivos. En qué se diferencian y los componentes especiales de ruta `/`, `.`, `..` y `~`."
keywords:
    - Ruta de archivo
    - Ruta absoluta
    - Ruta relativa
    - Directorio de trabajo
    - Sistema de archivos
machine_translated: true
---

# Rutas de archivo

Una **ruta** describe la ubicación de un archivo o directorio en el sistema de archivos. Hay dos formas de escribirla: **absoluta** y **relativa**.

## Rutas absolutas {/*#absolute-paths*/}

Una ruta absoluta parte de la **raíz** del sistema de archivos y, por tanto, es inequívoca con independencia de la ubicación actual.

- En Linux y macOS la raíz es `/`, p. ej. `/home/user/notes.txt`
- En Windows comienza con una letra de unidad, p. ej. `C:\Users\user\notes.txt`

## Rutas relativas {/*#relative-paths*/}

Una ruta relativa se interpreta **respecto al directorio de trabajo actual**. No comienza con `/` (ni con una letra de unidad).

```bash
cd /home/user
cat notes.txt          # => /home/user/notes.txt
cat projects/app.js    # => /home/user/projects/app.js
```

## Componentes especiales de ruta {/*#special-path-components*/}

| Componente | Significado                                         |
| ---------- | --------------------------------------------------- |
| `/`        | Directorio raíz (inicio de una ruta absoluta)       |
| `.`        | El directorio actual                                |
| `..`       | El directorio padre (un nivel hacia arriba)         |
| `~`        | El directorio personal del usuario actual           |

### Ejemplos {/*#examples*/}

```bash
cd ..        # Move up one directory
cd ./bin     # Enter the bin directory below the current one
cd ~         # Go to the home directory
cat ../config.txt
```

## Directorio de trabajo {/*#working-directory*/}

El **directorio de trabajo** es el directorio en el que un proceso se encuentra en ese momento. Es el punto de anclaje respecto al cual se resuelve toda ruta relativa.

```bash
pwd    # Print the current working directory
```
