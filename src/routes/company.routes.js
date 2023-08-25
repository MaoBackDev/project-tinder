import { Router } from "express";
import { deleteCompany, getCompany, updatecompany } from "../controllers/company.controller.js";


const router = Router();

router.get('/:id', getCompany);
router.get('/update/:id', updatecompany);
router.get('/delete/:id', deleteCompany);


export default router;