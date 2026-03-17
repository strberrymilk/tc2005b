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

---

## 📌 Lab 13: Patrón MVC

### ¿Qué beneficios encuentras en el estilo MVC?

- **Separación de responsabilidades**: Cada capa tiene una función clara (Modelo=datos, Vista=presentación, Controlador=lógica)
- **Mantenibilidad**: Los cambios en una capa no afectan a las otras
- **Reutilización**: Los modelos y vistas pueden usarse en múltiples lugares
- **Trabajo en equipo**: Permite desarrollo paralelo por diferentes roles
- **Testing**: Cada componente se puede probar independientemente

### ¿Encuentras alguna desventaja en el estilo arquitectónico MVC?

- **Complejidad inicial**: Para proyectos pequeños puede ser excesivo
- **Más código**: Requiere múltiples archivos y carpetas
- **Navegación**: Difícil rastrear el flujo completo entre archivos
- **Curva de aprendizaje**: Puede ser confuso para principiantes

---

## 📌 Lab 17: SQL y Seguridad

### ¿Qué ventajas tiene escribir el código SQL únicamente en la capa del modelo?

- **Centralización**: Todas las queries en un solo lugar, fácil de mantener
- **Reutilización**: Un método como `findByEmail()` se usa en múltiples controladores  
- **Seguridad**: Implementar validaciones y prevención de SQL Injection en un punto
- **Abstracción**: Facilita cambiar de base de datos sin afectar controladores
- **Testing**: Los modelos se pueden probar independientemente

### ¿Qué es SQL Injection y cómo se puede prevenir?

**SQL Injection** es un ataque donde se inyecta código SQL malicioso aprovechando entradas no validadas.

**Ejemplo vulnerable:**
```javascript
// ❌ PELIGROSO
const query = "SELECT * FROM users WHERE email = '" + userEmail + "'";
// Si userEmail = "admin' OR '1'='1" → retorna todos los usuarios
```

**Cómo prevenirlo:**

1. **Consultas parametrizadas** (más importante):
```javascript
// ✅ SEGURO
db.execute('SELECT * FROM users WHERE email = ?', [userEmail]);
```

2. **ORMs**: `User.findOne({ where: { email: userEmail } })`
3. **Validación**: Verificar formato y tipo de datos
4. **Menor privilegio**: Usuario de BD con permisos limitados
5. **Nunca confiar en input del usuario**: Validar siempre en servidor

---

## 📌 Lab 18: Autenticación y Seguridad

### ¿Qué otras formas de autentificación existen?

**1. Autenticación de Dos Factores (2FA)**
- Requiere contraseña + código SMS/app autenticadora
- Ejemplos: Google Authenticator, Authy

**2. OAuth 2.0 / OpenID Connect**
- Login con Google, Facebook, GitHub, Apple
- No almacenas contraseñas, delega al proveedor

**3. JSON Web Tokens (JWT)**
- Tokens encriptados con información del usuario
- Stateless, ideal para APIs

**4. Autenticación Biométrica**
- Huella dactilar (Touch ID)
- Reconocimiento facial (Face ID)
- Iris, voz, retina

**5. Magic Links**
- Envía enlace de un solo uso por email
- Usado por Slack, Medium, Notion

**6. Passkeys / WebAuthn**
- Criptografía de clave pública
- Sin contraseñas, resistente a phishing
- Funciona con Touch ID, Face ID, Windows Hello

**7. Single Sign-On (SSO)**
- Un login para múltiples aplicaciones
- Ejemplo: Google Workspace, Active Directory

**8. Multi-Factor Authentication (MFA)**
- Combina múltiples métodos (contraseña + SMS + biometría)

**9. Certificados Digitales**
- Usado en VPN, IoT, banca

**10. Autenticación Basada en Riesgo**
- Analiza ubicación, dispositivo y comportamiento
- Solicita verificación adicional si detecta anomalías