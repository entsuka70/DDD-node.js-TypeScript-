import express from 'express';
import {
  view,
  user,
  update,
  remove,
} from '../presentation/controller/UserIssueController';

const router = express.Router();
router.get('/userissue', view);
router.get('/userissue/user', user);
router.post('/userissue/:id/user/:user_id/issue/:issue_id', update);
router.delete('/userissue/:id/user/:user_id/issue/:issue_id', remove);

export default router;
