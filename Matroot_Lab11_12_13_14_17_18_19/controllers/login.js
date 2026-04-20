// Importa el modelo de usuario
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');

// Exports es un objeto que se utiliza para exportar funciones o variables desde un módulo. 
// Se escribe junto con el nombre de la función que se está creando

// Controlador para mostrar el formulario de login
exports.getLogin = (request, response, next) => {
    // Renderiza la vista login.ejs ubicada en views/pages/
    response.render('pages/login', {
        csrfToken: request.csrfToken(),
        isLoggedIn: request.session.isLoggedIn || false,
        username: request.session.username || ''
    });
};

exports.postLogin = (request, response, next) => {
    const { email, password } = request.body;
    
    let usuario;
    
    // Buscar el usuario por email
    Usuario.findByEmail(email)
        .then(([rows]) => {
            if (rows.length === 0) {
                // Usuario no encontrado
                throw new Error('USER_NOT_FOUND');
            }
            
            usuario = rows[0];
            
            // Comparar la contraseña con bcrypt
            return bcrypt.compare(password, usuario.password);
        })
        .then((doMatch) => {
            if (!doMatch) {
                // Contraseña incorrecta
                throw new Error('WRONG_PASSWORD');
            }
            
            // Contraseña correcta - obtener privilegios
            return Usuario.getPrivilegios(usuario.id_user);
        })
        .then(([privilegios, fieldData]) => {
            // Guardar sesión con privilegios
            request.session.isLoggedIn = true;
            request.session.username = usuario.username;
            request.session.userId = usuario.id_user;
            request.session.email = usuario.email;
            request.session.privilegios = privilegios;
            
            console.log('Login exitoso - username:', request.session.username);
            
            // Guardar la sesión explícitamente
            return new Promise((resolve, reject) => {
                request.session.save((err) => {
                    if (err) {
                        console.log('Error al guardar sesión en login:', err);
                        reject(err);
                    } else {
                        console.log('Sesión de login guardada exitosamente');
                        resolve();
                    }
                });
            });
        })
        .then(() => {
            // Redirigir al home después de login exitoso
            console.log('Redirigiendo al home con username:', request.session.username);
            response.redirect('/');
        })
        .catch((err) => {
            console.log(err);
            if (err.message === 'USER_NOT_FOUND' || err.message === 'WRONG_PASSWORD') {
                response.status(401).render('pages/login', {
                    csrfToken: request.csrfToken(),
                    isLoggedIn: false,
                    username: '',
                    error: 'Correo electrónico o contraseña incorrectos'
                });
            } else {
                response.status(500).render('pages/login', {
                    csrfToken: request.csrfToken(),
                    isLoggedIn: false,
                    username: '',
                    error: 'Error al iniciar sesión. Por favor, intenta de nuevo.'
                });
            }
        });
};

// Controlador para mostrar el formulario de registro
exports.getRegistro = (request, response, next) => {
    // Renderiza la vista registro.ejs ubicada en views/pages/
    response.render('pages/registro', {
        csrfToken: request.csrfToken(),
        isLoggedIn: request.session.isLoggedIn || false,
        username: request.session.username || ''
    });
};

// Controlador para procesar el registro
exports.postRegistro = (request, response, next) => {

    // Desestructuración para obtener los valores del formulario.
    // request.body es un objeto que contiene los datos enviados en el cuerpo de la solicitud POST del formulario. 
    const { username, email, password, password_confirm, name, lastname_1, lastname_2, bio } = request.body;
    
    // Validar que las contraseñas coincidan
    if (password !== password_confirm) {
        return response.status(400).render('pages/registro', {
            csrfToken: request.csrfToken(),
            isLoggedIn: request.session.isLoggedIn || false,
            username: request.session.username || '',
            error: 'Las contraseñas no coinciden'
        });
    }
    
    // Validar que el usuario no exista
    Usuario.findByEmail(email)
        .then(([rows]) => {
            if (rows.length > 0) {
                // El usuario ya existe
                return response.status(400).render('pages/registro', {
                    csrfToken: request.csrfToken(),
                    isLoggedIn: request.session.isLoggedIn || false,
                    username: request.session.username || '',
                    error: 'El correo electrónico ya está registrado'
                });
            }
            
            // Crear un objeto de nuestro modelo
            const nuevoUsuario = new Usuario(username, email, password, name, lastname_1, lastname_2, bio);
            
            // Guardar el usuario y manejar la respuesta con promesas
            return nuevoUsuario.save()
                .then(() => {
                    // Buscar el usuario recién creado para obtener su ID
                    return Usuario.findByEmail(email);
                })
                .then(([rows]) => {
                    if (rows.length > 0) {
                        const usuario = rows[0];
                        // Asignar rol 'usuario' automáticamente y cargar privilegios
                        return Usuario.asignarRol(usuario.id_user)
                            .then(() => Usuario.getPrivilegios(usuario.id_user))
                            .then(([privilegios]) => ({ usuario, privilegios }));
                    }
                    return { usuario: null, privilegios: [] };
                })
                .then(({ usuario, privilegios }) => {
                    if (usuario) {
                        // Guardar información en la sesión con privilegios
                        request.session.isLoggedIn = true;
                        request.session.username = usuario.username;
                        request.session.userId = usuario.id_user;
                        request.session.email = usuario.email;
                        request.session.privilegios = privilegios;
                
                        console.log('Sesión guardada con username:', request.session.username);
                        
                        // Guardar la sesión explícitamente
                        return new Promise((resolve, reject) => {
                            request.session.save((err) => {
                                if (err) {
                                    console.log('Error al guardar sesión:', err);
                                    reject(err);
                                } else {
                                    console.log('Sesión guardada exitosamente');
                                    resolve();
                                }
                            });
                        });
                    }
                    return Promise.resolve();
                })
                .then(() => {
                    // Recuperar todos los usuarios para obtener el total
                    return Usuario.fetchAll();
                })
                .then(([rows]) => {
                    // Renderizar la vista de éxito con variables
                    console.log('Renderizando con username:', request.session.username);
                    response.render('pages/registro-success', { 
                        csrfToken: request.csrfToken(),
                        isLoggedIn: request.session.isLoggedIn || false,
                        username: request.session.username || '',
                        usuario: {
                            username: username,
                            email: email,
                            name: name,
                            lastname_1: lastname_1,
                            lastname_2: lastname_2,
                            bio: bio,
                            fecha: new Date().toLocaleString('es-MX')
                        },
                        totalUsuarios: rows.length
                    });
                })
                .catch(err => {
                    console.log(err);
                    response.status(500).render('pages/registro-error', {
                        csrfToken: request.csrfToken(),
                        isLoggedIn: request.session.isLoggedIn || false,
                        error: 'Error al registrar el usuario. Por favor, intenta de nuevo.'
                    });
                });
        })
        .catch(err => {
            console.log(err);
            response.status(500).render('pages/registro-error', {
                csrfToken: request.csrfToken(),
                isLoggedIn: request.session.isLoggedIn || false,
                error: 'Error al registrar el usuario. Por favor, intenta de nuevo.'
            });
        });
};

exports.getLogout = (request, response, next) => { // eslint-disable-line
    request.session.destroy(() => {
        response.redirect('/login'); // Este código se ejecuta cuando la sesión se elimina.
    });
};