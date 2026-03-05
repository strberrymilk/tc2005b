const express = require('express');
const router = express.Router();

// Arreglo de usuarios en memoria
const usuarios = [];

// Ruta GET para mostrar la página de login
router.get('/', (request, response) => {
    response.render('pages/login');
});

// Ruta POST para procesar el login
router.post('/', (request, response) => {
});

// Ruta GET para mostrar el formulario de registro
router.get('/registro', (request, response) => {
    response.render('pages/registro');
});

// Ruta POST para procesar el registro y guardar en el arreglo
router.post('/registro', (request, response) => {
    const { nombre, email, password } = request.body;
    
    // Crear el objeto usuario
    const fecha = new Date().toLocaleString('es-MX');
    const nuevoUsuario = {
        nombre: nombre,
        email: email,
        password: password,
        fecha: fecha
    };
    
    // Agregar al arreglo
    usuarios.push(nuevoUsuario);
    
    // Enviar toda la info del usuario y el total de usuarios
    response.render('pages/registro-success', { 
        usuario: nuevoUsuario,
        totalUsuarios: usuarios.length 
    });
});

module.exports = router;