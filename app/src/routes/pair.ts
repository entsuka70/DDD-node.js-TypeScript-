import express from 'express';
import { view, update } from 'src/presentation/controller/PairController';

const router = express.Router();

router.get('/pair', view);
router.post('/pair/:id', update);

export default router;
