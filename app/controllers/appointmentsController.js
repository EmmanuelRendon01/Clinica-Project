import * as appointmentModel from '../models/appointmentsModel.js';

export const getAllAppointments = async (req, res) => {
    try {
        const appointments = await appointmentModel.findAll();
        res.json(appointments);
    } catch (error) {
        console.error('Error in controller:', error);
        res.status(500).json({ error: 'Error to get appointments' })
    }
};

export const getAppointmentById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const appointment = await appointmentModel.findById(id);

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        res.json(appointment);
    } catch (error) {
        console.error('Error in controller:', error);
        res.status(500).json({ error: 'Error to get appointment' })
    }
};

export const getAppointmentByIdWithouthJoin = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const appointment = await appointmentModel.findByIdWithouthJoin(id);

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        res.json(appointment);
    } catch (error) {
        console.error('Error in controller:', error);
        res.status(500).json({ error: 'Error to get appointment' })
    }
};

export const getAppointmentByUserId = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const appointment = await appointmentModel.findByUserId(id);

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        res.json(appointment);
    } catch (error) {
        console.error('Error in controller:', error);
        res.status(500).json({ error: 'Error to get appointment' })
    }
};

export const createAppointment = async (req, res) => {
    try {
        let { fecha_cita, hora_cita, motivo, descripcion, id_ubicacion, id_metodo_pago, id_medico, id_estado, id_paciente } = req.body;

        // Convertir a número
        id_ubicacion = parseInt(id_ubicacion, 10);
        id_metodo_pago = parseInt(id_metodo_pago, 10);
        id_medico = parseInt(id_medico, 10);
        id_estado = parseInt(id_estado, 10);
        id_paciente = parseInt(id_paciente, 10);

        // Validar que no haya NaN
        if ( isNaN(id_ubicacion) || isNaN(id_metodo_pago) || isNaN(id_medico) || isNaN(id_estado) || isNaN(id_paciente)) {
            return res.status(400).json({ error: "Uno o más IDs no son válidos" });
        }

        const newAppointment = await appointmentModel.createAppointment( fecha_cita, hora_cita, motivo, descripcion, id_ubicacion, id_metodo_pago, id_medico, id_estado, id_paciente );

        res.status(201).json(newAppointment);
    } catch (error) {
        console.error("Error in controller:", error);
        res.status(500).json({ error: "Error to create appointment" });
    }
};

export const updateAppointment = async (req, res) => {
    try {
        let { fecha_cita, hora_cita, motivo, descripcion, id_ubicacion, id_metodo_pago, id_medico, id_estado, id_paciente, id } = req.body;

        id_ubicacion = parseInt(id_ubicacion, 10);
        id_metodo_pago = parseInt(id_metodo_pago, 10);
        id_medico = parseInt(id_medico, 10);
        id_estado = parseInt(id_estado, 10);
        id_paciente = parseInt(id_paciente, 10);
        id = parseInt(id, 10);

        // Validar que no haya NaN
        if (isNaN(id_ubicacion) || isNaN(id_metodo_pago) || isNaN(id_medico) || isNaN(id_estado) || isNaN(id_paciente) || isNaN(id)) {
            return res.status(400).json({ error: "Uno o más IDs no son válidos" });
        }

        const updatedAppointment = await appointmentModel.updateAppointment(fecha_cita, hora_cita, motivo, descripcion, id_ubicacion, id_metodo_pago, id_medico, id_estado, id_paciente, id);

        res.status(200).json(updatedAppointment);
    } catch (error) {
        console.error('Error in controller:', error);
        res.status(500).json({ error: 'Error to update appointment' })
    }
};

export const deleteAppointment = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const appointment = await appointmentModel.deleteAppointment(id);

        if (!appointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        res.status(200).json({ message: 'Appointment deleted successfully' });
    } catch (error) {
        console.error('Error in controller:', error);
        res.status(500).json({ error: 'Error to delete appointment' })
    }
};

