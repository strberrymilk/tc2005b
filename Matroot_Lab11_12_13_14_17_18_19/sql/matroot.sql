-- Base de datos: `matroot`
-- Versión del servidor: 10.4.32-MariaDB
-- Generación: 19-04-2026

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET FOREIGN_KEY_CHECKS = 0;
START TRANSACTION;
SET time_zone = "+00:00";
SET NAMES utf8mb4;

-- --------------------------------------------------------
-- Eliminar tablas existentes (orden inverso a dependencias)
-- --------------------------------------------------------

DROP TABLE IF EXISTS `tiene`;
DROP TABLE IF EXISTS `otorga`;
DROP TABLE IF EXISTS `material`;
DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `roles`;
DROP TABLE IF EXISTS `privilegios`;

-- --------------------------------------------------------
-- Tabla: privilegios
-- --------------------------------------------------------

CREATE TABLE `privilegios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `privilegio` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `privilegios` (`id`, `privilegio`, `created_at`) VALUES
(1, 'ver_materiales',       '2026-03-10 15:45:56'),
(2, 'crear_materiales',     '2026-03-10 15:45:56'),
(3, 'actualizar_materiales','2026-03-10 15:45:56');

-- --------------------------------------------------------
-- Tabla: roles
-- --------------------------------------------------------

CREATE TABLE `roles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rol` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `roles` (`id`, `rol`, `created_at`) VALUES
(1, 'administrador', '2026-03-10 15:45:23'),
(2, 'usuario',       '2026-03-10 15:45:23');

-- --------------------------------------------------------
-- Tabla: otorga (rol -> privilegio)
-- administrador: ver, crear, actualizar
-- usuario: solo ver
-- --------------------------------------------------------

CREATE TABLE `otorga` (
  `id_rol` int(11) NOT NULL,
  `id_privilegio` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id_rol`, `id_privilegio`),
  KEY `id_privilegio` (`id_privilegio`),
  CONSTRAINT `otorga_ibfk_1` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id`),
  CONSTRAINT `otorga_ibfk_2` FOREIGN KEY (`id_privilegio`) REFERENCES `privilegios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `otorga` (`id_rol`, `id_privilegio`, `created_at`) VALUES
(1, 1, '2026-03-10 15:47:05'),
(1, 2, '2026-03-10 15:47:05'),
(1, 3, '2026-03-10 15:47:05'),
(2, 1, '2026-03-10 15:47:16');

-- --------------------------------------------------------
-- Tabla: users
-- --------------------------------------------------------

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(300) NOT NULL,
  `name` varchar(300) NOT NULL,
  `lastname_1` varchar(300) NOT NULL,
  `lastname_2` varchar(300) NOT NULL,
  `bio` varchar(200) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `users` (`id_user`, `email`, `username`, `password`, `name`, `lastname_1`, `lastname_2`, `bio`, `created_at`) VALUES
(1, 'camypowerr@gmail.com', 'strberrymilk', '$2b$12$HknsJ70pIdrruwNICcjYyOtUMJ5zygdrZbq0RyIMztbQpQr3/8ueK', 'Ana Camila', 'Cuevas', 'González', 'Hola! Soy Camila y me encanta la combinatoria.', '2026-03-09 18:08:58');

-- --------------------------------------------------------
-- Tabla: tiene (user -> rol)
-- --------------------------------------------------------

CREATE TABLE `tiene` (
  `id_user` int(11) NOT NULL,
  `id_rol` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id_user`, `id_rol`),
  KEY `id_rol` (`id_rol`),
  CONSTRAINT `tiene_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`),
  CONSTRAINT `tiene_ibfk_2` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `tiene` (`id_user`, `id_rol`, `created_at`) VALUES
(1, 1, '2026-03-10 15:46:32');

-- --------------------------------------------------------
-- Tabla: material
-- --------------------------------------------------------

CREATE TABLE `material` (
  `id_material` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `description` varchar(200) NOT NULL,
  `pdf_link` varchar(1000) NOT NULL,
  `image_link` varchar(200) DEFAULT NULL,
  `id_user` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id_material`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

SET FOREIGN_KEY_CHECKS = 1;
COMMIT;
