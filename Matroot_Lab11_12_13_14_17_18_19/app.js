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
// Middleware para parsear JSON
app.use(bodyParser.json());

// ===========================================================================================================

// Multer debe registrarse ANTES de csrfProtection para que req.body esté disponible
// en formularios multipart/form-data cuando CSRF lo valide.

const multer = require('multer');

//fileStorage: Es nuestra constante de configuración para manejar el almacenamiento
const fileStorage = multer.diskStorage({
    destination: (request, file, callback) => {
        // Guardamos en public/uploads para poder servir el archivo vía HTTP
        callback(null, path.join(__dirname, 'public', 'uploads'));
    },
    filename: (request, file, callback) => {
        // Date.now() devuelve ms desde epoch: único y sin caracteres ilegales en Windows
        callback(null, Date.now() + '-' + file.originalname);
    },
});

//En el registro, pasamos la constante de configuración y
//usamos single porque es un sólo archivo el que vamos a subir, 
//pero hay diferentes opciones si se quieren subir varios archivos. 
//'archivo' es el nombre del input tipo file de la forma
app.use(multer({ storage: fileStorage }).single('archivo'));

// ===========================================================================================================

const session = require('express-session');
app.use(session({
    secret: 'mi string secreto que debe ser un string aleatorio muy largo, no como éste', 
    resave: false, // La sesión no se guardará en cada petición, sino sólo se guardará si algo cambió 
    saveUninitialized: false, // Asegura que no se guarde una sesión para una petición que no lo necesita
}));

// Protección CSRF — debe ir DESPUÉS de multer
const csrf = require('csurf');
const csrfProtection = csrf();
app.use(csrfProtection);

// Sirve archivos estáticos desde la carpeta public
// Join sirve para armar la ruta. Tiene la ventaja de que considera el sistema operativo donde el código resida 
app.use(express.static(path.join(__dirname, 'public')));
// Sirve archivos subidos vía multer
app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

// Ruta explícita para el favicon con cabecera correcta
// TODO: actualizar
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

const rutasLogin = require('./routes/login');
app.use('/login', rutasLogin);

// Ruta principal. "get" es un método similar a "use", pero solo responde a solicitudes GET
app.get('/', (request, response) => {
    response.render('pages/home', {
        csrfToken: request.csrfToken(),
        isLoggedIn: request.session.isLoggedIn || false,
        username: request.session.username || '',
        privilegios: request.session.privilegios || []
    });
});

// ===========================================================================================================

// Middleware para manejar errores 500 (debe ir ANTES del 404 y recibir 4 argumentos)
app.use((error, request, response, next) => { // eslint-disable-line no-unused-vars
    console.error(error);
    response.status(500).render('pages/error404'); // reutilizamos la vista de error
});

// Middleware para manejar errores 404
app.use((request, response, next) => { // eslint-disable-line no-unused-vars
    response.status(404).render('pages/error404');
});

// Inicia el servidor en el puerto 3000
app.listen(3000);