/* Arreglo para almacenar usuarios en memoria
const usuarios = []; */

const db = require('./util/database');


module.exports = class Usuario {

    // Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(nombre, email, password) {
        this.nombre = nombre;
        this.email = email;
        this.password = password;
        this.fecha = new Date().toLocaleString('es-MX');
    }

    // Este método servirá para guardar de manera persistente el nuevo objeto.
    save() {
        usuarios.push(this);
    }

    // Este método servirá para devolver los objetos del almacenamiento persistente.
    static fetchAll() {
        db.execute('SELECT * FROM users');
        return usuarios;
    }

}
