import * as doctorsModel from '../models/doctorsModel.js';

export const getAllDoctors = async (req, res) => {
    try {
        const doctors = await doctorsModel.findAll();
        res.json(doctors);
    } catch (error) {
        console.error('Error in controller:', error);
        res.status(500).json({ error: 'Error to get doctors' })
    }
};

export const getDoctorsById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const doctor = await doctorsModel.findById(id);

        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        res.json(doctor);
    } catch (error) {
        console.error('Error in controller:', error);
        res.status(500).json({ error: 'Error to get Doctor' })
    }
};

export const createDoctor = async (req, res) => {
    try {
        const { nombre_medico } = req.body;

        const newDoctor = await doctorsModel.createDoctor( nombre_medico );

        res.status(201).json(newDoctor);
    } catch (error) {
        console.error('Error in controller:', error);
        res.status(500).json({ error: 'Error to create doctor' })
    }
};

export const updateDoctor = async (req, res) => {
    try {
        const { nombre_medico, id } = req.body;

        const updatedDoctor = await doctorsModel.updateDoctor(nombre_medico, id);

        res.status(200).json(updatedDoctor);
    } catch (error) {
        console.error('Error in controller:', error);
        res.status(500).json({ error: 'Error to update doctor' })
    }
};

export const deleteDoctor = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const doctor = await doctorsModel.deleteDoctor(id);

        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' });
        }

        res.status(200).json({ message: 'Doctor deleted successfully' });
    } catch (error) {
        console.error('Error in controller:', error);
        res.status(500).json({ error: 'Error to delete doctor' })
    }
};

