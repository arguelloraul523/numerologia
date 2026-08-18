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

- Número de Camino de Vida, a partir de la fecha de nacimiento.
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

| Método | Ruta | Protegida | Descripción |
|---|---|---|---|
| POST | /api/v1/auth/register | No | Crea un usuario |
| POST | /api/v1/auth/login | No | Devuelve un JWT |
| POST | /api/v1/numerology/calculate | Sí | Calcula y guarda el perfil numerológico |
| GET | /api/v1/numerology/profile | Sí | Devuelve el perfil numerológico |
| POST | /api/v1/readings/generate | Sí | Pendiente (Fase 4) |
| GET | /api/v1/readings/history | Sí | Devuelve el historial de lecturas |
| POST | /api/v1/compatibility/check | Sí | Pendiente (Fase 4) |

Para las rutas protegidas, envía el token así:
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
