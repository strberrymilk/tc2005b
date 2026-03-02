const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((request, response) => {
    
    // RUTA 1: Página principal
    if (request.url == "/" && request.method == "GET") {
        response.setHeader('Content-Type', 'text/html');
        fs.readFile('index.html', 'utf8', (err, data) => {
            if (err) {
                response.write('Error al leer index.html');
            } else {
                response.write(data);
            }
            response.end();
        });
    } 
    // RUTA 2: About
    else if (request.url == "/about" && request.method == "GET") {
        response.setHeader('Content-Type', 'text/html');
        fs.readFile('about.html', 'utf8', (err, data) => {
            if (err) {
                response.write('Error al leer about.html');
            } else {
                response.write(data);
            }
            response.end();
        });
    } 
    // RUTA 3: Ver mensajes
    else if (request.url == "/api/mensajes" && request.method == "GET") {
        response.setHeader('Content-Type', 'text/html');
        
        fs.readFile('mensajes.txt', 'utf8', (err, mensajes) => {
            let contenidoMensajes = '';
            
            if (err) {
                contenidoMensajes = '<div class="alert alert-info">No hay mensajes guardados aún.</div>';
            } else {
                const lineas = mensajes.trim().split('\n');
                contenidoMensajes = '<div class="row">';
                for (let i = 0; i < lineas.length; i++) {
                    if (lineas[i].trim()) {
                        contenidoMensajes += `
                            <div class="col-md-6 mb-3">
                                <div class="card">
                                    <div class="card-body">
                                        <h6 class="card-subtitle mb-2 text-muted">Mensaje #${i + 1}</h6>
                                        <p class="card-text">${lineas[i]}</p>
                                    </div>
                                </div>
                            </div>
                        `;
                    }
                }
                contenidoMensajes += '</div>';
            }
            
            fs.readFile('mensajes.html', 'utf8', (err, html) => {
                if (err) {
                    response.write('Error al leer mensajes.html');
                } else {
                    const htmlFinal = html.replace('<div id="mensajes-container">', `<div id="mensajes-container">${contenidoMensajes}`);
                    response.write(htmlFinal);
                }
                response.end();
            });
        });
    } 
    // POST del formulario
    else if (request.url == "/submit-form" && request.method == "POST") {
        const datos_completos = [];
        
        request.on('data', (data) => {
            datos_completos.push(data);
        });

        request.on('end', () => {
            const string_datos_completos = Buffer.concat(datos_completos).toString();
            console.log(string_datos_completos);
            
            const params = new URLSearchParams(string_datos_completos);
            const nombre = params.get('name') || '';
            const email = params.get('email') || '';
            const mensaje = params.get('message') || '';
            
            const fecha = new Date().toLocaleString('es-MX');
            const textoGuardar = `[${fecha}] Nombre: ${nombre}, Email: ${email}, Mensaje: ${mensaje}\n`;
            
            fs.appendFile('mensajes.txt', textoGuardar, (err) => {
                response.setHeader('Content-Type', 'text/html');
                
                if (err) {
                    response.write('<h1>Error al guardar el mensaje</h1>');
                    response.end();
                } else {
                    fs.readFile('success.html', 'utf8', (err, html) => {
                        if (err) {
                            response.write('Mensaje guardado correctamente');
                        } else {
                            const detalles = `
                                <p class="mb-1"><strong>Nombre:</strong> ${nombre}</p>
                                <p class="mb-1"><strong>Email:</strong> ${email}</p>
                                <p class="mb-1"><strong>Mensaje:</strong> ${mensaje}</p>
                            `;
                            const htmlFinal = html.replace('<div id="mensaje-detalles">', `<div id="mensaje-detalles">${detalles}`);
                            response.write(htmlFinal);
                        }
                        response.end();
                    });
                }
            });
        });
    }
    // Archivos estáticos (CSS, JS, imágenes)
    else if (request.method == "GET") {
        const filePath = path.join(__dirname, decodeURIComponent(request.url));
        const extension = path.extname(filePath);
        
        fs.readFile(filePath, (err, data) => {
            if (err) {
                // ERROR 404
                response.setHeader('Content-Type', 'text/html');
                fs.readFile('404.html', 'utf8', (err, html) => {
                    if (err) {
                        response.write('404 - Página no encontrada');
                    } else {
                        const htmlFinal = html.replace('<code id="ruta-solicitada"></code>', `<code id="ruta-solicitada">${request.url}</code>`);
                        response.write(htmlFinal);
                    }
                    response.end();
                });
            } else {
                // Servir archivo
                if (extension == '.css') {
                    response.setHeader('Content-Type', 'text/css');
                } else if (extension == '.js') {
                    response.setHeader('Content-Type', 'text/javascript');
                } else if (extension == '.png' || extension == '.jpg' || extension == '.jpeg') {
                    response.setHeader('Content-Type', 'image/' + extension.substring(1));
                }
                
                response.write(data);
                response.end();
            }
        });
    } 
    // Otros métodos
    else {
        response.setHeader('Content-Type', 'text/html');
        fs.readFile('404.html', 'utf8', (err, html) => {
            if (err) {
                response.write('404 - Página no encontrada');
            } else {
                const htmlFinal = html.replace('<code id="ruta-solicitada"></code>', `<code id="ruta-solicitada">${request.url}</code>`);
                response.write(htmlFinal);
            }
            response.end();
        });
    }
});

server.listen(3000);
