import { Router } from "express";
import { addSkills, deleteUser, getUserById, getUsers, updateUser } from "../controllers/user.controller.js";

const router = Router();


router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/update/:id', updateUser);
router.put('/delete/:id', deleteUser);
router.post('/add/skills/:id', addSkills);



export default router;