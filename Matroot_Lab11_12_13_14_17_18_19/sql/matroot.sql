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

DROP TRIGGER IF EXISTS `trg_material_bi_validar`;
DROP TRIGGER IF EXISTS `trg_material_bu_validar`;
DROP TRIGGER IF EXISTS `trg_material_ai_auditar`;
DROP TRIGGER IF EXISTS `trg_material_au_auditar`;
DROP TRIGGER IF EXISTS `trg_material_ad_auditar`;

DROP PROCEDURE IF EXISTS `sp_obtener_materiales`;
DROP PROCEDURE IF EXISTS `sp_obtener_material_por_id`;
DROP PROCEDURE IF EXISTS `sp_buscar_materiales`;
DROP PROCEDURE IF EXISTS `sp_crear_material`;
DROP PROCEDURE IF EXISTS `sp_actualizar_material`;
DROP PROCEDURE IF EXISTS `sp_eliminar_material`;
DROP PROCEDURE IF EXISTS `sp_registrar_usuario_con_rol`;

DROP TABLE IF EXISTS `material_audit`;
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
  PRIMARY KEY (`id_user`),
  UNIQUE KEY `users_email_unique` (`email`),
  UNIQUE KEY `users_username_unique` (`username`)
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
  PRIMARY KEY (`id_material`),
  KEY `material_id_user_idx` (`id_user`),
  CONSTRAINT `material_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
-- Tabla: material_audit
-- Bitacora generada automaticamente por triggers
-- --------------------------------------------------------

CREATE TABLE `material_audit` (
  `id_audit` int(11) NOT NULL AUTO_INCREMENT,
  `id_material` int(11) DEFAULT NULL,
  `accion` enum('INSERT','UPDATE','DELETE') NOT NULL,
  `id_user_actor` int(11) DEFAULT NULL,
  `detalle` varchar(500) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id_audit`),
  KEY `material_audit_id_material_idx` (`id_material`),
  KEY `material_audit_id_user_actor_idx` (`id_user_actor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------
-- Lab 23: Stored Procedures
-- --------------------------------------------------------

DELIMITER //

CREATE PROCEDURE `sp_obtener_materiales`()
BEGIN
  SELECT
    m.`id_material`,
    m.`title`,
    m.`description`,
    m.`pdf_link`,
    m.`image_link`,
    m.`id_user`,
    u.`username` AS `autor`,
    m.`created_at`
  FROM `material` m
  LEFT JOIN `users` u ON u.`id_user` = m.`id_user`
  ORDER BY m.`created_at` DESC, m.`id_material` DESC;
END//

CREATE PROCEDURE `sp_obtener_material_por_id`(
  IN p_id_material int
)
BEGIN
  SELECT
    m.`id_material`,
    m.`title`,
    m.`description`,
    m.`pdf_link`,
    m.`image_link`,
    m.`id_user`,
    u.`username` AS `autor`,
    m.`created_at`
  FROM `material` m
  LEFT JOIN `users` u ON u.`id_user` = m.`id_user`
  WHERE m.`id_material` = p_id_material;
END//

CREATE PROCEDURE `sp_buscar_materiales`(
  IN p_busqueda varchar(200)
)
BEGIN
  SELECT
    m.`id_material`,
    m.`title`,
    m.`description`,
    m.`pdf_link`,
    m.`image_link`,
    m.`id_user`,
    u.`username` AS `autor`,
    m.`created_at`
  FROM `material` m
  LEFT JOIN `users` u ON u.`id_user` = m.`id_user`
  WHERE m.`title` LIKE CONCAT('%', p_busqueda, '%')
     OR m.`description` LIKE CONCAT('%', p_busqueda, '%')
  ORDER BY m.`created_at` DESC, m.`id_material` DESC;
END//

CREATE PROCEDURE `sp_crear_material`(
  IN p_title varchar(200),
  IN p_description varchar(200),
  IN p_pdf_link varchar(1000),
  IN p_image_link varchar(200),
  IN p_id_user int
)
BEGIN
  INSERT INTO `material` (`title`, `description`, `pdf_link`, `image_link`, `id_user`)
  VALUES (p_title, p_description, p_pdf_link, p_image_link, p_id_user);

  SELECT LAST_INSERT_ID() AS `id_material`;
END//

CREATE PROCEDURE `sp_actualizar_material`(
  IN p_id_material int,
  IN p_title varchar(200),
  IN p_description varchar(200),
  IN p_pdf_link varchar(1000),
  IN p_image_link varchar(200)
)
BEGIN
  UPDATE `material`
  SET
    `title` = p_title,
    `description` = p_description,
    `pdf_link` = p_pdf_link,
    `image_link` = p_image_link
  WHERE `id_material` = p_id_material;

  SELECT ROW_COUNT() AS `affected_rows`;
END//

CREATE PROCEDURE `sp_eliminar_material`(
  IN p_id_material int
)
BEGIN
  DELETE FROM `material`
  WHERE `id_material` = p_id_material;

  SELECT ROW_COUNT() AS `affected_rows`;
END//

-- --------------------------------------------------------
-- Lab 25: Transaccion en Stored Procedure
-- Crea el usuario y su rol como una sola unidad ACID.
-- --------------------------------------------------------

CREATE PROCEDURE `sp_registrar_usuario_con_rol`(
  IN p_username varchar(50),
  IN p_email varchar(50),
  IN p_password varchar(300),
  IN p_name varchar(300),
  IN p_lastname_1 varchar(300),
  IN p_lastname_2 varchar(300),
  IN p_bio varchar(200),
  IN p_id_rol int
)
BEGIN
  DECLARE v_id_user int;

  DECLARE EXIT HANDLER FOR SQLEXCEPTION
  BEGIN
    ROLLBACK;
    RESIGNAL;
  END;

  START TRANSACTION;

  IF EXISTS (SELECT 1 FROM `users` WHERE `email` = p_email) THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'El correo ya esta registrado';
  END IF;

  INSERT INTO `users` (`username`, `email`, `password`, `name`, `lastname_1`, `lastname_2`, `bio`)
  VALUES (p_username, p_email, p_password, p_name, p_lastname_1, p_lastname_2, p_bio);

  SET v_id_user = LAST_INSERT_ID();

  INSERT INTO `tiene` (`id_user`, `id_rol`)
  VALUES (v_id_user, p_id_rol);

  COMMIT;

  SELECT v_id_user AS `id_user`;
END//

-- --------------------------------------------------------
-- Lab 28: Triggers
-- Validacion de reglas de negocio y bitacora de materiales.
-- --------------------------------------------------------

CREATE TRIGGER `trg_material_bi_validar`
BEFORE INSERT ON `material`
FOR EACH ROW
BEGIN
  SET NEW.`title` = TRIM(COALESCE(NEW.`title`, ''));
  SET NEW.`description` = TRIM(COALESCE(NEW.`description`, ''));
  SET NEW.`pdf_link` = TRIM(COALESCE(NEW.`pdf_link`, ''));

  IF NEW.`image_link` IS NOT NULL AND TRIM(NEW.`image_link`) = '' THEN
    SET NEW.`image_link` = NULL;
  END IF;

  IF NEW.`title` = '' OR NEW.`description` = '' OR NEW.`pdf_link` = '' THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'Titulo, descripcion y PDF son obligatorios';
  END IF;

  IF NEW.`pdf_link` NOT REGEXP '^https?://' THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'El PDF debe ser una URL http o https';
  END IF;

  IF NEW.`image_link` IS NOT NULL AND NEW.`image_link` NOT REGEXP '^https?://' THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'La imagen debe ser una URL http o https';
  END IF;
END//

CREATE TRIGGER `trg_material_bu_validar`
BEFORE UPDATE ON `material`
FOR EACH ROW
BEGIN
  SET NEW.`title` = TRIM(COALESCE(NEW.`title`, ''));
  SET NEW.`description` = TRIM(COALESCE(NEW.`description`, ''));
  SET NEW.`pdf_link` = TRIM(COALESCE(NEW.`pdf_link`, ''));

  IF NEW.`image_link` IS NOT NULL AND TRIM(NEW.`image_link`) = '' THEN
    SET NEW.`image_link` = NULL;
  END IF;

  IF NEW.`title` = '' OR NEW.`description` = '' OR NEW.`pdf_link` = '' THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'Titulo, descripcion y PDF son obligatorios';
  END IF;

  IF NEW.`pdf_link` NOT REGEXP '^https?://' THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'El PDF debe ser una URL http o https';
  END IF;

  IF NEW.`image_link` IS NOT NULL AND NEW.`image_link` NOT REGEXP '^https?://' THEN
    SIGNAL SQLSTATE '45000'
      SET MESSAGE_TEXT = 'La imagen debe ser una URL http o https';
  END IF;
END//

CREATE TRIGGER `trg_material_ai_auditar`
AFTER INSERT ON `material`
FOR EACH ROW
BEGIN
  INSERT INTO `material_audit` (`id_material`, `accion`, `id_user_actor`, `detalle`)
  VALUES (NEW.`id_material`, 'INSERT', NEW.`id_user`, CONCAT('Material creado: ', NEW.`title`));
END//

CREATE TRIGGER `trg_material_au_auditar`
AFTER UPDATE ON `material`
FOR EACH ROW
BEGIN
  INSERT INTO `material_audit` (`id_material`, `accion`, `id_user_actor`, `detalle`)
  VALUES (NEW.`id_material`, 'UPDATE', NEW.`id_user`, CONCAT('Material actualizado: ', NEW.`title`));
END//

CREATE TRIGGER `trg_material_ad_auditar`
AFTER DELETE ON `material`
FOR EACH ROW
BEGIN
  INSERT INTO `material_audit` (`id_material`, `accion`, `id_user_actor`, `detalle`)
  VALUES (OLD.`id_material`, 'DELETE', OLD.`id_user`, CONCAT('Material eliminado: ', OLD.`title`));
END//

DELIMITER ;

SET FOREIGN_KEY_CHECKS = 1;
COMMIT;
