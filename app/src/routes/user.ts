import express from 'express';
import {
  view,
  create,
  update,
  remove,
} from 'src/presentation/controller/UserController';

const user = express.Router();

user.get('/user', view);
user.post('/user', create);
user.post('/user/:id', update);
user.delete('/user/:id', remove);

export default user;
