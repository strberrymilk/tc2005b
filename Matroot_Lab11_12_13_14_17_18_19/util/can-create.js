module.exports = (request, response, next) => {
    let continuar = true;
    for (let privilegio of request.session.privilegios) {
        if (privilegio.privilegio == 'crear_materiales') {
            next();
            continuar = false;
        }
    }
    if (continuar) {
        request.session.error = "No tienes privilegios para este recurso, el incidente ha sido reportado.";
        return response.redirect('/login');
    }
}