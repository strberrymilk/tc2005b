const express = require('express');
const router = express.Router();

// Middlewares: funciones que se ejecutan antes de llegar a la ruta
router.use((request, response, next) => {
    console.log(`Accediendo a: /material${request.url}`);
    next();
});

// Ruta principal del módulo material: /material/
router.get('/', (request, response, next) => {
    response.render('pages/material');
});

// Segunda ruta del módulo: /material/matroot-original
router.get('/matroot-original', (request, response, next) => {
    response.render('pages/material_o');
});

// Tercera ruta del módulo: /material/recomendados
router.get('/recomendados', (request, response, next) => {
    response.render('pages/material_r');
});

module.exports = router;