// Carga módulo Express 
const express = require('express');

// Crea un router para manejar las rutas del módulo login
const router = express.Router();

// Importar el controlador
const loginController = require('../controllers/login');

// Rutas GET y POST para login
// router.get('/', loginController.getLogin);
// router.post('/', loginController.postLogin);

// Rutas GET y POST para registro
router.get('/registro', loginController.getRegistro);
router.post('/registro', loginController.postRegistro);

// Exporta el router para que pueda ser utilizado en app.js
module.exports = router;