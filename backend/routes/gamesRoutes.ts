import express, { Router } from 'express';
import { addGameToList, getAllGames } from '../controllers/GameController/gameController';
import authMiddleware from '../Middlewares/authMiddleware';

const router: Router = express.Router();

router.post('/games', authMiddleware, addGameToList);
router.get('/games', authMiddleware, getAllGames);

export default router;
