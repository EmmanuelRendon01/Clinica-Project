import * as patientsModel from '../models/patientsModel.js';

export const getAllPatients = async (req, res) => {
    try {
        const patients = await patientsModel.findAll();
        res.json(patients);
    } catch (error) {
        console.error('Error in controller:', error);
        res.status(500).json({ error: 'Error to get patients' })
    }
};

export const getPatientsById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const patient = await patientsModel.findById(id);

        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        res.json(patient);
    } catch (error) {
        console.error('Error in controller:', error);
        res.status(500).json({ error: 'Error to get patient' })
    }
};

export const getPatientsByEmail = async (req, res) => {
    try {
        const email = req.params.email;
        const patient = await patientsModel.findByEmail(email);

        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        res.json(patient);
    } catch (error) {
        console.error('Error in controller:', error);
        res.status(500).json({ error: 'Error to get patient' })
    }
};

export const createPatient = async (req, res) => {
    try {
        const { nombre_paciente, correo_paciente } = req.body;

        const newPatient = await patientsModel.createPatient(nombre_paciente, correo_paciente);

        res.status(201).json(newPatient);
    } catch (error) {
        console.error('Error in controller:', error);
        res.status(500).json({ error: 'Error to create patient' })
    }
};

export const updatePatient = async (req, res) => {
    try {
        const { nombre_paciente, correo_paciente, id } = req.body;

        const updatedPatient = await patientsModel.updatePatient(nombre_paciente, correo_paciente, id);

        res.status(200).json(updatedPatient);
    } catch (error) {
        console.error('Error in controller:', error);
        res.status(500).json({ error: 'Error to update patient' })
    }
};

export const deletePatient = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const patient = await patientsModel.deletePatient(id);

        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }

        res.status(200).json({ message: 'Patient deleted successfully' });
    } catch (error) {
        console.error('Error in controller:', error);
        res.status(500).json({ error: 'Error to delete patient' })
    }
};

