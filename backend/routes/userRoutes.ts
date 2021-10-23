import express, { Router } from 'express';
import authMiddleWare from '../Middlewares/authMiddleware';
import { updateUser, getUser, createUser } from '../controllers/UserController/userController';

const router: Router = express.Router();

router.patch('/user', authMiddleWare, updateUser);
router.get('/user', authMiddleWare, getUser);
router.post('/user', createUser);

export default router;
