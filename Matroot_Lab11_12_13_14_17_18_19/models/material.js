// Modelo de material. Aquí se define la clase Material, con sus atributos y métodos
const db = require('../util/database');

module.exports = class Material {

    // Constructor de la clase
    constructor(title, description, pdf_link, image_link = null, id_user = null) {
        this.title = title;
        this.description = description;
        this.pdf_link = pdf_link;
        this.image_link = image_link || null;
        this.id_user = id_user || null; // NULL si no hay usuario logueado
    }

    // Guardar material en la base de datos
    save() {
        return db.execute(
            'INSERT INTO material (title, description, pdf_link, image_link, id_user) VALUES (?, ?, ?, ?, ?)',
            [this.title, this.description, this.pdf_link, this.image_link, this.id_user]
        );
    }

    // Obtener todos los materiales
    static fetchAll() {
        return db.execute('SELECT * FROM material');
    }

    // Obtener material por ID
    static findById(id) {
        return db.execute('SELECT * FROM material WHERE id_material = ?', [id]);
    }

    // Obtener materiales por usuario
    static findByUserId(userId) {
        return db.execute('SELECT * FROM material WHERE id_user = ?', [userId]);
    }

    // Actualizar material
    static update(id, title, description, pdf_link, image_link) {
        return db.execute(
            'UPDATE material SET title = ?, description = ?, pdf_link = ?, image_link = ? WHERE id_material = ?',
            [title, description, pdf_link, image_link, id]
        );
    }

    // Eliminar material
    static delete(id) {
        return db.execute('DELETE FROM material WHERE id_material = ?', [id]);
    }

}