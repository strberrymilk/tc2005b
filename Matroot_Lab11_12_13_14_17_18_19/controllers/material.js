// Importa el modelo de material
const Material = require('../models/material');

// Controlador para mostrar todos los materiales
exports.getMaterial = (request, response, next) => {
    Material.fetchAll()
        .then(([rows]) => {
            response.render('pages/material', {
                material: rows,
                csrfToken: request.csrfToken(),
                isLoggedIn: request.session.isLoggedIn || false,
                username: request.session.username || '',
                privilegios: request.session.privilegios || []
            });
        })
        .catch(err => {
            console.log(err);
            response.status(500).render('pages/error404');
        });
};

// Controlador para mostrar material original del equipo
exports.getMaterialOriginal = (request, response, next) => {
    Material.fetchAll()
        .then(([rows]) => {
            response.render('pages/material_o', {
                material: rows,
                csrfToken: request.csrfToken(),
                isLoggedIn: request.session.isLoggedIn || false,
                username: request.session.username || '',
                privilegios: request.session.privilegios || []
            });
        })
        .catch(err => {
            console.log(err);
            response.status(500).render('pages/error404');
        });
};

// Controlador para mostrar material recomendado
exports.getMaterialRecomendado = (request, response, next) => {
    Material.fetchAll()
        .then(([rows]) => {
            response.render('pages/material_r', {
                material: rows,
                csrfToken: request.csrfToken(),
                isLoggedIn: request.session.isLoggedIn || false,
                username: request.session.username || '',
                privilegios: request.session.privilegios || []
            });
        })
        .catch(err => {
            console.log(err);
            response.status(500).render('pages/error404');
        });
};

// Controlador para mostrar un material específico por ID
exports.getMaterialById = (request, response, next) => {
    const id = request.params.id;
    
    Material.findById(id)
        .then(([rows]) => {
            if (rows.length === 0) {
                return response.status(404).render('pages/error404');
            }
            response.render('pages/material-detail', {
                material: rows[0],
                csrfToken: request.csrfToken(),
                isLoggedIn: request.session.isLoggedIn || false,
                username: request.session.username || '',
                privilegios: request.session.privilegios || []
            });
        })
        .catch(err => {
            console.log(err);
            response.status(500).render('pages/error404');
        });
};

// Controlador para crear nuevo material
exports.postMaterial = (request, response, next) => {
    console.log('=== POST MATERIAL ===');
    console.log('Body recibido:', request.body);
    
    const { title, description, pdf_link, image_link } = request.body;
    
    // Validación básica
    if (!title || !description || !pdf_link) {
        console.log('Error: Faltan campos requeridos');
        console.log('title:', title);
        console.log('description:', description);
        console.log('pdf_link:', pdf_link);
        return response.status(400).send('Error: Faltan campos requeridos (título, descripción o link del PDF)');
    }
    
    // Crear material sin id_user (será null en la BD)
    const nuevoMaterial = new Material(
        title.trim(), 
        description.trim(), 
        pdf_link.trim(), 
        image_link ? image_link.trim() : null
    );
    
    console.log('Intentando guardar material:', nuevoMaterial);
    
    nuevoMaterial.save()
        .then(() => {
            console.log('Material guardado exitosamente');
            // Redirigir a la página de materiales después de crear
            response.redirect('/material/matroot-original');
        })
        .catch(err => {
            console.error('Error al guardar material:', err);
            response.status(500).send(`Error al guardar el material: ${err.message}`);
        });
};
