import { Router } from "express";
import { addUserService, createService, getServicesByCompany, getServicesByUser, updateService } from "../controllers/service.controller.js";

const router = Router();

router.post('/:id', createService);
router.put('/update/:id', updateService);
router.post('/add/:user_id/service/:service_id', addUserService);
router.get('/company/:id', getServicesByCompany);
router.get('/user/:id', getServicesByUser);


export default router;