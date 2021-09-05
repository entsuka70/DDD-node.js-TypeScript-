import { Request, Response } from 'express';
import { PrismaClient } from '.prisma/client';
import UserApplication from 'src/app/application/user/UserApplication';
import UserCreateCommand from 'src/app/application/user/UserCreateCommand';
import UserUpdateCommand from 'src/app/application/user/UserUpdateCommand';
import UserRepository from 'src/infra/repository/UserRepository';
import PairRepository from 'src/infra/repository/PairRepository';
import { RequestType } from '../../../@types';

const prisma = new PrismaClient();
const userRepository = new UserRepository(prisma);
const pairRepository = new PairRepository(prisma);
const userApplication = new UserApplication(userRepository, pairRepository);

// ユーザー一覧取得
export function view(req: Request, res: Response) {
  (async () => {
    const userAll = await userApplication.findAll();
    res.set({
      'content-type': 'application/json',
    });
    return res.status(200).json(userAll);
  })().catch((e) => {
    if (e instanceof ReferenceError) {
      console.error(e.message);
      return res.status(400).send(e.message);
    } else {
      console.error('Unexpected Error Happend !!');
      console.error(e);
      return res.status(400).send('Unexpected Error Happend !!');
    }
  });
}

// ユーザー新規作成
export function create(req: RequestType.CreateUser, res: Response) {
  (async () => {
    await userApplication.create(new UserCreateCommand(req));
    res.set({
      'content-type': 'text/plain',
    });
    return res
      .status(201)
      .send(
        `Create User: UserName ${req.body.user_name}, Email ${req.body.email}`
      );
  })().catch((e) => {
    if (e instanceof ReferenceError) {
      console.error(e.message);
      return res.status(400).send(e.message);
    } else {
      console.error('Unexpected Error Happend !!');
      console.error(e);
      return res.status(400).send('Unexpected Error Happend !!');
    }
  });
}

// ユーザー更新
export function update(req: RequestType.UpdateUser, res: Response) {
  (async () => {
    await userApplication.update(new UserUpdateCommand(req));
    res.set({
      'content-type': 'text/plain',
    });
    return res.status(201).send('Update success');
  })().catch((e) => {
    if (e instanceof ReferenceError) {
      console.error(e.message);
      return res.status(400).send(e.message);
    } else {
      console.error('Unexpected Error Happend !!');
      console.error(e);
      return res.status(400).send('Unexpected Error Happend !!');
    }
  });
}

// ユーザー削除
export function remove(req: RequestType.DeleteUser, res: Response) {
  (async () => {
    await userApplication.delete(req.params.id);
    res.set({
      'content-type': 'text/plain',
    });
    return res.status(201).send('Delete success');
  })().catch((e) => {
    if (e instanceof ReferenceError) {
      console.error(e.message);
      return res.status(400).send(e.message);
    } else {
      console.error('Unexpected Error Happend !!');
      console.error(e);
      return res.status(400).send('Unexpected Error Happend !!');
    }
  });
}
