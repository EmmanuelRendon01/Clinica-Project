# Agenda Médica

Este proyecto es una API REST para la gestión de una agenda médica, desarrollada con Node.js, Express y PostgreSQL. Permite gestionar pacientes, médicos y citas médicas. El frontend (HTML, CSS, JS) debe ser desarrollado aparte y consumirá esta API. Al final, el frontend se puede ejecutar usando Live Server.

## Requisitos previos

- Node.js (v16 o superior recomendado)
- npm (v8 o superior)
- Acceso a una base de datos PostgreSQL (ya configurada en `.env`)
- (Opcional) Extensión Live Server para VS Code o similar para servir el frontend

## Instalación

1. **Clona el repositorio o descarga el código fuente:**

   ```bash
   git clone <URL-del-repositorio>
   cd "Agenda medica"
   ```

2. **Instala las dependencias:**

   ```bash
   npm install
   ```

3. **Configura las variables de entorno:**

   Edita el archivo `.env` con los datos de tu base de datos PostgreSQL. Ejemplo:

   ```env
   PORT=9000
   DB_HOST=tu_host
   DB_PORT=5432
   DB_USER=tu_usuario
   DB_PASSWORD=tu_password
   DB_NAME=tu_basededatos
   ```

4. **Verifica la conexión a la base de datos:**

   El archivo `config/db.js` ya está configurado para conectarse usando las variables de entorno.

## Ejecución del backend (API)

Puedes ejecutar el servidor en modo desarrollo (con recarga automática usando nodemon) o en modo producción.

### Modo desarrollo

```bash
npm run dev
```

### Modo producción

```bash
npm start
```

El servidor se iniciará en el puerto especificado en `.env` (por defecto 9000). Accede a la API en: `http://localhost:9000/api/`

## Endpoints principales

- `/api/patients` — Gestión de pacientes
- `/api/doctors` — Gestión de médicos
- `/api/appointments` — Gestión de citas

Consulta los archivos en `app/routes/` para ver los endpoints disponibles.


## ¿Por qué se usó MVC?

El proyecto está estructurado siguiendo el patrón **MVC (Modelo-Vista-Controlador)**, una arquitectura ampliamente utilizada en el desarrollo de aplicaciones web. Las razones principales para usar MVC son:

- **Separación de responsabilidades:**
   - **Modelo:** Gestiona la lógica de acceso a datos y la comunicación con la base de datos (carpeta `models/`).
   - **Vista:** En este caso, el frontend (HTML, CSS, JS) que consumirá la API, ubicado en la carpeta `public/`.
   - **Controlador:** Procesa las peticiones, aplica la lógica de negocio y responde a la vista o cliente (carpeta `controllers/`).
- **Mantenibilidad:** Permite modificar o mejorar una parte del sistema (por ejemplo, la lógica de negocio) sin afectar otras.
- **Escalabilidad:** Facilita agregar nuevas funcionalidades o endpoints de manera ordenada.
- **Reutilización:** El mismo backend puede ser consumido por diferentes frontends (web, móvil, etc.).

Esta estructura hace que el código sea más limpio, organizado y fácil de entender para otros desarrolladores.

## Estructura del proyecto

```
Agenda medica/
├── app/
│   ├── controllers/
│   ├── models/
│   └── routes/
├── config/
│   └── db.js
├── csv/           # Archivos CSV de datos
├── public/        # Aquí irá el frontend (HTML, CSS, JS)
├── server.js      # Punto de entrada del backend
├── package.json
├── .env
```

## Ejecución del frontend (HTML)

1. Coloca tus archivos HTML, CSS y JS en la carpeta `public/`.
2. Abre la carpeta `public/` en VS Code.
3. Haz clic derecho sobre tu archivo `index.html` y selecciona **"Open with Live Server"** (requiere la extensión Live Server).
4. El frontend podrá consumir la API en `http://localhost:9000/api/`.

## Notas adicionales

- Si necesitas poblar la base de datos, puedes usar los archivos CSV en la carpeta `csv/` y el script `csv/scriptCSV.js`.
- Asegúrate de que la base de datos esté accesible desde tu máquina local.
- Si cambias el puerto en `.env`, actualiza las URLs en tu frontend.

## Scripts útiles

- `npm run dev` — Ejecuta el backend con recarga automática (nodemon)
- `npm start` — Ejecuta el backend en modo producción

---

**¡Listo! Ahora puedes desarrollar el frontend y consumir la API REST de Agenda Médica.**
