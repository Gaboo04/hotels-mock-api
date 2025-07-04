# Hotels Mock API

Una API REST falsa construida con JSON Server para simular un servicio de hoteles.

## Características

- ✅ API REST completa con operaciones CRUD
- 🏨 Datos de hoteles con información detallada
- 👥 Sistema de usuarios y reservas
- ⭐ Sistema de reseñas y calificaciones
- 🌐 CORS habilitado
- 🚀 Listo para despliegue en Azure

## Instalación Local

```bash
npm install
npm run dev
```

La API estará disponible en `http://localhost:3000`

## Endpoints Disponibles

### Hoteles
- `GET /hotels` - Obtener todos los hoteles
- `GET /hotels/:id` - Obtener hotel específico
- `POST /hotels` - Crear nuevo hotel
- `PUT /hotels/:id` - Actualizar hotel
- `DELETE /hotels/:id` - Eliminar hotel

### Usuarios
- `GET /users` - Obtener todos los usuarios
- `GET /users/:id` - Obtener usuario específico
- `POST /users` - Crear nuevo usuario

### Reservas
- `GET /bookings` - Obtener todas las reservas
- `GET /bookings/:id` - Obtener reserva específica
- `POST /bookings` - Crear nueva reserva

## Despliegue en Azure

### Opción 1: Azure App Service (Recomendado)

1. Crear un App Service en Azure Portal
2. Configurar deployment desde GitHub o repositorio local
3. La aplicación se construirá automáticamente usando los archivos de configuración incluidos

### Opción 2: Azure Container Instances

```bash
# Crear imagen Docker (si decides usar contenedores)
docker build -t hotels-mock-api .
```

### Variables de Entorno

- `PORT`: Puerto de la aplicación (por defecto 8080 en Azure)

## Estructura del Proyecto

```
├── db.json          # Base de datos JSON
├── index.js         # Servidor principal
├── package.json     # Dependencias y scripts
├── web.config       # Configuración para IIS/Azure
├── deploy.cmd       # Script de despliegue
└── .deployment      # Configuración de despliegue
```

## Configuración de CORS

La API está configurada para aceptar peticiones desde cualquier origen. En producción, considera limitar los orígenes permitidos por seguridad.

## Datos de Ejemplo

La API incluye datos de ejemplo de:
- 🏨 Hoteles en diferentes destinos
- ⭐ Reseñas y calificaciones
- 🌍 Información de ciudades y países
- 💰 Precios y disponibilidad

## Desarrollo

Para ejecutar en modo desarrollo:

```bash
npm run dev
```

Para producción:

```bash
npm start
```
