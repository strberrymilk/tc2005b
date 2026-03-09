# Laboratorios 11-17

Este proyecto integra los laboratorios 11, 12, 13, 14 y 17 del curso de Construcción de Software.

## Lab 11: Node.js y npm

### ¿Qué es el archivo package.json?

El archivo `package.json` es el archivo de configuración principal de un proyecto Node.js. Contiene:

- **Metadatos del proyecto**: nombre, versión, descripción, autor, licencia
- **Dependencias del proyecto**: librerías necesarias para que la aplicación funcione (dependencies)
- **Dependencias de desarrollo**: herramientas necesarias solo durante el desarrollo (devDependencies)
- **Scripts**: comandos personalizados que se pueden ejecutar con `npm run`
- **Configuración de entrada**: punto de inicio de la aplicación (main)

Es fundamental porque permite que otros desarrolladores puedan instalar todas las dependencias necesarias con un simple `npm install`, garantizando que todos trabajen con las mismas versiones de las librerías.

## Lab 12: Templating Engines

### ¿Qué otros templating engines existen para Node.js?

Además de EJS (que usamos en este proyecto), existen varios templating engines populares para Node.js:

- **Pug (anteriormente Jade)**: Usa una sintaxis minimalista basada en indentación, sin etiquetas de cierre
- **Handlebars**: Basado en Mustache, usa una sintaxis de llaves dobles `{{}}` y es muy popular
- **Nunjucks**: Creado por Mozilla, inspirado en Jinja2 de Python, muy potente y flexible
- **Mustache**: Motor de plantillas logic-less, disponible en múltiples lenguajes
- **Dust.js**: Creado por LinkedIn, optimizado para aplicaciones asíncronas
- **Marko**: Desarrollado por eBay, enfocado en rendimiento
- **Eta**: Motor moderno, muy rápido y ligero

## Lab 13: Arquitectura MVC

### ¿Qué beneficios encuentras en el estilo MVC?

El patrón MVC (Model-View-Controller) ofrece múltiples beneficios:

1. **Separación de responsabilidades**: Cada componente tiene una función específica
   - Modelo: maneja la lógica de datos y la base de datos
   - Vista: presenta la información al usuario
   - Controlador: gestiona la lógica de negocio y coordina entre modelo y vista

2. **Mantenibilidad**: Es más fácil localizar y corregir errores cuando el código está organizado

3. **Escalabilidad**: Se pueden añadir nuevas funcionalidades sin afectar otras partes del código

4. **Reutilización de código**: Los modelos y controladores pueden reutilizarse en diferentes vistas

5. **Trabajo en equipo**: Diferentes desarrolladores pueden trabajar en diferentes capas simultáneamente

6. **Testeo**: Es más sencillo escribir pruebas unitarias para cada componente por separado

### ¿Encuentras alguna desventaja en el estilo arquitectónico MVC?

Sí, el patrón MVC también presenta algunas desventajas:

1. **Complejidad inicial**: Para proyectos pequeños, puede resultar excesivo crear toda la estructura

2. **Curva de aprendizaje**: Los desarrolladores nuevos necesitan tiempo para entender la separación de responsabilidades

3. **Más archivos**: Se crean múltiples archivos incluso para funcionalidades simples, lo que puede dificultar la navegación

4. **Overhead**: Para aplicaciones muy simples, la estructura MVC puede añadir complejidad innecesaria

5. **Rigidez**: En algunos casos, la estricta separación puede dificultar ciertas implementaciones

## Lab 17: SQL y Seguridad

### ¿Qué ventajas tiene escribir el código SQL únicamente en la capa del modelo?

Mantener el código SQL solo en la capa del modelo (Model) ofrece varias ventajas:

1. **Encapsulación**: La lógica de acceso a datos está centralizada en un solo lugar

2. **Mantenibilidad**: Si cambia la estructura de la base de datos, solo se modifican los modelos

3. **Reutilización**: Los métodos del modelo pueden usarse desde diferentes controladores

4. **Seguridad**: Es más fácil implementar validaciones y prevención de SQL injection de forma consistente

5. **Abstracción**: Los controladores no necesitan conocer los detalles de implementación de la base de datos

6. **Testing**: Se pueden probar las consultas SQL de forma aislada

7. **Cambio de base de datos**: Si se decide cambiar de MySQL a PostgreSQL, solo se modifican los modelos

### ¿Qué es SQL injection y cómo se puede prevenir?

**SQL Injection** es una vulnerabilidad de seguridad donde un atacante puede insertar código SQL malicioso en las consultas de la aplicación, permitiéndole:
- Acceder a datos no autorizados
- Modificar o eliminar información
- Ejecutar comandos administrativos en la base de datos
- Comprometer completamente el sistema

**Ejemplo de ataque:**
```javascript
// Código vulnerable:
const query = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;

// Si un atacante ingresa: email = "' OR '1'='1"
// La consulta se convierte en:
// SELECT * FROM users WHERE email = '' OR '1'='1' AND password = ''
// Esto siempre retorna todos los usuarios
```

**Cómo prevenirlo:**

1. **Usar Prepared Statements o Parameterized Queries** (la forma más efectiva):
```javascript
const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
connection.execute(query, [email, password]);
```

2. **Usar un ORM** (Object-Relational Mapping) como Sequelize o TypeORM que manejan esto automáticamente

3. **Validar y sanitizar entradas**: Verificar que los datos cumplan con el formato esperado

4. **Principio de mínimo privilegio**: La cuenta de base de datos de la aplicación solo debe tener los permisos necesarios

5. **Evitar concatenación de strings** para construir consultas SQL

6. **Escapar caracteres especiales** si es absolutamente necesario usar SQL dinámico

En este proyecto usamos prepared statements con el operador `?` en todas nuestras consultas para prevenir SQL injection.
