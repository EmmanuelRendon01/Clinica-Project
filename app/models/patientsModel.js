import pool from "../../config/db.js";

export const findAll = async () => {
    const result = await pool.query('SELECT * FROM pacientes');
    return result.rows;
}

export const findById = async (id) => {
    const result = await pool.query('SELECT * FROM pacientes WHERE id = $1', [id]);
    return result.rows[0];
}

export const findByEmail = async (email) => {
    const result = await pool.query('SELECT * FROM pacientes WHERE correo_paciente = $1', [email])
    return result.rows[0];
}

export const createPatient = async (nombre_paciente, correo_paciente) => {
    const result = await pool.query('INSERT INTO pacientes (nombre_paciente, correo_paciente) VALUES ($1, $2) RETURNING *',
    [nombre_paciente, correo_paciente]);
    return result.rows[0];
}

export const updatePatient = async (nombre_paciente, correo_paciente, id) => {
    const result = await pool.query(
        `UPDATE pacientes
        SET nombre_paciente = $1, correo_paciente = $2
        WHERE id = $3 RETURNING *`,
        [nombre_paciente, correo_paciente, id]
    );
    return result.rows[0];
}

export const deletePatient = async (id) => {
    const result = await pool.query(
        `DELETE FROM pacientes WHERE id = $1 RETURNING *`,
        [id]
    );
    return result.rows[0];
}