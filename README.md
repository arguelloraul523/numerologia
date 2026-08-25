# API de Numerología

API RESTful para calcular perfiles numerológicos y generar lecturas e interpretaciones de compatibilidad con Google Gemini.

## 1. Instalación

```
npm install
```

El archivo `.env` ya trae `MONGO_URI` configurada. Para que Fase 4 (Gemini) funcione de verdad, abre `.env` y reemplaza:

```
GEMINI_API_KEY=tu_api_key_de_gemini
```

por tu API Key real, obtenida en https://aistudio.google.com/app/apikey.

## 2. Probar la conexión a MongoDB

```
node test-conexion.js
```

Debe imprimir `Conexión exitosa a MongoDB Atlas`.

## 3. Levantar el servidor

```
npm run dev
```

Queda corriendo en `http://localhost:4000`.

## 4. Cómo usar la API paso a paso

Todos los ejemplos usan `curl`. También puedes importarlos en Postman o Insomnia.

### 4.1 Registrar un usuario

```
curl -X POST http://localhost:4000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "nombre_completo": "Juan Sebastian Morales",
    "email": "juan@example.com",
    "password": "123456",
    "fecha_nacimiento": "2005-02-14"
  }'
```

Respuesta esperada (201):
```json
{
  "success": true,
  "data": {
    "id": "665f1a2b3c4d5e6f7a8b9c0d",
    "nombre_completo": "Juan Sebastian Morales",
    "email": "juan@example.com",
    "fecha_nacimiento": "2005-02-14T00:00:00.000Z"
  }
}
```

### 4.2 Iniciar sesión

```
curl -X POST http://localhost:4000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@example.com",
    "password": "123456"
  }'
```

Respuesta esperada (200):
```json
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "usuario": { "id": "665f...", "nombre_completo": "Juan Sebastian Morales", "email": "juan@example.com" }
  }
}
```

Guarda ese `token`. Todas las rutas siguientes lo necesitan en el header `Authorization`.

### 4.3 Calcular el perfil numerológico

```
curl -X POST http://localhost:4000/api/v1/numerology/calculate \
  -H "Authorization: Bearer TU_TOKEN_AQUI"
```

No necesita body: usa el nombre y la fecha de nacimiento que ya guardaste al registrarte.

Respuesta esperada (200):
```json
{
  "success": true,
  "data": {
    "user": "665f...",
    "numero_vida": 5,
    "numero_expresion": 3,
    "numero_alma": 5,
    "fecha_calculo": "2026-08-25T20:00:00.000Z"
  }
}
```

### 4.4 Consultar el perfil ya calculado

```
curl http://localhost:4000/api/v1/numerology/profile \
  -H "Authorization: Bearer TU_TOKEN_AQUI"
```

### 4.5 Generar una lectura con IA

Requiere haber calculado el perfil antes (paso 4.3).

```
curl -X POST http://localhost:4000/api/v1/readings/generate \
  -H "Authorization: Bearer TU_TOKEN_AQUI" \
  -H "Content-Type: application/json" \
  -d '{ "tipo_lectura": "diaria" }'
```

`tipo_lectura` debe ser `diaria`, `general` o `anual`.

Respuesta esperada (201):
```json
{
  "success": true,
  "data": {
    "user": "665f...",
    "tipo_lectura": "diaria",
    "prompt_enviado": "Eres un numerólogo profesional...",
    "respuesta_generada": "Hoy es un buen día para...",
    "fecha": "2026-08-25T20:05:00.000Z"
  }
}
```

### 4.6 Ver historial de lecturas

```
curl http://localhost:4000/api/v1/readings/history \
  -H "Authorization: Bearer TU_TOKEN_AQUI"
```

### 4.7 Comparar compatibilidad con otro usuario

Necesitas que ambos usuarios ya hayan calculado su perfil (paso 4.3). El `otro_usuario_id` es el `id` que devuelve el registro de esa otra persona (paso 4.1).

```
curl -X POST http://localhost:4000/api/v1/compatibility/check \
  -H "Authorization: Bearer TU_TOKEN_AQUI" \
  -H "Content-Type: application/json" \
  -d '{ "otro_usuario_id": "ID_DEL_OTRO_USUARIO" }'
```

Respuesta esperada (201):
```json
{
  "success": true,
  "data": {
    "user_a": "665f...",
    "user_b": "665a...",
    "puntaje": 59,
    "interpretacion_ia": "Esta relación combina...",
    "fecha": "2026-08-25T20:10:00.000Z"
  }
}
```

## 5. Tabla resumen de endpoints

| Método | Ruta | Protegida | Body |
|---|---|---|---|
| POST | /api/v1/auth/register | No | nombre_completo, email, password, fecha_nacimiento |
| POST | /api/v1/auth/login | No | email, password |
| POST | /api/v1/numerology/calculate | Sí | (ninguno) |
| GET | /api/v1/numerology/profile | Sí | (ninguno) |
| POST | /api/v1/readings/generate | Sí | tipo_lectura |
| GET | /api/v1/readings/history | Sí | (ninguno) |
| POST | /api/v1/compatibility/check | Sí | otro_usuario_id |

"Protegida" significa que necesita el header `Authorization: Bearer <token>` obtenido en el login.

## 6. Qué construyó cada fase (con comentarios en el código)

Cada archivo tiene, al principio, un comentario indicando qué fase lo creó y qué fase lo modificó después. Resumen:

- **Fase 1**: `server.js`, `test-conexion.js`, `src/config/db.js`, variables básicas del `.env`.
- **Fase 2-a**: los 5 modelos en `src/models/`.
- **Fase 2-b**: `src/app.js`, `src/routes/`, y la primera versión de los controladores (antes solo placeholders).
- **Fase 2-c**: `src/middlewares/auth.middleware.js`, y la lógica real de `register`/`login` en `src/controllers/auth.controller.js`.
- **Fase 3**: `src/services/numerology.service.js` (Camino de Vida, Expresión, Alma), conectado en `numerology.controller.js`.
- **Fase 4**: `src/config/gemini.js`, la lógica real de `readings.controller.js` y `compatibility.controller.js`, y la función `calcularPuntajeCompatibilidad` en el servicio.
- **Fase 5**: `src/utils/ApiError.js`, `src/utils/asyncHandler.js`, `src/middlewares/errorHandler.js`, `src/middlewares/validate.js`, `src/validators/`, y `src/middlewares/audit.middleware.js`.

## 7. Estructura del proyecto

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
      gemini.js
    models/
      User.js
      NumerologyProfile.js
      Reading.js
      CompatibilityMatch.js
      AuditLog.js
    middlewares/
      auth.middleware.js
      audit.middleware.js
      validate.js
      errorHandler.js
    utils/
      ApiError.js
      asyncHandler.js
    validators/
      auth.validators.js
      readings.validators.js
      compatibility.validators.js
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
