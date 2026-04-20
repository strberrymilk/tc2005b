# Ejercicio de Normalización

Author: Rodrigo Alejandro Hurtado Cortés
Matricula: A01713854

## Instrucciones

n cada ejercicio, partiendo de la tabla arbitraria que se proporciona, genera un conjunto de relaciones normalizadas en las que debe quedar indicada explícitamente la llave, justificando la forma en que derivas las nuevas relaciones .

Los nombres de las columnas son muy explícitos para guiarte en el descubrimiento de dependencias funcionales; si para el manejo de las relaciones decides abreviarlos, plantea un "diccionario" de equivalencias.

Es necesario normalizarla sólo hasta la tercera forma normal, sin embargo es necesario que se realice la traduccion paso a paso.

### Ejercicio No. 1

La siguiente relación es utilizada por el departamento de cobros de una empresa que ofrece el servicio de telecable, En ella se tiene una representación de los pagos de servicios mensuales de sus contratantes:

```
Servicios(cliente, domicilio y estado , año, rentabasica 1, servicios adicionales 1, rentabasica 2, servicios adicionales 2, rentabasica 3, servicios adicionales 3, .... rentabasica 12, servicios adicionales 12)
```

#### Procedimiento

Realizado con ayuda del profesor Ricardo Cortés.

**FN1**
Separación de columnas diferentes a su unicidad. Agregar mes para reducir renta basica y servicios adicionales

```
Servicio(cliente, domicilio, estado, año, mes, renta basica, servicios adicionales)
```

**FN2**
Agregar una llave primaria que garantize unicidad.
Agregar numero de contrato

```
Servicios(No Contrato, nombre cliente, domicilio, estado, año, mes,renta basica,servicios adicionales)
PK -> No Contrato ,año ,mes
```

**FN3**
Eliminar las dependencias transitivas.

```
Cliente(No Contrato, nombre cliente, domicilio, estado)
ClientesServicio(No Contrato, idServicio, fecha, monto)
Servicio(idServicio, descripcion, tarifa)
```
Es posible unificar la renta y los servicios adicionales como servicios en si mismos y colocarlos dentro de la tabla Servicio.
La interacción entre estos (N-N) se puede manejar a traves de la tabla intermedia ClientesServicio. 

---

### Ejercicio No. 2

Una empresa de manufactura controla su producción mediante la siguiente tabla:

```
Producción (Código de parte, Descripción de parte, Fecha,
No. de operador, nombre del operador y cantidad producida en Línea 1 Turno 1,
No. de operador, nombre del operador y cantidad producida en Línea 1 Turno 2,
No. de operador, nombre del operador y cantidad producida en Línea 1 Turno 3,
No. de operador, nombre del operador y cantidad producida en Línea 2 Turno 1,
No. de operador, nombre del operador y cantidad producida en Línea 2 Turno 2,
No. de operador, nombre del operador y cantidad producida en Línea 2 Turno 3,
No. de operador, nombre del operador y cantidad producida en Línea 3 Turno 1,
No. de operador, nombre del operador y cantidad producida en Línea 3 Turno 2,
No. de operador, nombre del operador y cantidad producida en Línea 3 Turno 3)
```

#### Procedimiento

**FN1**
Separacion de columnas que garantizen su unicidad.

```
Produccion(Codigo de parte, Descripcion de parte, Fecha, No Operador, Nombre Operador, Cantidad Producida, Linea, Turno)
```

**FN2**
Unicamente a traves de la union

```
Produccion(Codigo de parte, Descripcion de parte, Fecha, No Operador, Nombre Operador, Cantidad Producida, Linea, Turno)
PK -> Codigo de parte, fecha, No Operador, Cantidad Producida, Linea, Turno
```

**FN3**
Presentacion de dos opciones.

```
Parte(codigo, descripcion)
PK->codigo

Operador(numero, nombre)
PK->numero

Produccion(codigo, numero, fecha, cantidad, linea, turno)

---------------------------

Parte(codigo, descripcion)
PK->codigo

Operador(numero, nombre)
PK->numero

Fabrica(idLugarTiempo, linea, turno)
PK->idLugarTiempo

Produccion(codigo, numero, idLugarTiempo, fecha, cantidad)
```

---

### Ejercicio No. 3

Una empresa de telefonía maneja la facturación de sus servicios con la siguiente tabla:

```
Facturación (Nombre del cliente y  Dirección , Fecha y  Hora, Duración,
Número de teléfono de origen, Entidad federativa de origen, Ciudad de origen,
Número de teléfono de destino, Entidad federativa de destino, Ciudad de destino,
Tarifa por minuto entre ciudad de origen y ciudad de destino,
Fecha de inicio del período de facturación,
Fecha final del período de facturación)
```

#### Procedimiento

**FN1**

Separacion de las columnas para asegurar su unicidad.

```
Facturacion(nombre cliente, direccion, datetime, duracion, tel_origen, EF_origin, ciudad_origen, tel_destino, EF_destino, ciudad_destino, tarifa_origin, tarifa_destino, fecha_inicio, fecha_final)
```

**FN2**

Creacion de la llave primaria a traves del uso de varios datos con el fin de garantizar su unicidad

```
Facturacion(nombre cliente, direccion, datetime, duracion, tel_origen, EF_origin, ciudad_origen, tel_destino, EF_destino, ciudad_destino, tarifa_origin, tarifa_destino, fecha_inicio, fecha_final)
PK->nombre cliente, datetime, duracion, tel_origen, tel_destino
```

**FN3**

Descomposicion de dos formas de lograr eliminar las dependencias transitivas.

```
Cliente(id_cliente, nombre, direccion, fecha_inicio, fecha_final)
PK->id_cliente

PuntoPartida(id_punto ,telefono, nombre_entidad, nombre_ciudad, tarifa_ciudad)
PK->id_punto

Servicio(id_servicio, id_cliente, id_origen (id_punto), id_destino(id_punto), duracion, datetime)
PK->id_servicio

----------------------------

Cliente(id_cliente, nombre, direccion, id_facturacion)
PK->id_cliente

Facturacion(id_facturacion, fecha_inicio, fecha_final)
PK->id_facturacion | fecha_inicio, fecha_final

EntidadFederativa(id_entidad, nombre)
PK->id_entidad

Ciudad(id_ciudad, id_entidad ,nombre)
PK-> id_ciudad

Tarifas(id_tarifa, id_ciudad, id_ciudad, tarifa, duracion, datetime, id_cliente, telefono)
PK->id_tarifa
```
