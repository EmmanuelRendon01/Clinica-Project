import { Router } from "express";
import * as patientsController from '../controllers/patientsController.js';

const router = Router();

router.get('/', patientsController.getAllPatients);
router.get('/id/:id', patientsController.getPatientsById);
router.get('/email/:email', patientsController.getPatientsByEmail);

router.post('/', patientsController.createPatient);
router.put('/', patientsController.updatePatient);
router.delete('/', patientsController.deletePatient)

export default router;