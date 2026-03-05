-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-03-2026 a las 21:14:34
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `lab15-16`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materiales`
--

CREATE TABLE `materiales` (
  `clave` int(11) NOT NULL,
  `descripcion` varchar(40) NOT NULL,
  `precio` float NOT NULL,
  `impuesto` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `materiales`
--

INSERT INTO `materiales` (`clave`, `descripcion`, `precio`, `impuesto`) VALUES
(1000, 'Varilla 3/16', 100, 10),
(1010, 'Varilla 4/32', 115, 11.5),
(1020, 'Varilla 3/17', 130, 13),
(1030, 'Varilla 4/33', 145, 14.5),
(1040, 'Varilla 3/18', 160, 16),
(1050, 'Varilla 4/34', 175, 17.5),
(1060, 'Varilla 3/19', 190, 19),
(1070, 'Varilla 4/35', 205, 20.5),
(1080, 'Ladrillos rojos', 50, 5),
(1090, 'Ladrillos grises', 35, 3.5),
(1100, 'Block', 30, 3),
(1110, 'Megablock', 40, 4),
(1120, 'Sillar rosa', 100, 10),
(1130, 'Sillar gris', 110, 11),
(1140, 'Cantera blanca', 200, 20),
(1150, 'Cantera gris', 1210, 121),
(1160, 'Cantera rosa', 1420, 142),
(1170, 'Cantera amarilla', 230, 23),
(1180, 'Recubrimiento P1001', 200, 20),
(1190, 'Recubrimiento P1010', 220, 22),
(1200, 'Recubrimiento P1019', 240, 24),
(1210, 'Recubrimiento P1028', 250, 25),
(1220, 'Recubrimiento P1037', 280, 28),
(1230, 'Cemento ', 300, 30),
(1240, 'Arena', 200, 20),
(1250, 'Grava', 100, 10),
(1260, 'Gravilla', 90, 9),
(1270, 'Tezontle', 80, 8),
(1280, 'Tepetate', 34, 3.4),
(1290, 'Tubería 3.5', 200, 20),
(1300, 'Tubería 4.3', 210, 21),
(1310, 'Tubería 3.6', 220, 22),
(1320, 'Tubería 4.4', 230, 23),
(1330, 'Tubería 3.7', 240, 24),
(1340, 'Tubería 4.5', 250, 25),
(1350, 'Tubería 3.8', 260, 26),
(1360, 'Pintura C1010', 125, 12.5),
(1370, 'Pintura B1020', 125, 12.5),
(1380, 'Pintura C1011', 725, 72.5),
(1390, 'Pintura B1021', 125, 12.5),
(1400, 'Pintura C1011', 125, 12.5),
(1410, 'Pintura B1021', 125, 12.5),
(1420, 'Pintura C1012', 125, 12.5),
(1430, 'Pintura B1022', 125, 12.5),
(2000, 'Jabón', 125, 12.5);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `materiales`
--
ALTER TABLE `materiales`
  ADD PRIMARY KEY (`clave`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
