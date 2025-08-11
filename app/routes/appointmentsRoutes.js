import { Router } from "express";
import * as appointmentsController from '../controllers/appointmentsController.js';

const router = Router();

router.get('/', appointmentsController.getAllAppointments);
router.get('/id/:id', appointmentsController.getAppointmentById);
router.get('/userid/:id', appointmentsController.getAppointmentByUserId);
router.get('/wjoin/:id', appointmentsController.getAppointmentByIdWithouthJoin);

router.post('/', appointmentsController.createAppointment);
router.put('/', appointmentsController.updateAppointment);
router.delete('/id/:id', appointmentsController.deleteAppointment);

export default router;