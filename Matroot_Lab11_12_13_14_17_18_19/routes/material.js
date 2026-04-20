// Carga módulo Express
const express = require('express');

// Crea un router para manejar las rutas del módulo material
const router = express.Router();

// Importar el controlador
const materialController = require('../controllers/material');

// Importar middleware de autenticación
const isAuth = require('../util/is-auth');
const canView = require('../util/can-view');
const canCreate = require('../util/can-create');

// Ruta principal del módulo material: /material/
router.get('/', isAuth, canView, materialController.getMaterial);

// Segunda ruta del módulo: /material/matroot-original
router.get('/matroot-original', isAuth, canView, materialController.getMaterialOriginal);

// Tercera ruta del módulo: /material/recomendados
router.get('/recomendados', isAuth, canView, materialController.getMaterialRecomendado);

// Ruta POST para crear material (protegida con autenticación)
router.post('/', isAuth, canCreate, materialController.postMaterial);

// Ruta AJAX para buscar materiales (debe ir antes de /:id)
router.get('/buscar/:nombre', isAuth, canView, materialController.getBuscar);

// Ruta para ver detalle de un material específico (debe ir al final)
router.get('/:id', isAuth, canView, materialController.getMaterialById);

// Exporta el router para que pueda ser utilizado en app.js
module.exports = router;