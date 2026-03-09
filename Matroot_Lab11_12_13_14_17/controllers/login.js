// Importa el modelo de usuario
const Usuario = require('../models/usuario');

// Exports es un objeto que se utiliza para exportar funciones o variables desde un módulo. 
// Se escribe junto con el nombre de la función que se está creando

// Controlador para mostrar el formulario de login
exports.getLogin = (request, response, next) => {
    // Renderiza la vista login.ejs ubicada en views/pages/
    response.render('pages/login', {
        username: request.session.username || ''
    });
};

// Controlador para procesar el login
exports.postLogin = (request, response, next) => {
    const { email, password } = request.body;
    
    // Buscar usuario por email
    Usuario.findByEmail(email)
        .then(([rows]) => {
            if (rows.length === 0) {
                // Usuario no encontrado
                return response.status(401).render('pages/login', {
                    username: '',
                    error: 'Correo o contraseña incorrectos'
                });
            }
            
            const usuario = rows[0];
            
            // Verificar contraseña (en producción deberías usar bcrypt)
            if (usuario.password !== password) {
                return response.status(401).render('pages/login', {
                    username: '',
                    error: 'Correo o contraseña incorrectos'
                });
            }
            
            // Guardar información en la sesión
            request.session.username = usuario.username;
            request.session.userId = usuario.id_user;
            request.session.email = usuario.email;
            
            // Redirigir a la página principal
            response.redirect('/');
        })
        .catch(err => {
            console.log(err);
            response.status(500).render('pages/login', {
                username: '',
                error: 'Error al procesar el login'
            });
        });
};

// Controlador para cerrar sesión
exports.getLogout = (request, response, next) => {
    request.session.destroy(() => {
        response.redirect('/login');
    });
};

// Controlador para mostrar el formulario de registro
exports.getRegistro = (request, response, next) => {
    // Renderiza la vista registro.ejs ubicada en views/pages/
    response.render('pages/registro', {
        username: request.session.username || ''
    });
};

// Controlador para procesar el registro
exports.postRegistro = (request, response, next) => {

    // Desestructuración para obtener los valores del formulario.
    // request.body es un objeto que contiene los datos enviados en el cuerpo de la solicitud POST del formulario. 
    const { username, email, password, name, lastname_1, lastname_2, bio } = request.body;
    
    // Crear un objeto de nuestro modelo
    const nuevoUsuario = new Usuario(username, email, password, name, lastname_1, lastname_2, bio);
    
    // Guardar el usuario y manejar la respuesta con promesas
    nuevoUsuario.save()
        .then(() => {
            // Recuperar todos los usuarios para obtener el total
            return Usuario.fetchAll();
        })
        .then(([rows]) => {
            // Renderizar la vista de éxito con variables
            response.render('pages/registro-success', { 
                usuario: {
                    username: nuevoUsuario.username,
                    email: nuevoUsuario.email,
                    name: nuevoUsuario.name,
                    lastname_1: nuevoUsuario.lastname_1,
                    lastname_2: nuevoUsuario.lastname_2,
                    bio: nuevoUsuario.bio,
                    fecha: new Date().toLocaleString('es-MX')
                },
                totalUsuarios: rows.length
            });
        })
        .catch(err => {
            console.log(err);
            response.status(500).render('pages/registro-error', {
                error: 'Error al registrar el usuario. Por favor, intenta de nuevo.'
            });
        });
};
