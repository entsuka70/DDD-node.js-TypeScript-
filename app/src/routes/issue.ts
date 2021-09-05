import express from 'express';
import {
  view,
  create,
  remove,
} from 'src/presentation/controller/IssueController';

const router = express.Router();

router.get('/issue', view);
router.post('/issue', create);
router.delete('/issue/:id', remove);

export default router;
