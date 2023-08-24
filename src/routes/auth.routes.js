import { Router } from 'express';
import { login, registerCompany, registerUser } from '../controllers/auth.controller.js';

const router = Router();


router.post('/register', registerUser);
router.post('/register/company', registerCompany);
router.post('/login', login);

export default router;