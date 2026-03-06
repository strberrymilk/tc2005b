// Carga módulo Express
const express = require('express');

// Crea un router para manejar las rutas del módulo blogs
const router = express.Router();

// Middlewares: funciones que se ejecutan antes de llegar a la ruta
router.use((request, response, next) => {
    console.log(`Accediendo a: /blogs${request.url}`);
    next();
});

// Ruta principal del módulo blogs: /blogs/
router.get('/', (request, response, next) => {
    // Renderiza la vista blogs.ejs ubicada en views/pages/
    response.render('pages/blogs');
});

// Segunda ruta del módulo: /blogs/blog-1
router.get('/blog-1', (request, response, next) => {
    response.render('pages/blog-detail');
});

// Exporta el router para que pueda ser utilizado en app.js
module.exports = router;