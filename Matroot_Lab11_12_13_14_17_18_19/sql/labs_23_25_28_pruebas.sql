-- Pruebas para Labs 23, 25 y 28.
-- Ejecutar despues de importar sql/matroot.sql en la base matroot.

USE `matroot`;

-- Lab 23: Stored procedures para materiales.
CALL `sp_crear_material`(
  'Lab 23 - Procedimientos almacenados',
  'Ejemplo creado desde un stored procedure.',
  'https://example.com/lab23.pdf',
  'https://example.com/lab23.png',
  1
);

SET @material_demo_id := LAST_INSERT_ID();

CALL `sp_obtener_materiales`();
CALL `sp_obtener_material_por_id`(@material_demo_id);
CALL `sp_buscar_materiales`('procedimientos');

CALL `sp_actualizar_material`(
  @material_demo_id,
  'Lab 23 - SP actualizado',
  'Actualizacion para probar el trigger AFTER UPDATE.',
  'https://example.com/lab23-actualizado.pdf',
  'https://example.com/lab23-actualizado.png'
);

-- Lab 25: Transaccion usuario + rol.
SET @lab25_suffix := UNIX_TIMESTAMP();
SET @lab25_username := CONCAT('lab25_', @lab25_suffix);
SET @lab25_email := CONCAT('lab25_', @lab25_suffix, '@example.com');

CALL `sp_registrar_usuario_con_rol`(
  @lab25_username,
  @lab25_email,
  '$2b$12$hash_de_prueba_para_laboratorio',
  'Usuario',
  'Lab',
  'Veinticinco',
  'Usuario creado dentro de una transaccion.',
  2
);

SELECT u.`id_user`, u.`username`, u.`email`, r.`rol`
FROM `users` u
INNER JOIN `tiene` t ON t.`id_user` = u.`id_user`
INNER JOIN `roles` r ON r.`id` = t.`id_rol`
WHERE u.`email` = @lab25_email;

-- Para comprobar rollback, ejecuta manualmente el mismo CALL anterior
-- con el mismo correo. Debe fallar y no debe quedar un usuario sin rol.

-- Lab 28: Triggers de auditoria.
SELECT *
FROM `material_audit`
WHERE `id_material` = @material_demo_id
ORDER BY `created_at`, `id_audit`;

-- Para comprobar el trigger de validacion, ejecuta manualmente:
-- CALL `sp_crear_material`('PDF invalido', 'Debe fallar', 'ftp://example.com/a.pdf', NULL, 1);
