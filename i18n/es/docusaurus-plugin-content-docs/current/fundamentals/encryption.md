---
title: "Cifrado y firmas digitales"
description: "Cifrado simétrico y asimétrico, incluidos AES, RSA y Diffie-Hellman, funciones hash, hash de contraseñas con sal y bcrypt, y firmas digitales."
keywords:
    - Cifrado
    - Firma digital
    - Cifrado simétrico
    - Cifrado asimétrico
    - Clave pública
    - Clave privada
    - Hash
    - AES
    - RSA
    - Diffie-Hellman
    - Salting
    - bcrypt
    - Hash de contraseñas
    - Seguridad
tags:
    - ap2
machine_translated: true
---

# Cifrado y firmas digitales

## Visión general {/*#overview*/}

El cifrado protege los datos frente a accesos no autorizados al transformarlos en un formato ilegible. Las firmas digitales verifican la autenticidad y la integridad de los datos y garantizan que no se manipularon durante la transmisión.

## Cifrado simétrico {/*#symmetric-encryption*/}

El emisor y el receptor utilizan la **misma clave** para cifrar y descifrar los datos.

- **Rápido** y eficiente para cifrar grandes cantidades de datos
- La **distribución de claves** es un desafío, porque la clave debe compartirse de forma segura de antemano
- **Algoritmos habituales:** AES (Advanced Encryption Standard), DES (Data Encryption Standard), 3DES (Triple Data Encryption Standard)
- **Caso de uso típico:** cifrado de datos en bloque

```text
Plaintext => [Encrypt with Key] => Ciphertext => [Decrypt with Key] => Plaintext
```

### AES {/*#aes*/}

AES (Advanced Encryption Standard) se estandarizó en 2001 como sucesor de DES y es el algoritmo simétrico utilizado en la actualidad.

- **Cifrado por bloques:** cifra bloques de 128 bits; los datos más largos se dividen en bloques y se rellenan
- **Longitudes de clave:** 128, 192 o 256 bits, que determinan el número de rondas (10, 12 o 14)
- **Rendimiento:** implementado en hardware en las CPU actuales (AES-NI), lo que lo hace lo bastante rápido para el cifrado de disco completo
- **Considerado seguro:** no existe ningún ataque práctico mejor que probar todas las claves

Como un cifrado por bloques cifra cada bloque por separado, un **modo de operación** determina cómo se enlazan los bloques:

| Modo                        | Propiedad                                                                                                                                   |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| ECB (Electronic Codebook)   | Cada bloque se cifra de forma independiente, los bloques de texto plano idénticos producen bloques de texto cifrado idénticos, por lo que no es adecuado |
| CBC (Cipher Block Chaining) | Cada bloque se combina con el bloque de texto cifrado anterior, requiere un vector de inicialización, sin protección de integridad          |
| CTR (Counter Mode)          | Convierte el cifrado por bloques en un cifrado de flujo paralelizable                                                                       |
| GCM (Galois/Counter Mode)   | Opción predeterminada actual: CTR más una etiqueta de autenticación que también detecta manipulaciones                                      |

Uso típico: cifrado de archivos y discos (LUKS, BitLocker, VeraCrypt), cifrado de la carga útil en [TLS](#hybrid-encryption), archivos comprimidos cifrados y columnas de bases de datos.

### DES y 3DES {/*#des-and-3des*/}

DES es el predecesor de AES, con una longitud de clave de 56 bits que hoy puede romperse por fuerza bruta en cuestión de horas, por lo que está obsoleto. 3DES aplica DES tres veces y alcanza así unos 112 bits efectivos, pero es lento y solo se encuentra en sistemas heredados. Ninguno de los dos se utiliza en desarrollos nuevos.

---

## Cifrado asimétrico {/*#asymmetric-encryption*/}

Utiliza un **par de claves**: una clave pública (compartida abiertamente) y una clave privada (mantenida en secreto).

- Los datos cifrados con la clave pública solo pueden descifrarse con la clave privada correspondiente
- **Más lento** que el cifrado simétrico debido a la complejidad matemática
- **Algoritmos habituales:** RSA (Rivest-Shamir-Adleman), ECC (Elliptic Curve Cryptography)
- **Casos de uso típicos:** intercambio de claves (cifrado híbrido), firmas digitales

```text
Plaintext => [Encrypt with Public Key of Receiver] => Ciphertext => [Decrypt with Private Key of Receiver] => Plaintext
```

### RSA {/*#rsa*/}

RSA es el algoritmo asimétrico más conocido. Su nombre procede de sus inventores Rivest, Shamir y Adleman.

- **Base de la seguridad:** multiplicar dos números primos grandes es fácil, pero descomponer el producto de nuevo en ellos no lo es
- **Longitudes de clave:** 2048 bits como mínimo, 3072 o 4096 bits para protección a largo plazo; no son comparables con las longitudes de clave simétricas
- **Capacidades:** cifrado y firmas digitales con el mismo par de claves
- **Limitación:** la carga útil debe ser más corta que la clave, por lo que RSA cifra una clave simétrica en lugar de los datos en sí

ECC (Elliptic Curve Cryptography) logra una seguridad comparable con claves mucho más cortas. Una clave ECC de 256 bits equivale aproximadamente a una clave RSA de 3072 bits. Por ello ECC se ha convertido en la opción predeterminada para el intercambio de claves en [TLS](#hybrid-encryption) (ECDHE) y se utiliza cada vez más para las firmas de certificados (ECDSA).

### Diffie-Hellman {/*#diffie-hellman*/}

Diffie-Hellman no es un algoritmo de cifrado, sino un procedimiento de **acuerdo de claves**. Ambas partes derivan un secreto compartido a partir de valores públicos y de su propio valor secreto, sin que ese secreto llegue a transmitirse nunca.

```text
Alice                                  Bob
secret a                               secret b
       ── public value A ────────────►
       ◄──────────── public value B ──
shared key from (B, a)  ==  shared key from (A, b)
```

- Un espía ve ambos valores públicos, pero no puede derivar de ellos la clave compartida
- Las variantes **efímeras** (DHE, ECDHE) generan un nuevo par de claves por sesión, de modo que un compromiso posterior de la clave a largo plazo no descifra el tráfico registrado (secreto perfecto hacia adelante)
- Diffie-Hellman por sí solo no autentica a nadie: sin un certificado, un atacante situado en medio puede acordar una clave con cada parte y retransmitir el tráfico

---

## Cifrado híbrido {/*#hybrid-encryption*/}

En la práctica ninguno de los dos métodos se utiliza por separado: la criptografía asimétrica resuelve la distribución de claves y la criptografía simétrica hace el trabajo real. TLS los combina exactamente de ese modo:

1. El servidor demuestra su identidad con un **certificado** que contiene su clave pública.
2. Ambas partes acuerdan una clave de sesión mediante **ECDHE** y autentican el intercambio con el certificado.
3. La carga útil se cifra **simétricamente** con esa clave de sesión, normalmente con AES-GCM.
4. La clave de sesión se descarta cuando termina la conexión.

---

## Funciones hash {/*#hash-functions*/}

Una función hash asigna datos de tamaño arbitrario a una salida de tamaño fijo (hash o resumen).

- **Unidireccional:** los datos originales no pueden derivarse del hash
- **Determinista:** la misma entrada produce siempre el mismo hash
- **Resistente a colisiones:** entradas distintas no deberían producir el mismo hash
- **Efecto avalancha:** cambiar un solo bit de la entrada modifica aproximadamente la mitad de los bits del hash

Aplicaciones típicas: comprobaciones de integridad de descargas, detección de duplicados, firmas y, combinadas con los procedimientos descritos más abajo, el almacenamiento de contraseñas.

| Algoritmo | Longitud del resumen | Valoración                                                                                                                   |
| --------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| MD5       | 128 bits             | Roto, pueden producirse colisiones en cuestión de segundos, solo aceptable como suma de verificación frente a errores de transmisión |
| SHA-1     | 160 bits             | Roto, existen ataques prácticos de colisión, ya no se utiliza para firmas                                                    |
| SHA-256   | 256 bits             | Estándar actual, parte de la familia SHA-2                                                                                   |
| SHA-512   | 512 bits             | Como SHA-256 con un resumen más largo, más rápido que SHA-256 en sistemas de 64 bits                                         |
| SHA-3     | variable             | Construcción interna distinta de SHA-2, concebido como reserva por si SHA-2 se debilitara                                    |

---

## Hash de contraseñas {/*#hashing-passwords*/}

Las contraseñas nunca se almacenan en texto plano ni cifradas, porque tendría que existir en algún lugar una clave capaz de descifrarlas. Se les aplica un hash, de modo que una base de datos robada no revele las contraseñas en sí.

Un simple `SHA-256` no basta para esto por dos motivos:

- **Contraseñas idénticas producen hashes idénticos**, por lo que el hash revela qué cuentas comparten una contraseña, y una tabla precalculada (rainbow table) resuelve de inmediato las contraseñas comunes
- **Las funciones hash son rápidas por diseño**, y el hardware actual calcula miles de millones de hashes SHA-256 por segundo, lo que hace viable el ataque de fuerza bruta contra contraseñas cortas

### Sal (salt) {/*#salt*/}

Una sal es un valor aleatorio que se genera por contraseña y se somete a hash junto con ella. La sal no es secreta y se almacena junto al hash.

```text
hash = H(salt + password)
```

- Contraseñas idénticas producen hashes distintos, ya que la sal es diferente
- Las rainbow tables pierden su utilidad porque un atacante necesitaría una tabla por cada sal
- Cada contraseña tiene que atacarse individualmente en lugar de todas a la vez

Un **pepper** es un valor secreto adicional, idéntico para todas las contraseñas, que se almacena fuera de la base de datos, por ejemplo en la configuración de la aplicación. Solo sirve si se filtra la base de datos y no la configuración.

### Factor de trabajo {/*#work-factor*/}

La segunda medida consiste en hacer el hash deliberadamente lento: un procedimiento diseñado para contraseñas repite muchas veces su operación interna. El número de repeticiones es configurable como **factor de coste** y se aumenta a medida que el hardware se vuelve más rápido. Un retardo de unos 100 ms por inicio de sesión resulta imperceptible para el usuario y hace inviable probar miles de millones de candidatos.

### bcrypt {/*#bcrypt*/}

bcrypt es el procedimiento más extendido de este tipo y se basa en el cifrado Blowfish.

- La sal se genera y se almacena **dentro del hash**, por lo que no se necesita una columna aparte
- El factor de coste forma parte del hash, lo que permite verificar hashes antiguos después de haberlo aumentado
- Deliberadamente lento y dependiente de la memoria, lo que dificulta su aceleración en GPU frente a los procedimientos basados en SHA
- Limitación: solo se utilizan los primeros 72 bytes de la entrada

```text
$2b$12$eImiTXuWVxfM37uY4JANjQ.../hJ6CtPTuOrAXTlHGDLcJU3wG6Hpu
 │   │  └── salt (22 characters) ──┘└── hash ────────────────┘
 │   └───── cost factor 12, meaning 2^12 rounds
 └───────── algorithm identifier
```

Alternativas con la misma finalidad:

| Procedimiento | Nota                                                                                                                                              |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Argon2id      | Ganador de la Password Hashing Competition, ajustable en tiempo, memoria y paralelismo, recomendación actual para sistemas nuevos                 |
| scrypt        | Intensivo en memoria, por lo que resulta costoso de paralelizar en hardware especializado                                                         |
| PBKDF2        | Ampliamente disponible y estandarizado, pero limitado solo por el cómputo, lo que lo convierte en la opción más débil de estas                    |
| bcrypt        | Consolidado, bien comprendido, disponible en todos los lenguajes                                                                                  |

Lo que nunca debe encontrarse en un almacén de contraseñas: texto plano, cifrado reversible, hashes sin sal y una única función hash rápida como MD5, SHA-1 o SHA-256.

---

## Firmas digitales {/*#digital-signatures*/}

Las firmas digitales verifican que los datos fueron enviados por una parte concreta y que no se han alterado.

**Firma (emisor):**

1. Crear un [hash](#hash-functions) del mensaje
2. Cifrar el hash con la propia **clave privada** del emisor => esta es la firma
3. Enviar el mensaje junto con la firma

**Verificación (receptor):**

1. Descifrar la firma con la **clave pública** del emisor => revela el hash original
2. Calcular de forma independiente el hash del mensaje recibido
3. Comparar ambos hashes: si coinciden, la firma es válida y el mensaje es auténtico

Este procedimiento describe las firmas RSA. [ECDSA](#rsa) no cifra el hash, sino que calcula la firma a partir del hash y de la clave privada. El receptor la verifica con la clave pública.
