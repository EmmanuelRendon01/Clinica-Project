import pool from "../../config/db.js";

export const findAll = async () => {
    const result = await pool.query('SELECT * FROM medicos');
    return result.rows;
}

export const findById = async (id) => {
    const result = await pool.query('SELECT * FROM medicos WHERE id = $1', [id]);
    return result.rows[0];
}

export const createDoctor = async (nombre_medico) => {
    const result = await pool.query('INSERT INTO medicos (nombre_medico) VALUES ($1) RETURNING *',
    [nombre_medico]);
    return result.rows[0];
}

export const updateDoctor = async (nombre_medico, id) => {
    const result = await pool.query(
        `UPDATE medicos
        SET nombre_medico = $1
        WHERE id = $2 RETURNING *`,
        [nombre_medico, id]
    );
    return result.rows[0];
}

export const deleteDoctor = async (id) => {
    const result = await pool.query(
        `DELETE FROM medicos WHERE id = $1 RETURNING *`,
        [id]
    );
    return result.rows[0];
}