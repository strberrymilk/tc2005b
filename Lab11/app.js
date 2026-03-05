// Carga módulo Express 
const express = require('express');

// Crea una aplicación express
const app = express();

// Carga módulo path para manejar rutas de archivos. Por ejemplo, para servir el HTML
const path = require('path');

// Configura EJS como motor de plantillas
app.set('view engine', 'ejs');
// Configura la carpeta de vistas. dirname es la ruta del directorio actual del archivo app.js
app.set('views', path.join(__dirname, 'views'));

// Carga módulo body-parser. Convierte el cuerpo de las solicitudes POST en objetos JavaScript accesibles a través de req.body  
const bodyParser = require('body-parser');
// Middleware que lee el cuerpo de las solicitudes con formato application/x-www-form-urlencoded y lo convierte en un objeto JavaScript. El parámetro extended: false indica que no se permiten objetos anidados en el cuerpo de la solicitud.
app.use(bodyParser.urlencoded({ extended: false }));

// Sirve archivos estáticos desde la carpeta public
// Join sirve para armar la ruta. Tiene la ventaja de que considera el sistema operativo donde el código resida 
app.use(express.static(path.join(__dirname, 'public')));

// Ruta explícita para el favicon con cabecera correcta
app.get('/favicon.ico', (req, res) => {
    res.setHeader('Content-Type', 'image/x-icon');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.sendFile(path.join(__dirname, 'public', 'favicon.ico'));
});

// ===========================================================================================================

// Rutas

// Carga el router de material desde el archivo routes/material.js
const rutasMaterial = require('./routes/material');
// "use" une un router o middleware a una ruta base. En este caso, todas las rutas definidas en rutasMaterial se accederán a través de /material
app.use('/material', rutasMaterial);

const rutasBlogs = require('./routes/blogs');
app.use('/blogs', rutasBlogs);

const rutasLogin = require('./routes/login');
app.use('/login', rutasLogin);

// Ruta principal. "get" es un método similar a "use", pero solo responde a solicitudes GET
app.get('/', (request, response) => {
    response.render('pages/home');
});

// ===========================================================================================================

// Middleware para manejar errores 404
app.use((request, response, next) => {
    response.status(404).render('pages/error404');
});

// Inicia el servidor en el puerto 3000
app.listen(3000);