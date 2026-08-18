# API de Numerología

API REST para calcular perfiles numerológicos a partir del nombre completo y la fecha de nacimiento de un usuario, con autenticación JWT y módulos preparados para lecturas y compatibilidad potenciados por IA (Gemini).

## Tabla de contenidos

- [Estado del proyecto](#estado-del-proyecto)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Uso](#uso)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Endpoints disponibles](#endpoints-disponibles)
- [Guía de pruebas en Postman](#guía-de-pruebas-en-postman)
- [Próximas fases](#próximas-fases)

## Estado del proyecto

| Fase | Descripción | Estado |
|---|---|---|
| 1 | Inicialización del proyecto, variables de entorno y conexión a MongoDB | ✅ Completa |
| 2-a | Modelado de las 5 colecciones con Mongoose: `User`, `NumerologyProfile`, `Reading`, `CompatibilityMatch`, `AuditLog` | ✅ Completa |
| 2-b | Rutas y controladores base para los cuatro dominios: `auth`, `numerology`, `readings`, `compatibility` | ✅ Completa |
| 2-c | Autenticación con JWT y contraseñas encriptadas con bcrypt | ✅ Completa |
| 3 | Algoritmos de numerología y endpoints de cálculo/consulta de perfil | ✅ Completa |
| 4 | Integración del SDK de Gemini para `readings` y `compatibility` | ⏳ Pendiente |
| 5 | Colección de auditoría, validación de datos y manejo de errores centralizado | ⏳ Pendiente |

### Fase 2-c — Autenticación

- `POST /api/v1/auth/register`: crea un usuario y encripta la contraseña con bcrypt.
- `POST /api/v1/auth/login`: valida credenciales y devuelve un token JWT.
- Middleware `protect` en `src/middlewares/auth.middleware.js`: protege las rutas que requieren sesión.

### Fase 3 — Algoritmos de numerología

Implementados en `src/services/numerology.service.js`:

- **Número de Camino de Vida**, a partir de la fecha de nacimiento.
- **Número de Expresión**, a partir de todas las letras del nombre completo.
- **Número de Alma**, a partir de las vocales del nombre completo.
- **Reducción numerológica** respetando los números maestros 11, 22 y 33.

Los módulos de `readings` y `compatibility` ya exponen sus rutas y CRUD base, pero la integración con Gemini queda pendiente para la Fase 4.

## Instalación

```bash
npm install
```

## Configuración

El archivo `.env` ya incluye las siguientes variables configuradas:

- `MONGO_URI`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`

## Uso

### Probar la conexión a MongoDB

```bash
node test-conexion.js
```

### Levantar el servidor

```bash
npm run dev
```

Por defecto el servidor queda disponible en `http://localhost:4000`.

## Estructura del proyecto

```
numerologia-api/
  server.js
  test-conexion.js
  package.json
  .env
  src/
    app.js
    config/
      db.js
    models/
      User.js
      NumerologyProfile.js
      Reading.js
      CompatibilityMatch.js
      AuditLog.js
    middlewares/
      auth.middleware.js
    controllers/
      auth.controller.js
      numerology.controller.js
      readings.controller.js
      compatibility.controller.js
    routes/
      auth.routes.js
      numerology.routes.js
      readings.routes.js
      compatibility.routes.js
    services/
      numerology.service.js
```

## Endpoints disponibles

| Método | Ruta | Protegida | Descripción |
|---|---|---|---|
| POST | `/api/v1/auth/register` | No | Crea un usuario |
| POST | `/api/v1/auth/login` | No | Devuelve un JWT |
| POST | `/api/v1/numerology/calculate` | Sí | Calcula y guarda el perfil numerológico |
| GET | `/api/v1/numerology/profile` | Sí | Devuelve el perfil numerológico |
| POST | `/api/v1/readings/generate` | Sí | Pendiente (Fase 4) |
| GET | `/api/v1/readings/history` | Sí | Devuelve el historial de lecturas |
| POST | `/api/v1/compatibility/check` | Sí | Pendiente (Fase 4) |

Para las rutas protegidas, envía el token así:

```
Authorization: Bearer <token>
```

## Guía de pruebas en Postman

**URL base:** `http://localhost:4000/api/v1`

Antes de probar, levanta el servidor con `npm run dev`.

### Orden sugerido de pruebas

1. `POST /auth/register`
2. `POST /auth/login` (copiar el token)
3. `POST /numerology/calculate`
4. `GET /numerology/profile`
5. `GET /readings/history`
6. `POST /readings/generate` (dará 501, es esperado)
7. `POST /compatibility/check` (dará 501, es esperado)

---

### 1. Registro de usuario

| | |
|---|---|
| **Método** | `POST` |
| **URL** | `http://localhost:4000/api/v1/auth/register` |
| **Protegida** | No |

**Headers**

```
Content-Type: application/json
```

**Body (raw JSON)**

```json
{
  "nombre_completo": "Juan Sebastian Morales",
  "email": "juan@example.com",
  "password": "123456",
  "fecha_nacimiento": "2005-02-14"
}
```

**Respuesta esperada (201 Created)**

```json
{
  "success": true,
  "data": {
    "id": "66d1a2b3c4d5e6f7a8b9c0d1",
    "nombre_completo": "Juan Sebastian Morales",
    "email": "juan@example.com",
    "fecha_nacimiento": "2005-02-14T00:00:00.000Z"
  }
}
```

**Respuesta si el email ya existe (409 Conflict)**

```json
{
  "success": false,
  "message": "Ya existe un usuario registrado con ese email"
}
```

**Respuesta si falta un campo (400 Bad Request)**

```json
{
  "success": false,
  "message": "nombre_completo, email, password y fecha_nacimiento son obligatorios"
}
```

---

### 2. Login

| | |
|---|---|
| **Método** | `POST` |
| **URL** | `http://localhost:4000/api/v1/auth/login` |
| **Protegida** | No |

**Headers**

```
Content-Type: application/json
```

**Body (raw JSON)**

```json
{
  "email": "juan@example.com",
  "password": "123456"
}
```

**Respuesta esperada (200 OK)**

```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "usuario": {
      "id": "66d1a2b3c4d5e6f7a8b9c0d1",
      "nombre_completo": "Juan Sebastian Morales",
      "email": "juan@example.com"
    }
  }
}
```

**Respuesta si las credenciales son incorrectas (401 Unauthorized)**

```json
{
  "success": false,
  "message": "Credenciales inválidas"
}
```

> **Importante:** guarda el valor de `token` que devuelve esta petición. Lo vas a necesitar para todas las peticiones protegidas que siguen.

---

### 3. Calcular perfil numerológico

| | |
|---|---|
| **Método** | `POST` |
| **URL** | `http://localhost:4000/api/v1/numerology/calculate` |
| **Protegida** | Sí |

**Headers**

```
Content-Type: application/json
Authorization: Bearer <pega_aqui_el_token_del_login>
```

**Body**

No necesita body: usa los datos del usuario autenticado (`nombre_completo` y `fecha_nacimiento` que quedaron guardados en el registro).

**Respuesta esperada (200 OK)**

```json
{
  "success": true,
  "data": {
    "_id": "66d1a2b3c4d5e6f7a8b9c0d2",
    "user": "66d1a2b3c4d5e6f7a8b9c0d1",
    "numero_vida": 5,
    "numero_expresion": 3,
    "numero_alma": 5,
    "fecha_calculo": "2026-08-18T20:45:00.000Z"
  }
}
```

**Respuesta si el token no es válido (401 Unauthorized)**

```json
{
  "success": false,
  "message": "Token inválido o expirado"
}
```

**Respuesta si no se envió token (401 Unauthorized)**

```json
{
  "success": false,
  "message": "No se proporcionó un token de autenticación"
}
```

---

### 4. Ver perfil numerológico

| | |
|---|---|
| **Método** | `GET` |
| **URL** | `http://localhost:4000/api/v1/numerology/profile` |
| **Protegida** | Sí |

**Headers**

```
Authorization: Bearer <pega_aqui_el_token_del_login>
```

**Body:** no aplica (GET)

**Respuesta esperada (200 OK)**

```json
{
  "success": true,
  "data": {
    "_id": "66d1a2b3c4d5e6f7a8b9c0d2",
    "user": "66d1a2b3c4d5e6f7a8b9c0d1",
    "numero_vida": 5,
    "numero_expresion": 3,
    "numero_alma": 5,
    "fecha_calculo": "2026-08-18T20:45:00.000Z"
  }
}
```

**Respuesta si aún no ha calculado su perfil (404 Not Found)**

```json
{
  "success": false,
  "message": "Aún no has calculado tu perfil numerológico"
}
```

---

### 5. Generar lectura con IA (pendiente de Fase 4)

| | |
|---|---|
| **Método** | `POST` |
| **URL** | `http://localhost:4000/api/v1/readings/generate` |
| **Protegida** | Sí |

**Headers**

```
Content-Type: application/json
Authorization: Bearer <pega_aqui_el_token_del_login>
```

**Body sugerido (cuando se implemente en Fase 4)**

```json
{
  "tipo_lectura": "diaria"
}
```

**Respuesta actual (501 Not Implemented)**

```json
{
  "success": false,
  "message": "Endpoint generate pendiente de integración con Gemini (Fase 4)"
}
```

---

### 6. Historial de lecturas

| | |
|---|---|
| **Método** | `GET` |
| **URL** | `http://localhost:4000/api/v1/readings/history` |
| **Protegida** | Sí |

**Headers**

```
Authorization: Bearer <pega_aqui_el_token_del_login>
```

**Body:** no aplica (GET)

**Respuesta esperada (200 OK), vacía hasta que exista la Fase 4**

```json
{
  "success": true,
  "data": []
}
```

---

### 7. Compatibilidad entre dos usuarios (pendiente de Fase 4)

| | |
|---|---|
| **Método** | `POST` |
| **URL** | `http://localhost:4000/api/v1/compatibility/check` |
| **Protegida** | Sí |

**Headers**

```
Content-Type: application/json
Authorization: Bearer <pega_aqui_el_token_del_login>
```

**Body sugerido (cuando se implemente en Fase 4)**

```json
{
  "otro_usuario_id": "66d1a2b3c4d5e6f7a8b9c0d9"
}
```

**Respuesta actual (501 Not Implemented)**

```json
{
  "success": false,
  "message": "Endpoint check pendiente de integración con Gemini (Fase 4)"
}
```

---

### Cómo configurar el token en Postman

**Opción A — Manual en cada petición**

1. Ve a la pestaña **Headers** de la petición.
2. Agrega: `Key = Authorization`, `Value = Bearer <tu_token>`.

**Opción B — Usando una variable de colección (recomendado)**

1. Crea una colección en Postman con todas estas peticiones.
2. En la colección, ve a **Variables** y crea una llamada `token`.
3. En la petición de Login, ve a la pestaña **Tests** y agrega:

   ```js
   pm.collectionVariables.set("token", pm.response.json().data.token);
   ```

4. En las demás peticiones protegidas, en **Headers** pon:

   `Key = Authorization`, `Value = Bearer {{token}}`

   Así el token se actualiza automáticamente cada vez que haces login.

## Próximas fases

- **Fase 4:** Integración del SDK de Gemini para `readings` y `compatibility`.
- **Fase 5:** Colección de auditoría, validación de datos y manejo de errores centralizado.
