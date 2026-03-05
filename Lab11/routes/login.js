const express = require('express');
const router = express.Router();

// Importar el controlador
const loginController = require('../controllers/login');

// Rutas GET y POST para login
router.get('/', loginController.getLogin);
router.post('/', loginController.postLogin);

// Rutas GET y POST para registro
router.get('/registro', loginController.getRegistro);
router.post('/registro', loginController.postRegistro);

module.exports = router;