# 🌟 Proyecto Personal: Matroot

> Aplicación web educativa desarrollada con Express.js y EJS

## Labs 23, 25 y 28

La implementacion de stored procedures, transacciones y triggers esta documentada en `docs/labs_23_25_28.md`.
Las pruebas SQL estan en `sql/labs_23_25_28_pruebas.sql`.

---

## Lab 24: AJAX y JSON

### Que importancia tiene AJAX en el desarrollo de RIA's (Rich Internet Applications)?

AJAX es importante porque permite que una aplicacion web solicite y envie datos al servidor sin recargar toda la pagina. Esto hace que la experiencia sea mas fluida, parecida a una aplicacion de escritorio: se puede buscar, filtrar, guardar o actualizar informacion en partes especificas de la interfaz.

En Matroot se usa esta idea en el buscador de materiales: el usuario escribe una busqueda, el navegador hace una peticion al servidor y la lista se actualiza con los resultados sin volver a cargar toda la vista.

### Que implicaciones de seguridad tiene AJAX?

AJAX no elimina los riesgos de seguridad; solo cambia la forma en que el cliente se comunica con el servidor. Algunas implicaciones importantes son:

- Las rutas AJAX tambien pueden ser atacadas, igual que cualquier ruta normal.
- Un usuario puede modificar las peticiones desde el navegador o herramientas como Postman.
- Puede haber riesgo de SQL Injection si el servidor arma consultas con texto recibido del cliente.
- Puede haber riesgo de XSS si se inserta HTML generado con datos no confiables.
- Se debe proteger contra CSRF cuando la peticion modifica datos.

Las validaciones de seguridad deben hacerse siempre del lado del servidor, porque el cliente puede ser manipulado. Las validaciones del lado del cliente ayudan a mejorar la experiencia del usuario, pero no deben considerarse una barrera de seguridad real.

### Que es JSON?

JSON (JavaScript Object Notation) es un formato ligero para representar e intercambiar datos. Usa una estructura basada en pares llave-valor y arreglos, por lo que es facil de leer para personas y facil de procesar para programas.

Ejemplo:

```json
{
  "id_material": 1,
  "title": "Combinatoria basica",
  "tags": ["matematicas", "conteo", "practica"]
}
```

En aplicaciones web es comun usar JSON para enviar respuestas desde el servidor hacia JavaScript en el navegador.

---

## Lab 26: Servicios Web de Terceros

### Que ventajas y desventajas tiene la integracion de tus aplicaciones web con servicios web desarrollados por terceros?

Integrar servicios web de terceros permite agregar funcionalidades sin construir todo desde cero. Por ejemplo, una aplicacion puede usar servicios externos para autenticacion, pagos, mapas, almacenamiento, envio de correos, analiticas o inteligencia artificial.

Ventajas:

- Reduce tiempo de desarrollo porque se aprovechan soluciones ya construidas.
- Permite acceder a funcionalidades especializadas que serian costosas de implementar.
- Facilita escalar ciertas partes del sistema usando infraestructura externa.
- Puede mejorar la calidad del producto si el proveedor tiene buena disponibilidad, documentacion y soporte.

Desventajas:

- La aplicacion depende de la disponibilidad y cambios del proveedor externo.
- Puede haber costos variables segun uso, volumen de peticiones o planes de servicio.
- Si la API cambia, se rompe o se vuelve de pago, la aplicacion puede requerir ajustes urgentes.
- Hay implicaciones de privacidad y seguridad al enviar datos fuera del sistema propio.
- Puede aumentar la latencia porque algunas operaciones dependen de llamadas por red.

La integracion es util cuando el beneficio supera la dependencia agregada. Para usarla responsablemente conviene validar errores, proteger llaves de API, revisar permisos, manejar timeouts y tener alternativas si el servicio falla.

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

---

## 📌 Lab 19: Control de Acceso Basado en Roles

### ¿En qué consiste el control de acceso basado en roles?

El **Control de Acceso Basado en Roles (RBAC - Role-Based Access Control)** es un modelo de seguridad que gestiona los permisos de los usuarios agrupándolos en **roles** según su función en la organización. En lugar de asignar permisos individuales a cada usuario, se asignan roles, y cada rol tiene un conjunto predefinido de privilegios.

**Componentes principales:**
- **Usuarios**: Individuos que acceden al sistema
- **Roles**: Funciones o puestos (ej: Administrador, Editor, Usuario)
- **Privilegios/Permisos**: Acciones específicas (ej: crear, leer, actualizar, eliminar)
- **Sesiones**: El usuario activa un rol durante su sesión

**Ejemplo:**
- Un **Administrador** puede: crear, editar, eliminar y ver materiales
- Un **Usuario Regular** puede: solo ver materiales
- Un **Editor** puede: crear y editar materiales, pero no eliminar

---

### 📊 Sistemas de Control de Acceso: Análisis Comparativo

#### 🟢 Sistema 1: **GitHub (Aplica RBAC)**

**Descripción:**
GitHub utiliza RBAC para gestionar permisos en repositorios y organizaciones. Los roles incluyen:
- **Owner** (Propietario): Control total sobre la organización
- **Member** (Miembro): Acceso básico a repositorios
- **Outside Collaborator**: Acceso limitado a repositorios específicos
- **Read, Write, Maintain, Admin**: Niveles de permisos en repositorios

Cada rol tiene privilegios predefinidos (crear ramas, hacer merge, configurar webhooks, etc.).

**✅ Ventajas:**
- **Escalabilidad**: Fácil agregar nuevos usuarios con roles predefinidos
- **Simplicidad**: No hay que configurar permisos usuario por usuario
- **Auditoría clara**: Se sabe exactamente qué puede hacer cada rol
- **Menos errores**: Roles estandarizados reducen asignaciones incorrectas
- **Separación de responsabilidades**: Cada rol tiene funciones específicas

**❌ Desventajas:**
- **Flexibilidad limitada**: Si un usuario necesita permisos mixtos, puede ser complicado
- **Roles rígidos**: Casos especiales pueden requerir roles adicionales
- **Sobre-privilegios**: A veces se asigna un rol más alto solo por un privilegio específico
- **Complejidad en jerarquías**: Muchos roles pueden confundir a los nuevos usuarios

---

#### 🔴 Sistema 2: **Sistema de Archivos UNIX/Linux (No aplica RBAC - usa DAC)**

**Descripción:**
Linux utiliza **DAC (Discretionary Access Control)** basado en propietarios y permisos. Cada archivo/directorio tiene:
- **Propietario** (owner)
- **Grupo** (group)
- **Otros** (others)

Los permisos se asignan individualmente: `rwx` (lectura, escritura, ejecución) para cada categoría.

**Ejemplo:** `rwxr-xr--`
- Propietario: lectura, escritura, ejecución
- Grupo: lectura, ejecución
- Otros: solo lectura

Los permisos se gestionan directamente en cada recurso (archivo/directorio), no mediante roles centralizados.

**✅ Ventajas:**
- **Granularidad**: Control preciso sobre cada archivo
- **Flexibilidad total**: Cada recurso puede tener permisos únicos
- **Simplicidad conceptual**: Modelo fácil de entender (propietario-grupo-otros)
- **Sin roles predefinidos**: No hay estructura rígida
- **Control descentralizado**: El propietario decide quién accede

**❌ Desventajas:**
- **No escalable**: En sistemas grandes, gestionar permisos archivo por archivo es inmanejable
- **Propenso a errores**: Configuración manual aumenta riesgo de permisos incorrectos
- **Sin auditoría centralizada**: Difícil rastrear quién tiene acceso a qué
- **Duplicación de esfuerzo**: Mismos permisos deben configurarse repetidamente
- **Complejidad en equipos grandes**: Sin roles claros, es difícil coordinar permisos

---

### 📈 Comparación: RBAC vs DAC

| Característica | RBAC (GitHub) | DAC (Linux) |
|----------------|---------------|-------------|
| **Escalabilidad** | ✅ Alta - roles reutilizables | ❌ Baja - configuración individual |
| **Flexibilidad** | ❌ Limitada - roles predefinidos | ✅ Alta - permisos personalizados |
| **Gestión** | ✅ Centralizada y consistente | ❌ Descentralizada y fragmentada |
| **Seguridad** | ✅ Menor riesgo de sobre-privilegios | ❌ Mayor riesgo de configuraciones erróneas |
| **Auditoría** | ✅ Fácil rastrear permisos por rol | ❌ Complejo revisar archivo por archivo |
| **Mantenimiento** | ✅ Cambiar rol afecta a todos | ❌ Actualizar permisos uno por uno |
| **Curva aprendizaje** | Moderada | Baja |
| **Casos especiales** | ❌ Difícil manejar excepciones | ✅ Fácil crear permisos únicos |

**Conclusión:**  
RBAC es ideal para sistemas empresariales con muchos usuarios y recursos (GitHub, AWS, Active Directory), mientras que DAC funciona bien en entornos pequeños o donde se requiere control granular extremo (sistemas de archivos, bases de datos pequeñas).
