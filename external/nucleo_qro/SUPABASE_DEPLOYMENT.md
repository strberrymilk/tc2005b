# Backend, Supabase y despliegue

Esta app usa Supabase Auth para login/signup, Google OAuth, una tabla
`school_requests` para guardar solicitudes de apertura de escuela y un
panel `/admin` para seguimiento y metricas.

## 1. Crear proyecto en Supabase

1. Entra a https://supabase.com/dashboard.
2. Crea un proyecto nuevo.
3. Espera a que termine de aprovisionarse la base de datos.

## 2. Crear tablas, roles y politicas

1. En Supabase, abre **SQL Editor**.
2. Copia todo el contenido de `supabase/schema.sql`.
3. Pegalo y ejecutalo.

Ese SQL crea o actualiza:

- `public.profiles`
- `public.school_requests`
- rol `admin` en `profiles`
- campos de revision en solicitudes
- trigger para crear/actualizar perfil cuando se crea usuario
- RLS para usuarios y permisos de lectura/actualizacion para admin

Si ya habias ejecutado una version anterior del esquema, vuelve a correr
este archivo completo para agregar el rol admin y las columnas nuevas.

## 3. Variables de entorno locales

1. Copia `.env.example` a `.env.local`.
2. En Supabase, ve a **Project Settings > API**.
3. Llena:

```env
NEXT_PUBLIC_SUPABASE_URL=https://TU-PROYECTO.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=TU_PUBLISHABLE_KEY
SUPABASE_SECRET_KEY=TU_SECRET_KEY
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NUCLEO_ADMIN_EMAILS=admin@tudominio.com
```

`NUCLEO_ADMIN_EMAILS` acepta uno o varios correos separados por coma.
Cualquier cuenta creada o iniciada con uno de esos correos entrara al
panel `/admin`.

Si tu proyecto muestra llaves legacy, tambien sirve:

```env
NEXT_PUBLIC_SUPABASE_ANON_KEY=TU_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=TU_SERVICE_ROLE_KEY
```

Nunca subas `.env.local` ni ninguna llave secreta a GitHub.

## 4. Crear el usuario admin

Tienes dos opciones:

1. Configura el correo en `NUCLEO_ADMIN_EMAILS` y crea esa cuenta desde la
   app o desde Supabase Auth.
2. O actualiza manualmente el perfil existente:

```sql
update public.profiles
set role = 'admin'
where email = 'admin@tudominio.com';
```

## 5. Configurar email confirmation

En Supabase:

1. Ve a **Authentication > Email Templates**.
2. Abre **Confirm signup**.
3. Cambia el link de confirmacion para que use:

```html
<a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email">
  Confirmar correo
</a>
```

## 6. Configurar URLs de Auth

En Supabase:

1. Ve a **Authentication > URL Configuration**.
2. En **Site URL** pon:

```text
http://localhost:3000
```

3. En **Redirect URLs** agrega:

```text
http://localhost:3000/**
```

Cuando despliegues, agrega tambien:

```text
https://TU-DOMINIO.vercel.app/**
https://TU-DOMINIO-PROPIO.com/**
```

## 7. Google OAuth

En Google Cloud:

1. Crea un proyecto en https://console.cloud.google.com.
2. Configura la pantalla de consentimiento OAuth.
3. Crea credenciales OAuth Client ID tipo **Web application**.
4. Agrega este redirect URI:

```text
https://TU-PROYECTO.supabase.co/auth/v1/callback
```

En Supabase:

1. Ve a **Authentication > Providers > Google**.
2. Activa Google.
3. Pega el **Client ID** y **Client Secret** de Google.
4. Guarda.

## 8. Ejecutar local

```powershell
npm install
npm run dev
```

Abre:

```text
http://localhost:3000
http://localhost:3000/ingresar
http://localhost:3000/admin
```

## 9. Desplegar en Vercel

1. Sube el repo a GitHub.
2. Entra a https://vercel.com.
3. Importa el repo.
4. Framework preset: **Next.js**.
5. Root directory: deja la raiz del proyecto si importaste solo `nucleo_qro`.
6. Agrega estas Environment Variables en Vercel:

```env
NEXT_PUBLIC_SUPABASE_URL=https://TU-PROYECTO.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=TU_PUBLISHABLE_KEY
SUPABASE_SECRET_KEY=TU_SECRET_KEY
NEXT_PUBLIC_SITE_URL=https://TU-DOMINIO.vercel.app
NUCLEO_ADMIN_EMAILS=admin@tudominio.com
```

7. Deploy.
8. Copia el dominio final de Vercel.
9. Regresa a Supabase y actualiza:

- **Site URL**: `https://TU-DOMINIO.vercel.app`
- **Redirect URLs**: `https://TU-DOMINIO.vercel.app/**`

## 10. Rutas implementadas

- `/ingresar`: login, signup y Google Auth
- `/cuenta`: pagina protegida de usuario
- `/admin`: panel protegido con metricas, graficas y pendientes
- `/api/auth/login`: login por correo/contrasena
- `/api/auth/signup`: crea usuario y solicitud de escuela
- `/api/auth/google`: inicia Google OAuth
- `/auth/callback`: callback OAuth
- `/auth/confirm`: confirmacion por correo
- `/auth/signout`: cerrar sesion
