# API de Numerología

## Fase 1 (completa)
Inicialización del proyecto, variables de entorno y conexión a MongoDB.

## Fase 2-a (completa)
Modelado de las 5 colecciones con Mongoose: User, NumerologyProfile, Reading, CompatibilityMatch, AuditLog.

## Fase 2-b (completa)
Rutas y controladores base para los cuatro dominios: auth, numerology, readings, compatibility.

## Fase 2-c (completa)
Autenticación con JWT y contraseñas encriptadas con bcrypt.

- POST /api/v1/auth/register: crea un usuario, encripta la contraseña con bcrypt.
- POST /api/v1/auth/login: valida credenciales y devuelve un token JWT.
- Middleware protect en src/middlewares/auth.middleware.js protege las rutas que requieren sesión.

## Fase 3 (completa)
Algoritmos de numerología en src/services/numerology.service.js:

- Número de Camino de Vida, a partir de   la fecha de nacimiento.
- Número de Expresión, a partir de todas las letras del nombre completo.
- Número de Alma, a partir de las vocales del nombre completo.
- Reducción numerológica respetando los números maestros 11, 22 y 33.

Endpoints:
- POST /api/v1/numerology/calculate: calcula y guarda el perfil del usuario autenticado.
- GET /api/v1/numerology/profile: devuelve el perfil ya calculado.

Readings y compatibility exponen sus rutas y CRUD base, pero la integración con Gemini queda pendiente para la Fase 4.

## Instalación

```
npm install
```

El archivo .env ya incluye MONGO_URI, JWT_SECRET y JWT_EXPIRES_IN configurados.

## Probar la conexión a MongoDB

```
node test-conexion.js
```

## Levantar el servidor

```
npm run dev
```

## Endpoints disponibles

| Metodo | Ruta | Protegida | Descripcion |
|---|---|---|---|
| POST | /api/v1/auth/register | No | Crea un usuario |
| POST | /api/v1/auth/login | No | Devuelve un JWT |
| POST | /api/v1/numerology/calculate | Si | Calcula y guarda el perfil numerológico |
| GET | /api/v1/numerology/profile | Si | Devuelve el perfil numerológico |
| POST | /api/v1/readings/generate | Si | Pendiente (Fase 4) |
| GET | /api/v1/readings/history | Si | Devuelve el historial de lecturas |
| POST | /api/v1/compatibility/check | Si | Pendiente (Fase 4) |

Para las rutas protegidas, envía el token asi:
```
Authorization: Bearer <token>
```

## Estructura

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

## Próximas fases

- 4: Integración del SDK de Gemini para readings y compatibility.
- 5: Colección de auditoría, validación de datos y manejo de errores centralizado.




peticiones

===========================================================
API DE NUMEROLOGIA - PETICIONES PARA POSTMAN
===========================================================

URL BASE:
http://localhost:4000/api/v1

Antes de probar, levanta el servidor con: npm run dev


===========================================================
1. REGISTRO DE USUARIO
===========================================================

Metodo: POST
URL: http://localhost:4000/api/v1/auth/register
Protegida: No
Headers:
  Content-Type: application/json

Body (raw JSON):
{
  "nombre_completo": "Juan Sebastian Morales",
  "email": "juan@example.com",
  "password": "123456",
  "fecha_nacimiento": "2005-02-14"
}

Respuesta esperada (201 Created):
{
  "success": true,
  "data": {
    "id": "66d1a2b3c4d5e6f7a8b9c0d1",
    "nombre_completo": "Juan Sebastian Morales",
    "email": "juan@example.com",
    "fecha_nacimiento": "2005-02-14T00:00:00.000Z"
  }
}

Respuesta si el email ya existe (409 Conflict):
{
  "success": false,
  "message": "Ya existe un usuario registrado con ese email"
}

Respuesta si falta un campo (400 Bad Request):
{
  "success": false,
  "message": "nombre_completo, email, password y fecha_nacimiento son obligatorios"
}


===========================================================
2. LOGIN
===========================================================

Metodo: POST
URL: http://localhost:4000/api/v1/auth/login
Protegida: No
Headers:
  Content-Type: application/json

Body (raw JSON):
{
  "email": "juan@example.com",
  "password": "123456"
}

Respuesta esperada (200 OK):
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhODRjN2M5MzU0ZDVkN2Q4MzQyODEyMyIsImlhdCI6MTc4NzA4NzA5MCwiZXhwIjoxNzg3NjkxODkwfQ.Skn-8IB8YhQhyoZZu2VNa4bNvfGqzYNx3KCq8XGETkk
    "usuario": {
      "id": "66d1a2b3c4d5e6f7a8b9c0d1",
      "nombre_completo": "Juan Sebastian Morales",
      "email": "juan@example.com"
    }
  }
}

Respuesta si las credenciales son incorrectas (401 Unauthorized):
{
  "success": false,
  "message": "Credenciales inválidas"
}

IMPORTANTE: guarda el valor de "token" que te devuelve esta peticion.
Lo vas a necesitar para todas las peticiones protegidas que siguen.


===========================================================
3. CALCULAR PERFIL NUMEROLOGICO
===========================================================

Metodo: POST
URL: http://localhost:4000/api/v1/numerology/calculate
Protegida: Si
Headers:
  Content-Type: application/json
  Authorization: Bearer <pega_aqui_el_token_del_login>

Body: no necesita body, usa los datos del usuario autenticado
(nombre_completo y fecha_nacimiento que quedaron guardados en el registro).

Respuesta esperada (200 OK):
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

Respuesta si el token no es valido (401 Unauthorized):
{
  "success": false,
  "message": "Token inválido o expirado"
}

Respuesta si no se envio token (401 Unauthorized):
{
  "success": false,
  "message": "No se proporcionó un token de autenticación"
}


===========================================================
4. VER PERFIL NUMEROLOGICO
===========================================================

Metodo: GET
URL: http://localhost:4000/api/v1/numerology/profile
Protegida: Si
Headers:
  Authorization: Bearer <pega_aqui_el_token_del_login>

Body: no aplica (GET)

Respuesta esperada (200 OK):
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

Respuesta si aun no ha calculado su perfil (404 Not Found):
{
  "success": false,
  "message": "Aún no has calculado tu perfil numerológico"
}


===========================================================
5. GENERAR LECTURA CON IA (pendiente de Fase 4)
===========================================================

Metodo: POST
URL: http://localhost:4000/api/v1/readings/generate
Protegida: Si
Headers:
  Content-Type: application/json
  Authorization: Bearer <pega_aqui_el_token_del_login>

Body sugerido (cuando se implemente en Fase 4):
{
  "tipo_lectura": "diaria"
}

Respuesta actual (501 Not Implemented):
{
  "success": false,
  "message": "Endpoint generate pendiente de integración con Gemini (Fase 4)"
}


===========================================================
6. HISTORIAL DE LECTURAS
===========================================================

Metodo: GET
URL: http://localhost:4000/api/v1/readings/history
Protegida: Si
Headers:
  Authorization: Bearer <pega_aqui_el_token_del_login>

Body: no aplica (GET)

Respuesta esperada (200 OK), vacia hasta que exista la Fase 4:
{
  "success": true,
  "data": []
}


===========================================================
7. COMPATIBILIDAD ENTRE DOS USUARIOS (pendiente de Fase 4)
===========================================================

Metodo: POST
URL: http://localhost:4000/api/v1/compatibility/check
Protegida: Si
Headers:
  Content-Type: application/json
  Authorization: Bearer <pega_aqui_el_token_del_login>

Body sugerido (cuando se implemente en Fase 4):
{
  "otro_usuario_id": "66d1a2b3c4d5e6f7a8b9c0d9"
}

Respuesta actual (501 Not Implemented):
{
  "success": false,
  "message": "Endpoint check pendiente de integración con Gemini (Fase 4)"
}


===========================================================
COMO CONFIGURAR EL TOKEN EN POSTMAN
===========================================================

Opcion A - Manual en cada peticion:
1. Ve a la pestaña "Headers" de la peticion.
2. Agrega: Key = Authorization, Value = Bearer <tu_token>

Opcion B - Usando una variable de coleccion (recomendado):
1. Crea una coleccion en Postman con todas estas peticiones.
2. En la coleccion, ve a "Variables" y crea una llamada "token".
3. En la peticion de Login, ve a la pestaña "Tests" y agrega:
   pm.collectionVariables.set("token", pm.response.json().data.token);
4. En las demas peticiones protegidas, en Headers pon:
   Key = Authorization, Value = Bearer {{token}}
   Asi el token se actualiza automaticamente cada vez que haces login.


===========================================================
ORDEN SUGERIDO DE PRUEBAS
===========================================================

1. POST /auth/register
2. POST /auth/login          (copiar el token)
3. POST /numerology/calculate
4. GET  /numerology/profile
5. GET  /readings/history
6. POST /readings/generate      (dara 501, es esperado)
7. POST /compatibility/check    (dara 501, es esperado)