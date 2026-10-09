---
title: "Tipos de sistemas de archivos"
description: "Visión general de los tipos de sistemas de archivos habituales (FAT32, exFAT, NTFS, ext4, APFS, btrfs) y sus casos de uso típicos, límites y compatibilidad entre plataformas."
keywords:
    - Sistema de archivos
    - FAT32
    - exFAT
    - NTFS
    - ext4
    - APFS
    - btrfs
machine_translated: true
---

# Tipos de sistemas de archivos

Un **sistema de archivos** define cómo se organizan y almacenan los datos en un dispositivo de almacenamiento. Los sistemas de archivos se diferencian en el tamaño máximo de archivo, la compatibilidad con el registro por diario (journaling) y los sistemas operativos que pueden leerlos y escribirlos.

## Visión general {/*#overview*/}

| Sistema de archivos | Tamaño máx. de archivo | Journaling                   | Uso típico                                                  |
| ------------------- | ---------------------- | ---------------------------- | ----------------------------------------------------------- |
| FAT32               | 4 GB                   | No                           | Memorias USB, tarjetas SD, amplia compatibilidad            |
| exFAT               | 16 EB                  | No                           | Memorias USB y tarjetas SD grandes entre plataformas        |
| NTFS                | 16 EB                  | Sí                           | Unidades de sistema y de datos de Windows                   |
| ext4                | 16 TB                  | Sí                           | Sistema de archivos predeterminado de Linux                 |
| APFS                | 8 EB                   | Sí (copy-on-write)           | Sistema de archivos predeterminado de macOS                 |
| btrfs               | 16 EB                  | Sí (copy-on-write)           | Linux, con instantáneas y agrupación de volúmenes           |

## Elección de un sistema de archivos {/*#choosing-a-filesystem*/}

- **Máxima compatibilidad (archivos pequeños):** FAT32 es leído y escrito por prácticamente cualquier dispositivo, pero está limitado a 4 GB por archivo.
- **Máxima compatibilidad (archivos grandes):** exFAT elimina el límite de 4 GB y funciona en Linux, Windows y macOS.
- **Solo Linux:** ext4 es la opción segura por defecto; btrfs añade instantáneas y otras funciones avanzadas.
- **Solo Windows:** NTFS admite permisos, journaling y volúmenes grandes.
- **Solo macOS:** APFS está optimizado para SSD y es la opción moderna por defecto.
