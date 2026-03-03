const express = require('express');
const router = express.Router();

const html_header = `
<!DOCTYPE html>
<html data-theme="matroot">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Material</title>
    <link href="/css/output.css" rel="stylesheet">
</head>
<body>
    <div class="navbar bg-base-100 shadow-sm">
        <div class="navbar-start">
            <div class="dropdown">
                <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
                    </svg>
                </div>
                <ul tabindex="-1" class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                    <li><a>Inicio</a></li>
                    <li>
                        <a>Material</a>
                        <ul class="p-2">
                            <li><a>Matroot</a></li>
                            <li><a>Recomendados</a></li>
                        </ul>
                    </li>
                    <li><a>Blogs</a></li>
                </ul>
            </div>
            <a class="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <div class="navbar-center hidden lg:flex">
            <ul class="menu menu-horizontal px-1">
                <li><a>Inicio</a></li>
                <li>
                    <details>
                        <summary>Material</summary>
                        <ul class="p-2 bg-base-100 w-40 z-[1]">
                            <li><a>Matroot original</a></li>
                            <li><a>Recomendado</a></li>
                        </ul>
                    </details>
                </li>
                <li><a>Blogs</a></li>
            </ul>
        </div>
        <div class="navbar-end">
            <a class="btn">Iniciar sesión</a>
        </div>
    </div>
`;

const html_footer = `
    <footer class="footer sm:footer-horizontal bg-base-300 text-base-content p-10">
        <nav>
            <h6 class="footer-title">Services</h6>
            <a class="link link-hover">Branding</a>
            <a class="link link-hover">Design</a>
            <a class="link link-hover">Marketing</a>
            <a class="link link-hover">Advertisement</a>
        </nav>
        <nav>
            <h6 class="footer-title">Company</h6>
            <a class="link link-hover">About us</a>
            <a class="link link-hover">Contact</a>
            <a class="link link-hover">Jobs</a>
            <a class="link link-hover">Press kit</a>
        </nav>
        <nav>
            <h6 class="footer-title">Social</h6>
            <div class="grid grid-flow-col gap-4">
                <a>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-current">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                    </svg>
                </a>
                <a>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-current">
                        <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                    </svg>
                </a>
                <a>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="fill-current">
                        <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                    </svg>
                </a>
            </div>
        </nav>
    </footer>
</body>
</html>
`;

const html_material = `
<div>
    <h1 class="text-3xl font-bold mb-6">Material</h1>
</div>
`;

const html_matroot_original = `
    <div class="container mx-auto p-8">
        <h1 class="text-3xl font-bold mb-6">Galería de Cards con Wrap</h1>
        <div class="flex flex-wrap gap-6 justify-start">
            <div class="card bg-base-100 w-72 shadow-md">
                <figure>
                    <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Shoes" />
                </figure>
                <div class="card-body">
                    <h2 class="card-title">Card 1</h2>
                    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                    <div class="card-actions justify-end">
                        <button class="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
            
            <div class="card bg-base-100 w-72 shadow-md">
                <figure>
                    <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Shoes" />
                </figure>
                <div class="card-body">
                    <h2 class="card-title">Card 2</h2>
                    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                    <div class="card-actions justify-end">
                        <button class="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
            
            <div class="card bg-base-100 w-72 shadow-md">
                <figure>
                    <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Shoes" />
                </figure>
                <div class="card-body">
                    <h2 class="card-title">Card 3</h2>
                    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                    <div class="card-actions justify-end">
                        <button class="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
            
            <div class="card bg-base-100 w-72 shadow-md">
                <figure>
                    <img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp" alt="Shoes" />
                </figure>
                <div class="card-body">
                    <h2 class="card-title">Card 4</h2>
                    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                    <div class="card-actions justify-end">
                        <button class="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;

const html_recomendados = `
    <div class="container mx-auto p-8">
        <h1 class="text-3xl font-bold mb-6">Recursos Recomendados</h1>
        
        <div class="card w-full bg-base-200 shadow-md mb-4">
            <div class="card-body">
                <h2 class="card-title">Recurso 1</h2>
                <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                <div class="card-actions justify-end">
                    <button class="btn btn-primary">Ver Más</button>
                </div>
            </div>
        </div>
        
        <div class="card w-full bg-base-200 shadow-md mb-4">
            <div class="card-body">
                <h2 class="card-title">Recurso 2</h2>
                <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                <div class="card-actions justify-end">
                    <button class="btn btn-primary">Ver Más</button>
                </div>
            </div>
        </div>
        
        <div class="card w-full bg-base-200 shadow-md mb-4">
            <div class="card-body">
                <h2 class="card-title">Recurso 3</h2>
                <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
                <div class="card-actions justify-end">
                    <button class="btn btn-primary">Ver Más</button>
                </div>
            </div>
        </div>
    </div>
`;

// Middlewares: funciones que se ejecutan antes de llegar a la ruta
router.use((request, response, next) => {
    console.log(`Accediendo a: /material${request.url}`);
    next();
});

// Ruta principal del módulo material: /material/
router.get('/', (request, response, next) => {
    response.send(html_header + html_material + html_footer);
});

// Segunda ruta del módulo: /material/matroot-original
router.get('/matroot-original', (request, response, next) => {
    response.send(html_header + html_matroot_original + html_footer);
});

// Tercera ruta del módulo: /material/recomendados
router.get('/recomendados', (request, response, next) => {
    response.send(html_header + html_recomendados + html_footer);
});

module.exports = router;