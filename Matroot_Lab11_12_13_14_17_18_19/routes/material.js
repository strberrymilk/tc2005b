// Carga módulo Express
const express = require('express');

// Crea un router para manejar las rutas del módulo material
const router = express.Router();

// Importar el controlador
const materialController = require('../controllers/material');

// Importar middleware de autenticación
const isAuth = require('../util/is-auth');

// Ruta principal del módulo material: /material/
router.get('/', materialController.getMaterial);

// Segunda ruta del módulo: /material/matroot-original
router.get('/matroot-original', materialController.getMaterialOriginal);

// Tercera ruta del módulo: /material/recomendados
router.get('/recomendados', materialController.getMaterialRecomendado);

// Ruta POST para crear material (protegida con autenticación)
router.post('/', isAuth, materialController.postMaterial);

// Ruta para ver detalle de un material específico (debe ir al final)
router.get('/:id', materialController.getMaterialById);

// Exporta el router para que pueda ser utilizado en app.js
module.exports = router;