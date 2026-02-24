/*
// consola (log, info, warn, error, assert)
console.log("hola gamers!");
console.info("Esto es unformación");
console.warn("Esto es una advertencia");
console.error("Esto es un error");

//Compara valores
console.assert(1 == true);

//Compara valor y tipo de dato
console.assert(1 === true);

//-------------- variables, constantes -------------

// Forma antigua de declarar variables, no se recomienda
var videojuego_1 = "Minecraft";

// Forma moderna de declarar variables:
let videojuego_2 = "Halo";

//Constantes:
const precio = 55;


// Alcance de las variables
{
    var minecraft = "5 estrellas";
    let halo = "4 estrellas";
}

//la variable manicraft sigue viviendo fuera del ámbito en el que fue declarada
console.log(minecraft);

//la línea lanza un error porque la variable halo, murió al terminar el ámbito en el que fue declarada
//console.log(halo);


//---------------------------------- alert, prompt, confirm
alert("Hola gamers!");

const favorito = prompt("¿Cuál es tu videojuego favorito?");

console.log("Tu juego favortio es: " + favorito);

const ganas_jugar = confirm("¿Tienes ganas de jugar?");

if (ganas_jugar) {
    console.log("¡A jugar!");
} else {
    console.log("¡A comer!");
}


//---------------------- funciones tradicionales
function is_precio() {
    return precio;
}

console.log(is_precio());


// funciones modernas
() => {}

const vidas = () => {
    console.log("Te quedan 3 vidas");
}

vidas();


//------------------------ arreglos
const videojuegos = ["Minecraft"];

const jugadores = new Array(); 

videojuegos.push("Doom");
videojuegos[10] = "Zelda";

//arreglos asociativos
videojuegos["nintendo"] = "Mario Bros"

for (let i = 0; i < videojuegos.length; i++) {
    console.log(videojuegos[i]);
}

//recorridos alternativos del arreglo
for(let juego in videojuegos) {
    console.log(juego);
}


//------------------- Objetos
const objeto = {}; 

const videojuego = {
    nombre: "Minecraft",
    genero: "sandbox",
    plataforma: ["pc", "nintendo", "xbox", "playstation", "mobile"],
}

console.log(videojuego.nombre);


//-------------- modificar html
*/

/*
//Visualizar el DOM(Document Object Model) en la consola
//console.log(document);

const videojuego = {
    nombre: "Halo",
    imagen: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/976730/header.jpg?t=1740682623",
    descripcion: `Halo es una aclamada franquicia de videojuegos de disparos en primera persona (FPS) 
        de ciencia ficción, creada por Bungie y desarrollada actualmente por 343 Industries para 
        Xbox y PC, centrada en el supersoldado Jefe Maestro y su IA, Cortana.`,
    genero: ["Shooter"],
}

const halo = document.getElementById("halo");

console.log(halo);

const mostrar_descripcion = () => {
    halo.innerHTML = `<p class='is-size-3'>${videojuego.nombre}</p>
        <p>${videojuego.descripcion}</p>
        <span class="tag">${videojuego.genero[0]}</span>
        `;
    halo.onclick = mostrar_imagen;
}

const mostrar_imagen = () => {
    halo.innerHTML = 
        `<figure class="image">
            <img class="is-rounded" src="${videojuego.imagen}}" />
        </figure>`;
    halo.onclick = mostrar_descripcion;
}

mostrar_imagen();

halo.onclick = mostrar_descripcion;
*/

/*
console.log("holi");

const fileSystem = require('fs');
fileSystem.writeFileSync('holi.txt', 'holi');

const http = require('http');
const server = http.createServer((request, response) => {
    console.log(request.url);
    response.end();
});

const arreglo=[5000,60,90,100,10,20,1000,0,120,200,340,10000,50];
for(let item of arreglo){
    setTimeout(()=>{
        console.log(item);
    },item);
}

const http = require('http');

const server = http.createServer((request,response) =>{
    //console.log(request);
    //console.log(request.url);
    response.end()
});

server.listen(3000);
*/

/*

const http = require('http');

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

const html_index = `
    <a href="/new"><button class="button is-primary">Nuevo videojuego</button></a>
    <div class="columns">
        <div class="column">
            <div id="halo"></div>
        </div>
        <div class="column">
            Minecraft
            <figure class="image">
                <img class="is-rounded" src="https://store-images.s-microsoft.com/image/apps.58378.13850085746326678.826cc014-d610-46af-bdb3-c5c96be4d22c.64287a91-c69e-4723-bb61-03fecd348c2a?q=90&w=480&h=270" />
            </figure>
        </div>
        <div class="column">
            <li>Cyberpunk</li>
            <li>Doom</li>
            <li>Gears of war</li>
        </div>
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

const html_form = `
    <form>
        <div class="field">
            <label for="nombre" class="label">Nombre</label>
            <div class="control">
                <input id="nombre" class="input" type="text" placeholder="e.g Minecraft">
            </div>
        </div>

        <div class="field">
            <label for="imagen" class="label">Imagen</label>
            <div class="control">
                <input id="imagen" class="input" type="text" placeholder="e.g. https://store-images.s-microsoft.com/image/apps.58378.13850085746326678.826cc014-d610-46af-bdb3-c5c96be4d22c.64287a91-c69e-4723-bb61-03fecd348c2a?q=90&w=480&h=270">
            </div>
        </div>

        <input class="button is-primary" type="submit" value="Guardar">
    </form>
`;

const server = http.createServer((request, response) => {

    if (request.url == "/") {
        response.setHeader('Content-Type', 'text/html');
        response.write(html_header + html_index + html_footer);
        response.end();
    } else if (request.url == "/new") {
        response.setHeader('Content-Type', 'text/html');
        response.write(html_header + html_form + html_footer);
        response.end();
    } else {
        response.setHeader('Content-Type', 'text/html');
        response.write(html_header + "Error 404" + html_footer);
        response.end();
    }

    // request.on('data', (data) => {
    //     console.log(data);
    //     datos_completos.push(data);
    // });

    // request.on('end', () => {
    //     const string_datos_completos = Buffer.concat(datos_completos).toString();
    //     console.log(string_datos_completos);
    // });
});

server.listen(3000);
*/