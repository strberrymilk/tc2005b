const db = require('../util/database');

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
        return db.execute(
            'INSERT INTO users (username, email, password, name, lastname_1, lastname_2, bio) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [this.username, this.email, this.password, this.name, this.lastname_1, this.lastname_2, this.bio]
        );
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

}
