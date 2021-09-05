import express from 'express';
import { view, update } from 'src/presentation/controller/TeamController';

const router = express.Router();

router.get('/team', view);
router.post('/team/:id', update);

export default router;
