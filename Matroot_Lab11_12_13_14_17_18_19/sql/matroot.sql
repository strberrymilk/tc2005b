-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 10-03-2026 a las 17:03:08
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
-- Base de datos: `matroot`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `material`
--

CREATE TABLE `material` (
  `id_material` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `description` varchar(200) NOT NULL,
  `pdf_link` varchar(50) NOT NULL,
  `id_user` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `image_link` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `material`
--

INSERT INTO `material` (`id_material`, `title`, `description`, `pdf_link`, `id_user`, `created_at`, `image_link`) VALUES
(1, 'Prueba', 'Hola', 'https://drive.google.com/file/d/1kYKaNPEWti7QqEIvK', NULL, '2026-03-09 04:45:42', 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhy7xDKspiYUTHlKLwp0LwN0YGVSXXhitLN1Q3Y_clYFqM9sLu8SFdEhyphenhyphensUmEnnxSiYqoljVJ0rZFD8S-VJq5bn4C1n8NMLXivwS_Nduka4K_MA9auvpq5J1Rx9IvbnDj0ER'),
(2, 'Prueba 2', 'Adiós', 'https://drive.google.com/file/d/1kYKaNPEWti7QqEIvK', NULL, '2026-03-09 04:49:20', 'https://blog.guaw.com/wp-content/uploads/2024/01/raza_gatos_bombay_negro-1-1024x366.jpg'),
(3, 'Prueba 3', 'Saludos', 'https://drive.google.com/file/d/1kYKaNPEWti7QqEIvK', NULL, '2026-03-09 04:52:29', 'https://www.imagui.com/i/fotofrontera-adoran-gatitos-15-wallpapers-154200.webp');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `otorga`
--

CREATE TABLE `otorga` (
  `id_rol` int(11) NOT NULL,
  `id_privilegio` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `otorga`
--

INSERT INTO `otorga` (`id_rol`, `id_privilegio`, `created_at`) VALUES
(1, 1, '2026-03-10 15:47:05'),
(1, 2, '2026-03-10 15:47:05'),
(1, 3, '2026-03-10 16:30:05'),
(2, 1, '2026-03-10 15:47:16');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `privilegios`
--

CREATE TABLE `privilegios` (
  `id` int(11) NOT NULL,
  `privilegio` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `privilegios`
--

INSERT INTO `privilegios` (`id`, `privilegio`, `created_at`) VALUES
(1, 'ver_materiales', '2026-03-10 15:45:56'),
(2, 'crear_materiales', '2026-03-10 15:45:56'),
(3, 'actualizar_materiales', '2026-03-10 16:29:41');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `rol` varchar(100) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `rol`, `created_at`) VALUES
(1, 'administrador', '2026-03-10 15:45:23'),
(2, 'usuario', '2026-03-10 15:45:23');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tiene`
--

CREATE TABLE `tiene` (
  `id_user` int(11) NOT NULL,
  `id_rol` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tiene`
--

INSERT INTO `tiene` (`id_user`, `id_rol`, `created_at`) VALUES
(11, 1, '2026-03-10 15:46:32'),
(12, 2, '2026-03-10 15:46:32'),
(13, 2, '2026-03-10 16:30:27');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(300) NOT NULL,
  `name` varchar(300) NOT NULL,
  `lastname_1` varchar(300) NOT NULL,
  `lastname_2` varchar(300) NOT NULL,
  `bio` varchar(200) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id_user`, `email`, `username`, `password`, `name`, `lastname_1`, `lastname_2`, `bio`, `created_at`) VALUES
(11, 'camypowerr@gmail.com', 'AnaCamila', '$2b$12$/KLO0uWhJ2HIIgxtwx4bWOjgRAt7/0aUXI70PE25rM6bEuQG3fV6q', 'Ana Camila', 'Cuevas', 'González', 'Hola! Soy Camila y me encanta la combinatoria.', '2026-03-09 18:05:54'),
(12, 'camypowerr@gmail.com', 'strberrymilk', '$2b$12$RvCL2CM7un.DinxJWdJtmuKC8.UGp4eRLSVshW4NMp.SY8KpxXnra', 'Ana Camila', 'Cuevas', 'González', 'Hola', '2026-03-09 18:08:58'),
(13, 'cami_cue@hotmail.com', 'prueba', '$2b$12$8HhEZbfYqbobUnAhL2VnPusBBtmsm8KYqnBA/dBqB0fblHVOBfVsG', 'Ana Camila', 'Cuevas', 'González', 'Saludos', '2026-03-09 18:13:02'),
(14, 'A01412609@tec.mx', 'prueba2', '$2b$12$Jx9qTapI1eG9Ani02AJgT.RMfmFgg6kjrGC1U2bxvUV8yn.wsUAAC', 'Ana Camila', 'Cuevas', 'González', 'Saludos', '2026-03-09 18:14:21');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `material`
--
ALTER TABLE `material`
  ADD PRIMARY KEY (`id_material`);

--
-- Indices de la tabla `otorga`
--
ALTER TABLE `otorga`
  ADD PRIMARY KEY (`id_rol`,`id_privilegio`),
  ADD KEY `id_privilegio` (`id_privilegio`);

--
-- Indices de la tabla `privilegios`
--
ALTER TABLE `privilegios`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tiene`
--
ALTER TABLE `tiene`
  ADD PRIMARY KEY (`id_user`,`id_rol`),
  ADD KEY `id_rol` (`id_rol`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `material`
--
ALTER TABLE `material`
  MODIFY `id_material` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `privilegios`
--
ALTER TABLE `privilegios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `otorga`
--
ALTER TABLE `otorga`
  ADD CONSTRAINT `otorga_ibfk_2` FOREIGN KEY (`id_privilegio`) REFERENCES `privilegios` (`id`),
  ADD CONSTRAINT `otorga_ibfk_3` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id`);

--
-- Filtros para la tabla `tiene`
--
ALTER TABLE `tiene`
  ADD CONSTRAINT `tiene_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`),
  ADD CONSTRAINT `tiene_ibfk_2` FOREIGN KEY (`id_rol`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
