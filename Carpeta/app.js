// npm init: Crea un nuevo proyecto de node.js, creando un archivo package.json
// npm start: Ejecuta el comando definido en el package.json para iniciar la aplicación
// npm install [nombre_paquete]: Instala un nuevo paquete y lo agrega a las dependencias del proyecto
// body-parser: Es un paquete que nos permite parsear el cuerpo de las peticiones HTTP, es decir, extraer la información que se manda en el cuerpo de la petición (por ejemplo, en un formulario).

const express = require('express');
const app = express();

const html_header = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Hello Bulma!</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@1.0.4/css/bulma.min.css">
  </head>
  <body>
  <section class="section">
    <div class="container">
      <h1 class="title">
        Videojuegos
      </h1>
      <p class="subtitle">
        My first website with <strong>Bulma</strong>!
      </p>
`;

const html_footer = `
      </div>
    </section>
  <!--script src="js/comportamientos.js"></script-->
  </body>
</html>  
`;

const html_form = `
<form action="/new" method="POST">
  <div class="field">
    <label for="nombre" class="label">Nombre</label>
    <div class="control">
      <input id="nombre" name="nombre" class="input" type="text" placeholder="e.g Minecraft">
    </div>
  </div>

  <div class="field">
    <label for="imagen" class="label">Imagen</label>
    <div class="control">
      <input id="imagen" name="imagen" class="input" type="text" placeholder="e.g. https://store-images.s-microsoft.com/image/apps.58378.13850085746326678.826cc014-d610-46af-bdb3-c5c96be4d22c.64287a91-c69e-4723-bb61-03fecd348c2a?q=90&w=480&h=270">
    </div>
  </div>

  <input class="button is-primary" type="submit" value="Guardar">
</form>
`;

const videojuegos = [
  {
    nombre: "Minecraft",
    imagen: "https://store-images.s-microsoft.com/image/apps.58378.13850085746326678.826cc014-d610-46af-bdb3-c5c96be4d22c.64287a91-c69e-4723-bb61-03fecd348c2a?q=90&w=480&h=270"
  },
  {
    nombre: "Gears of war",
    imagen: "https://upload.wikimedia.org/wikipedia/en/thumb/8/82/Gears_of_war_cover_art.jpg/250px-Gears_of_war_cover_art.jpg"
  },
];

//Middleware
app.use((request, response, next) => {
    console.log('Middleware!');
    next(); //Le permite a la petición avanzar hacia el siguiente middleware
});

app.use('/new', (request, response, next) => {
    response.send(html_header + html_form + html_footer);
});

app.use((request, response, next) => {
    console.log('Otro middleware!');
    let html_index = `
              <a href="/new"><button class="button is-primary">Nuevo videojuego</button></a>
              <div class="columns">`;

        for (let juego of videojuegos) {
            html_index += `
                <div class="column">
                    ${juego.nombre}
                    <figure class="image">
                        <img class="is-rounded" src="${juego.imagen}" />
                    </figure>
                </div>`;
        }
        
        html_index += `    
              </div>
            </div>
          </section>
          <section class="section">
            <div class="container">
              <div class="columns">
                <div class="column">
                  <h1 class="title">Comandos de git</h1>
                  <ul>
                    <li>git add: Sirve para agregar cambios a la transacción.</li>
                    <li>
                      git commit -m "mensaje en imperativo": Sirve para comprometer 
                      la transacción, es decir, guardar los cambios.
                    </li>
                    <li>git checkout <strong>[nombre_rama]</strong>: Sirve para cambiarse de rama.</li>
                    <li>
                      git checkout -b [nombre_rama]: Sirve para crear una nueva rama y 
                      cambiarse a esa nueva rama.
                    </li>
                    <li>
                      git push: Sirve para sincronizar los cambios desde mi repositorio 
                      hacia el repositorio remoto.
                    </li>
                    <li>
                      git pull: Sirve para sincronizar los cambios del repositorio remoto 
                      hacia mi repositorio.
                    </li>
                  </ul>
                </div>
              </div>  
          `;

    response.send(html_header + html_index + html_footer); //Manda la respuesta
});

app.listen(3000);