# 🌟 Proyecto Personal: Matroot

> Aplicación web educativa desarrollada con Express.js y EJS

---

## 📌 Lab 11: Express y Arquitectura MVC

### 🛣️ Rutas de la Aplicación

La aplicación incluye las siguientes rutas distribuidas en múltiples módulos:

| Ruta | Descripción |
|------|-------------|
| `/` | Página principal |
| `/material` | Página principal de material educativo |
| `/material/matroot-original` | Material creado por el equipo de Matroot |
| `/material/recomendados` | Material recomendado de otros autores |
| `/login` | Página de inicio de sesión |
| `/login/registro` | Página de registro de nuevos usuarios |
| `/blogs` | Listado de blogs |
| `/blogs/:id` | Detalle de un blog específico |

### 🔄 Manejo de Errores

- **404:** Página personalizada para rutas no encontradas

---

## 📦 package.json

El archivo `package.json` es el archivo de configuración principal de un proyecto Node.js.  
Funciona como el "certificado de identidad" del proyecto y contiene:

### 1️⃣ Metadatos
Información básica del proyecto:
- **Nombre** del proyecto
- **Versión** actual
- **Descripción** breve
- **Autor** y licencia

### 2️⃣ Dependencias
Librerías necesarias para que la aplicación funcione en producción:
```json
"dependencies": {
  "express": "^5.2.1",
  "ejs": "^4.0.1",
  "body-parser": "^2.2.2"
}
```

### 3️⃣ DevDependencies
Herramientas necesarias solo durante el desarrollo (no se necesitan en producción):
```json
"devDependencies": {
  "nodemon": "^3.1.14",
  "tailwindcss": "^4.2.1"
}
```

### 4️⃣ Scripts
Atajos de comandos para ejecutar tareas:

```bash
npm start        # Inicia el servidor
npm run dev      # Modo desarrollo con nodemon
npm run build:css # Compila CSS con Tailwind
```

### 5️⃣ Configuración del Punto de Entrada

Especifica el archivo principal de la aplicación (por ejemplo, `app.js` o `index.js`):
```json
"main": "app.js"
```

---

## 📌 Lab 12: HTML Dinámico y Motores de Plantillas

### 🎨 Motores de Plantillas en Node.js

Los motores de plantillas permiten generar HTML dinámico de forma sencilla. Algunos de los más populares son:

#### 🟢 **EJS** *(Elegido para este proyecto)*
- Permite incrustar código JavaScript directamente en el HTML usando `<%= %>`
- Sintaxis simple y familiar
- Fácil de aprender
```ejs
<h1><%= titulo %></h1>
<% if (usuario) { %>
  <p>Bienvenido <%= usuario.nombre %></p>
<% } %>
```

#### 🟣 **Pug** *(antes Jade)*
- Sintaxis indentada y minimalista
- Sin etiquetas de cierre
- Código más limpio y compacto
```pug
h1= titulo
if usuario
  p Bienvenido #{usuario.nombre}
```

#### 🟠 **Handlebars**
- Usa doble llaves `{{}}` para variables
- Bloques de control como `if` o `each`
- Muy usado en proyectos front-end
```handlebars
<h1>{{titulo}}</h1>
{{#if usuario}}
  <p>Bienvenido {{usuario.nombre}}</p>
{{/if}}
```

#### 🔵 **Mustache**
- Ligero y simple
- Solo variables y bloques básicos
- Portable a muchos lenguajes

#### 🟡 **Nunjucks**
- Inspirado en Jinja2 de Python
- Permite herencia de plantillas
- Filtros y plantillas complejas

#### ⚪ **Liquid**
- Creado por Shopify
- Sintaxis clara y segura
- Ideal para e-commerce

#### 🟤 **Twig**
- Versión para Node.js del motor Twig de PHP
- Permite herencia de plantillas
- Útil en aplicaciones grandes