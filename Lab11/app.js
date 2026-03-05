// app.js
const express = require('express');
const app = express();
const path = require('path');

// Configurar EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Para poder leer the body de las peticiones POST
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// Servir archivos estáticos desde la carpeta public
app.use(express.static('public'));

// Ruta explícita para el favicon con cabecera correcta
app.get('/favicon.ico', (req, res) => {
    res.setHeader('Content-Type', 'image/x-icon');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.sendFile(path.join(__dirname, 'public', 'favicon.ico'));
});

// Rutas
const rutasMaterial = require('./routes/material');
app.use('/material', rutasMaterial);

const rutasBlogs = require('./routes/blogs');
app.use('/blogs', rutasBlogs);

const rutasLogin = require('./routes/login');
app.use('/login', rutasLogin);

// Ruta principal
app.get('/', (request, response) => {
    response.render('pages/home');
});

// Middleware para manejar errores 404
app.use((request, response, next) => {
    response.status(404).render('pages/error404');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});