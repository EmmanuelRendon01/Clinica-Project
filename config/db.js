import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Crear un pool de conexiones a la base de datos
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false,  // Esto es necesario cuando usas Render o bases de datos externas con SSL
  },
});

// Exporta el pool de conexiones
export default pool;