// Modelo de material. Aquí se define la clase Material, con sus atributos y métodos
const db = require('../util/database');

const callProcedure = (statement, params = []) => {
    return db.execute(statement, params)
        .then(([rows, fieldData]) => [Array.isArray(rows[0]) ? rows[0] : rows, fieldData]);
};

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
        return callProcedure(
            'CALL sp_crear_material(?, ?, ?, ?, ?)',
            [this.title, this.description, this.pdf_link, this.image_link, this.id_user]
        );
    }

    // Obtener todos los materiales
    static fetchAll() {
        return callProcedure('CALL sp_obtener_materiales()');
    }

    // Obtener material por ID
    static findById(id) {
        return callProcedure('CALL sp_obtener_material_por_id(?)', [id]);
    }

    // Obtener materiales por usuario
    static findByUserId(userId) {
        return db.execute('SELECT * FROM material WHERE id_user = ?', [userId]);
    }

    // Actualizar material
    static update(id, title, description, pdf_link, image_link) {
        return callProcedure(
            'CALL sp_actualizar_material(?, ?, ?, ?, ?)',
            [id, title, description, pdf_link, image_link]
        );
    }

    // Eliminar material
    static delete(id) {
        return callProcedure('CALL sp_eliminar_material(?)', [id]);
    }

    // Buscar materiales por título o descripción
    static buscar(nombre) {
        return callProcedure('CALL sp_buscar_materiales(?)', [nombre]);
    }

}
