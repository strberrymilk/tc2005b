/* 
Película (título, año, duración, encolor, presupuesto, nomestudio, idproductor)
Elenco (título, año, nombre, sueldo)
Actor (nombre, dirección, telefono, fechanacimiento, sexo)
Productor (idproductor, nombre, dirección, teléfono)
Estudio (nomestudio, dirección)
*/

/* 1. El ingreso total recibido por cada actor, sin importar en cuantas películas haya participado. */

SELECT nombre, SUM(sueldo) AS 'Ingresos totales'
FROM Elenco
GROUP BY Nombre
ORDER BY SUM(sueldo) DESC;

/* 2. El monto total destinado a películas por cada Estudio Cinematográfico, durante la década de los 80's. */

SELECT nomestudio, SUM(presupuesto) as 'Monto total'
FROM Película
WHERE año BETWEEN 1980 AND 1989
GROUP BY nomestudio
ORDER BY SUM(presupuesto) DESC;

/* 3. Nombre y sueldo promedio de los actores (sólo hombres) que reciben en promedio un pago superior a 5 millones de dolares por película. */

SELECT nombre, AVG(sueldo) as 'Sueldo promedio'
FROM Elenco, Actor
WHERE Elenco.nombre = Actor.nombre AND Actor.sexo = 'M'
GROUP BY Actor.nombre
HAVING AVG(sueldo) > 5000000
ORDER BY AVG(sueldo) DESC;

/* 4. Título y año de producción de las películas con menor presupuesto. */

SELECT título, año, MIN(presupuesto) AS 'Presupuesto mínimo'
FROM Película AS P
GROUP BY título
ORDER BY MIN(presupuesto) DESC;

/* 5. Mostrar el sueldo de la actriz mejor pagada. */

SELECT MAX(sueldo) AS 'Mejor sueldo femenino'
FROM Elenco E, Actor A
WHERE E.nombre = A.nombre AND A.sexo = 'F';