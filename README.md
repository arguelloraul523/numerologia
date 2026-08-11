# API de Numerología — Fase 1

**Alcance de esta fase:** inicialización del proyecto, configuración de variables de entorno y conexión exitosa a MongoDB Atlas. Nada más (modelos, rutas, autenticación, IA y Docker llegan en las fases siguientes).

## Instalación

```bash
npm install
cp .env.example .env
```

Edita `.env` y agrega tu cadena de conexión de **MongoDB Atlas** en `MONGO_URI`.

## Probar la conexión a MongoDB

```bash
node test-conexion.js
```

Si la configuración es correcta verás:

```text
Conexión exitosa a MongoDB Atlas
Base de datos activa: numerologia_db
```

## Iniciar el servidor

```bash
npm run dev
```

Visita:

```text
http://localhost:4000/
```

La respuesta será:

```json
{
  "success": true,
  "message": "API de Numerología funcionando"
}
```

En la consola también aparecerá:

```text
MongoDB Atlas conectado correctamente
```

## Estructura del proyecto

```text
numerologia-api/
├── server.js
├── test-conexion.js
├── package.json
├── .env.example
└── src/
    └── config/
        └── db.js
```

## Próximas fases

| Fase | Contenido |
|------|-----------|
| 2-a | Esquemas de las 5 colecciones (Users, NumerologyProfiles, Readings, CompatibilityMatches y AuditLogs) |
| 2-b | Rutas y controladores base |
| 2-c | Autenticación con JWT y bcrypt |
| 3 | Algoritmos de numerología |
| 4 | Integración con Google Gemini |
| 5 | Auditoría, validaciones y manejo de errores |