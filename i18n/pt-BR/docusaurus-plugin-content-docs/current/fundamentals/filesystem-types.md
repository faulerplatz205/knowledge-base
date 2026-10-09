---
title: "Tipos de sistema de arquivos"
description: "Visão geral dos tipos comuns de sistema de arquivos (FAT32, exFAT, NTFS, ext4, APFS, btrfs) e seus casos de uso típicos, limites e suporte por plataforma."
keywords:
    - Sistema de arquivos
    - FAT32
    - exFAT
    - NTFS
    - ext4
    - APFS
    - btrfs
machine_translated: true
---

# Tipos de sistema de arquivos

Um **sistema de arquivos** define como os dados são organizados e armazenados em um dispositivo de armazenamento. Os sistemas de arquivos diferem no tamanho máximo de arquivo, no suporte a journaling e nos sistemas operacionais que conseguem lê-los e gravá-los.

## Visão geral {/*#overview*/}

| Sistema de arquivos | Tamanho máx. de arquivo | Journaling          | Uso típico                                    |
| ---------- | ------------- | ------------------- | ---------------------------------------------- |
| FAT32      | 4 GB          | Não                  | Pen drives, cartões SD, ampla compatibilidade      |
| exFAT      | 16 EB         | Não                  | Pen drives e cartões SD grandes entre plataformas |
| NTFS       | 16 EB         | Sim                 | Unidades de sistema e de dados do Windows                 |
| ext4       | 16 TB         | Sim                 | Sistema de arquivos padrão do Linux                       |
| APFS       | 8 EB          | Sim (copy-on-write) | Sistema de arquivos padrão do macOS              |
| btrfs      | 16 EB         | Sim (copy-on-write) | Linux, com snapshots e pooling              |

## Escolha de um sistema de arquivos {/*#choosing-a-filesystem*/}

- **Compatibilidade máxima (arquivos pequenos):** o FAT32 é lido e gravado por praticamente todos os dispositivos, mas é limitado a 4 GB por arquivo.
- **Compatibilidade máxima (arquivos grandes):** o exFAT elimina o limite de 4 GB e funciona em Linux, Windows e macOS.
- **Somente Linux:** o ext4 é o padrão seguro; o btrfs acrescenta snapshots e outros recursos avançados.
- **Somente Windows:** o NTFS suporta permissões, journaling e volumes grandes.
- **Somente macOS:** o APFS é otimizado para SSDs e é o padrão moderno.
