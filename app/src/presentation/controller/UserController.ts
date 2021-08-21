import { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '.prisma/client';
import UserApplication from 'app/application/user/UserApplication';
import UserCreateCommand from 'app/application/user/UserCreateCommand';
import UserRepository from 'infra/repository/UserRepository';
import PairRepository from 'infra/repository/PairRepository';
import { RequestType } from '../../../@types';

const prisma = new PrismaClient();
const userRepository = new UserRepository(prisma);
const pairRepository = new PairRepository(prisma);
const userApplication = new UserApplication(userRepository, pairRepository);

// ユーザー一覧取得
export function view(req: Request, res: Response) {
  try {
    const userAll = userApplication.findAll();
    res.set({
      'content-type': 'application/json',
    });
    return res.status(200).json(userAll);
  } catch (e) {
    if (e instanceof ReferenceError) {
      console.error(e.message);
      return res.status(400).send(e.message);
    } else {
      console.error('Unexpected Error Happend !!');
      return res.status(400).send('Unexpected Error Happend !!');
    }
  }
}

// ユーザー新規作成
export function create(
  req: RequestType.User,
  res: Response,
  next: NextFunction
) {
  (async () => {
    try {
      await userApplication.create(new UserCreateCommand(req));
      res.set({
        'content-type': 'text/plain',
      });
      return res
        .status(201)
        .send(
          `Create User: UserName ${req.body.user_name}, Email ${req.body.email}`
        );
    } catch (e) {
      if (e instanceof ReferenceError) {
        console.error(e.message);
        return res.status(400).send(e.message);
      } else {
        console.error('Unexpected Error Happend !!');
        return res.status(400).send('Unexpected Error Happend !!');
      }
    }
  })().catch(next);
}

// ユーザー更新
export function update(
  req: RequestType.User,
  res: Response,
  next: NextFunction
) {
  (async () => {
    try {
      await userApplication.update(new UserCreateCommand(req));
      res.set({
        'content-type': 'text/plain',
      });
      return res.status(201).send('Update success');
    } catch (e) {
      if (e instanceof ReferenceError) {
        console.error(e.message);
        return res.status(400).send(e.message);
      } else {
        console.error('Unexpected Error Happend !!');
        return res.status(400).send('Unexpected Error Happend !!');
      }
    }
  })().catch(next);
}

// ユーザー削除
export function remove(
  req: RequestType.User,
  res: Response,
  next: NextFunction
) {
  (async () => {
    try {
      await userApplication.delete(req.params.id);
      res.set({
        'content-type': 'text/plain',
      });
      return res.status(201).send('Delete success');
    } catch (e) {
      if (e instanceof ReferenceError) {
        console.error(e.message);
        return res.status(400).send(e.message);
      } else {
        console.error('Unexpected Error Happend !!');
        return res.status(400).send('Unexpected Error Happend !!');
      }
    }
  })().catch(next);
}
