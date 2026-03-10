/* Película(título, año, duración, encolor, presupuesto, nomestudio, idproductor)
Elenco(título, año, nombre, sueldo)
Actor(nombre, dirección, telefono, fechanacimiento, sexo)
Productor(idproductor, nombre, dirección, teléfono)
Estudio(nomestudio, dirección)*/

/* 1.- Actrices de “Las brujas de Salem”. */

SELECT nombre
FROM Elenco E, Actor A
WHERE E.nombre = A.nombre
AND A.sexo = 'F' AND E.titulo = 'Las Brujas de Salem';

SELECT nombre
FROM Elenco
WHERE titulo = 'Las Brujas de Salem'
AND nombre IN (SELECT nombre
               FROM actor
               WHERE sexo = 'F');

/* 2.- Nombres de los actores que aparecen en películas producidas por MGM en 1995. */

SELECT nombre
FROM Elenco E
JOIN Película Pe ON E.titulo = Pe.titulo AND E.año = Pe.año
WHERE Pe.año = 1995 AND Pe.nomestudio = 'MGM';

SELECT nombre
FROM Elenco E
WHERE año = 1995 AND titulo IN (SELECT titulo
                                FROM pelicula Pe
                                WHERE nomestudio = 'MGM');

/* 3.- Películas que duran más que “Lo que el viento se llevó” (de 1939). */

SELECT titulo FROM Pelicula
WHERE duracion > (SELECT duracion
                  FROM Pelicula
                  WHERE titulo = 'Lo que el viento se llevó'
                  AND año = 1939);


/* 4.- Productores que han hecho más películas que George Lucas. */

SELECT Pr.nombre, COUNT(Pr.idproductor)
FROM Productor Pr
JOIN Película Pe ON Pr.idproductor = Pe.idproductor
GROUP BY Pr.nombre
HAVING COUNT(Pr.idproductor) > (SELECT COUNT(idproductor)
    						    FROM Película Pe 
    						    JOIN Productor Pr ON Pe.idproductor = Pr.idproductor
    						    WHERE Pr.nombre = 'George Lucas');

/* 5.- Nombres de los productores de las películas en las que ha aparecido Sharon Stone. */

SELECT Pr.nombre
FROM Productor Pr
INNER JOIN Película P ON Pr.idproductor = P.idproductor
INNER JOIN Elenco E ON P.titulo = E.titulo AND P.año = E.año
WHERE E.nombre = 'Sharon Stone';

SELECT Pr.nombre
FROM Productor Pr
INNER JOIN Película Pe ON Pr.idproductor = Pe.idproductor
WHERE Pe.titulo IN(
    SELECT E.titulo
    FROM Elenco E
    WHERE E.nombre = 'Sharon Stone');

/* 6.- Título de las películas que han sido filmadas más de una vez */

SELECT titulo, COUNT(titulo) AS 'Películas filmadas más de una vez'
FROM Película
GROUP BY titulo
HAVING COUNT(titulo) > 1;