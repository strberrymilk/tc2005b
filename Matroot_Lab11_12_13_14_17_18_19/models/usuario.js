const db = require('../util/database');
const bcrypt = require('bcrypt');

module.exports = class Usuario {

    // Constructor de la clase. Coincide con la estructura de la tabla users en la BD
    constructor(username, email, password, name, lastname_1, lastname_2, bio) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.name = name;
        this.lastname_1 = lastname_1;
        this.lastname_2 = lastname_2;
        this.bio = bio;
    }

    // Guardar usuario en la base de datos
    save() {
        return bcrypt.hash(this.password, 12)
            .then((password_hash) => 
                db.execute(
                    'INSERT INTO users (username, email, password, name, lastname_1, lastname_2, bio) VALUES (?, ?, ?, ?, ?, ?, ?)',
                    [this.username, this.email, password_hash, this.name, this.lastname_1, this.lastname_2, this.bio]
                )
            )
            .catch((err) => {
                console.log(err);
                throw err;
            });
    }

    // Obtener todos los usuarios
    static fetchAll() {
        return db.execute('SELECT * FROM users');
    }

    // Obtener usuario por ID
    static findById(id) {
        return db.execute('SELECT * FROM users WHERE id_user = ?', [id]);
    }

    // Obtener usuario por email
    static findByEmail(email) {
        return db.execute('SELECT * FROM users WHERE email = ?', [email]);
    }

    // Obtener privilegios de un usuario
    static getPrivilegios(id_user) {
        return db.execute(
            `SELECT privilegio FROM tiene t, roles r, otorga o, privilegios p
            WHERE id_user=? AND t.id_rol=r.id AND r.id=o.id_rol AND id_privilegio=p.id`, 
            [id_user]);
    }

}
