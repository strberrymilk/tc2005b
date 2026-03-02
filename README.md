# Personal Project  

## 📌 Lab 11  

### Routes  

The application includes the following routes:

- `/` → Main page  
- `/material` → Main material page  
- `/material/matroot-original` → Material created by Matroot's team  
- `/material/recomendados` → Recommended material created by other authors  
- `/login` → Log in page  
- `/login/registro` → Sign up page  
- `/blogs` → Blogs page  

---

## package.json  

The `package.json` file is the main configuration file of a Node.js project.  
It works as the project's "identity certificate" and contains:

### 1️. Metadata  
Basic project information such as:
- Name  
- Version  
- Description  
- Author  

### 2️. Dependencies  
Libraries required for the application to run in production.

### 3️. DevDependencies  
Tools required only during development (not needed in production).

### 4️. Scripts  
Command shortcuts to run tasks, such as:

```bash
npm start
npm run dev
```

### 5. Entry Point Configuration

Specifies the main file of the application (for example, app.js or index.js).
