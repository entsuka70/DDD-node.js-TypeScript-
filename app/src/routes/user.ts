import express from 'express';
import {
  view,
  create,
  update,
  remove,
} from '../presentation/controller/UserController';

const router = express.Router();

router.get('/user', view);
router.post('/user', create);
router.post('/user/:id', update);
router.delete('/user/:id', remove);

export default router;
