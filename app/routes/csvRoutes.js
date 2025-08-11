import express from 'express';
import multer from 'multer';
import fs from 'fs';
import csv from 'csv-parser';
import pool from '../../config/db.js';

const router = express.Router();

// Configuración de multer para la carga de archivos
const upload = multer({ dest: 'uploads/' });

// Función para insertar una fila en la base de datos
async function insertarFila(data, table) {

  const keys = Object.keys(data);
  const values = Object.values(data);

  const columnas = keys.map((key) => `"${key}"`).join(', ');
  const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');

  const query = `INSERT INTO ${table} (${columnas}) VALUES (${placeholders})`;

  await pool.query(query, values);
}

// Endpoint para cargar el archivo CSV
router.post('/', upload.single('file'), (req, res) => {
  const { file } = req;

  const { table } = req.query;
  if (!table) {
    return res.status(400).send('Debes especificar la tabla en el parámetro "table".');
  }

  if (!file) {
    return res.status(400).send('No se ha cargado un archivo CSV.');
  }

  const filas = [];

  fs.createReadStream(file.path)
    .pipe(csv())
    .on('data', (data) => {
      filas.push(data);
    })
    .on('end', async () => {
      try {
        for (const fila of filas) {
          await insertarFila(fila, table);
        }
        res.status(200).send('Importación completada con éxito.');
      } catch (error) {
        console.error('Error al insertar datos:', error);
        res.status(500).send('Hubo un error al procesar el archivo.');
      } finally {
        // Elimina el archivo cargado después de procesarlo
        fs.unlinkSync(file.path);
      }
    });
});

export default router;
