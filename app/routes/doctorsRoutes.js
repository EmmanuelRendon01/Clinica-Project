import { Router } from "express";
import * as doctorsController from '../controllers/doctorsController.js';

const router = Router();

router.get('/', doctorsController.getAllDoctors);
router.get('/id/:id', doctorsController.getDoctorsById);

router.post('/', doctorsController.createDoctor);
router.put('/', doctorsController.updateDoctor);
router.delete('/', doctorsController.deleteDoctor)

export default router;