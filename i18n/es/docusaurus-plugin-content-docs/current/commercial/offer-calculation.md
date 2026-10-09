---
title: "Cálculo de ofertas"
description: "Cómo calcular un precio de venta a partir del precio de lista de un proveedor mediante el esquema comercial estándar de cálculo, con descuentos, recargos e IVA."
keywords:
    - Cálculo de ofertas
    - Cálculo comercial
    - Fijación de precios
    - Compras
    - Comercial
tags:
    - ap2
machine_translated: true
---

# Cálculo de ofertas

## Resumen {/*#overview*/}

El cálculo de ofertas determina el precio de venta de un producto a partir del precio de compra más todos los costes, recargos e impuestos asociados. Sigue un esquema estandarizado paso a paso, utilizado en el comercio mayorista y minorista.

## Esquema de cálculo {/*#calculation-scheme*/}

### Lado de la compra {/*#purchase-side*/}

| Operación | Concepto                       | Nota                                |
| --------- | ------------------------------ | ----------------------------------- |
|           | Precio de compra de lista      | Precio de catálogo del proveedor    |
| −         | Descuento del proveedor        | % de reducción sobre el precio de lista |
| =         | Precio de compra neto          |                                     |
| −         | Descuento por pronto pago del proveedor | % de reducción por pago anticipado |
| =         | Precio de compra al contado    |                                     |
| +         | Costes de aprovisionamiento    | Transporte, aduanas                 |
| =         | **Precio de coste**            | Coste real de la mercancía          |

### Lado de la venta {/*#sales-side*/}

| Operación | Concepto                          | Nota                                                           |
| --------- | --------------------------------- | -------------------------------------------------------------- |
|           | Precio de coste                   | Trasladado desde el apartado anterior                          |
| +         | Recargo por gastos generales      | Costes de explotación, alquiler, personal, etc.                |
| =         | Precio de equilibrio              |                                                                |
| +         | Recargo de beneficio              | Margen de beneficio deseado                                    |
| =         | Precio de venta al contado        |                                                                |
| +         | Descuento por pronto pago del cliente | Se suma de nuevo: permite al cliente el descuento por pago anticipado |
| =         | Precio de venta neto              |                                                                |
| +         | Descuento del cliente             | Se suma de nuevo: permite al cliente recibir un descuento      |
| =         | Precio de venta de lista neto     |                                                                |
| +         | IVA                               | p. ej. 19 % en Alemania                                        |
| =         | **Precio de venta de lista bruto** | Precio final para el cliente                                  |

## Notas {/*#notes*/}

- El Skonto y el Rabatt se **suman de nuevo** en el lado de la venta porque representan posibles deducciones que el cliente puede reclamar, y el precio de venta debe cubrirlas
- El recargo por gastos generales se expresa normalmente como porcentaje del precio de coste, basado en los costes de explotación reales de la empresa
- El cálculo puede realizarse hacia delante (del precio de compra al precio de venta) o hacia atrás (de un precio de venta objetivo para obtener el precio de compra necesario)
