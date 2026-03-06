const Usuario = require('../models/usuario');

// Controlador para mostrar la página de login
exports.getLogin = (request, response, next) => {
    response.render('pages/login');
};

// Controlador para procesar el login
exports.postLogin = (request, response, next) => {
    // Lógica de autenticación aquí
};

// Controlador para mostrar el formulario de registro
exports.getRegistro = (request, response, next) => {
    response.render('pages/registro');
};

// Controlador para procesar el registro
exports.postRegistro = (request, response, next) => {
    const { nombre, email, password } = request.body;
    
    // Crear un objeto de nuestro modelo
    const nuevoUsuario = new Usuario(nombre, email, password);
    
    // Guardar el usuario
    nuevoUsuario.save();
    
    // Recuperar todos los usuarios para obtener el total
    const todosLosUsuarios = Usuario.fetchAll();
    
    // Renderizar la vista de éxito
    response.render('pages/registro-success', { 
        usuario: {
            nombre: nuevoUsuario.nombre,
            email: nuevoUsuario.email,
            fecha: nuevoUsuario.fecha
        },
        totalUsuarios: todosLosUsuarios.length 
    });
};
