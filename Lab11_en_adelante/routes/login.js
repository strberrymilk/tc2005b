const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const html_login = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Login</title>
    <link href="https://cdn.jsdelivr.net/npm/daisyui@3.7.1/dist/full.css" rel="stylesheet" type="text/css" />
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
    <div class="min-h-screen flex items-center justify-center" style="background-image: url('/images/login_background.jpg'); background-size: cover; background-position: center;">
        <div class="hero-overlay bg-opacity-0 min-h-screen absolute inset-0"></div>
        <div class="card bg-base-100 w-96 shadow-xl z-10">
            <div class="card-body">
                <h2 class="card-title">Iniciar sesión</h2>
                <form action="/login" method="POST">
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Correo electrónico</span>
                        </label>
                        <input type="email" name="email" placeholder="correo@ejemplo.com" class="input input-bordered" required />
                    </div>
                    <div class="form-control mt-4">
                        <label class="label">
                            <span class="label-text">Contraseña</span>
                        </label>
                        <input type="password" name="password" placeholder="Tu contraseña" class="input input-bordered" required />
                    </div>
                    <div class="card-actions justify-center mt-6">
                        <button type="submit" class="btn btn-primary">Iniciar sesión</button>
                    </div>
                </form>
                <div class="divider"></div>
                <div class="text-center">
                    <p class="text-sm">¿No tienes cuenta? <a href="/login/registro" class="link link-primary">Regístrate</a></p>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
`;

const html_registro = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Registro</title>
    <link href="https://cdn.jsdelivr.net/npm/daisyui@3.7.1/dist/full.css" rel="stylesheet" type="text/css" />
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
    <div class="min-h-screen flex items-center justify-center" style="background-image: url('/images/login_background.jpg'); background-size: cover; background-position: center;">
        <div class="hero-overlay bg-opacity-0 min-h-screen absolute inset-0"></div>
        <div class="card bg-base-100 w-96 shadow-xl z-10">
            <div class="card-body">
                <h2 class="card-title">Registrarse</h2>
                <form action="/login/registro" method="POST">
                    <div class="form-control">
                        <label class="label">
                            <span class="label-text">Nombre completo</span>
                        </label>
                        <input type="text" name="nombre" placeholder="Tu nombre" class="input input-bordered" required />
                    </div>
                    <div class="form-control mt-4">
                        <label class="label">
                            <span class="label-text">Correo electrónico</span>
                        </label>
                        <input type="email" name="email" placeholder="correo@ejemplo.com" class="input input-bordered" required />
                    </div>
                    <div class="form-control mt-4">
                        <label class="label">
                            <span class="label-text">Contraseña</span>
                        </label>
                        <input type="password" name="password" placeholder="Tu contraseña" class="input input-bordered" required />
                    </div>
                    <div class="card-actions justify-center mt-6">
                        <button type="submit" class="btn btn-primary">Registrarse</button>
                    </div>
                </form>
                <div class="divider"></div>
                <div class="text-center">
                    <p class="text-sm">¿Ya tienes cuenta? <a href="/login" class="link link-primary">Inicia sesión</a></p>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
`;

// Ruta GET para mostrar la página de login
router.get('/', (request, response) => {
    response.send(html_login);
});

// Ruta POST para procesar el login
router.post('/', (request, response) => {
});

// Ruta GET para mostrar el formulario de registro
router.get('/registro', (request, response) => {
    response.send(html_registro);
});

// Ruta POST para procesar el registro y guardar en archivo
router.post('/registro', (request, response) => {
    const { nombre, email, password } = request.body;
    
    // Crear el texto a guardar
    const fecha = new Date().toLocaleString('es-MX');
    const usuarioTexto = `\n--- Nuevo Usuario ---\nFecha: ${fecha}\nNombre: ${nombre}\nEmail: ${email}\nPassword: ${password}\n`;
    const archivoPath = path.join(__dirname, '..', 'usuarios.txt');
    
    // Guardar en el archivo (append)
    fs.appendFile(archivoPath, usuarioTexto, (err) => {
        if (err) {
            console.error('Error al guardar usuario:', err);
            response.send(`
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <title>Error</title>
                    <link href="https://cdn.jsdelivr.net/npm/daisyui@3.7.1/dist/full.css" rel="stylesheet" type="text/css" />
                    <script src="https://cdn.tailwindcss.com"></script>
                </head>
                <body class="flex items-center justify-center min-h-screen bg-base-200">
                    <div class="card w-96 bg-error text-error-content shadow-xl">
                        <div class="card-body items-center text-center">
                            <h2 class="card-title">Error al registrar</h2>
                            <p>Hubo un problema al guardar tu información.</p>
                            <a href="/login/registro" class="btn mt-4">Intentar de nuevo</a>
                        </div>
                    </div>
                </body>
                </html>
            `);
        } else {
            response.send(`
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="utf-8">
                    <title>Registro Exitoso</title>
                    <link href="https://cdn.jsdelivr.net/npm/daisyui@3.7.1/dist/full.css" rel="stylesheet" type="text/css" />
                    <script src="https://cdn.tailwindcss.com"></script>
                </head>
                <body class="flex items-center justify-center min-h-screen bg-base-200">
                    <div class="card w-96 bg-success text-success-content shadow-xl">
                        <div class="card-body items-center text-center">
                            <h2 class="card-title">¡Registro exitoso!</h2>
                            <p>Bienvenido, ${nombre}</p>
                            <div class="flex gap-2 mt-4">
                                <a href="/login" class="btn">Iniciar sesión</a>
                                <a href="/" class="btn btn-ghost">Ir al inicio</a>
                            </div>
                        </div>
                    </div>
                </body>
                </html>
            `);
        }
    });
});

module.exports = router;