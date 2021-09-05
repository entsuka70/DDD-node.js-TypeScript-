import express from 'express';
import { PrismaClient } from '.prisma/client';
import PairApplication from 'src/app/application/pair/PairApplication';
import PairRepository from 'src/infra/repository/PairRepository';
import UserRepository from 'src/infra/repository/UserRepository';
import PairCreateCommand from 'src/app/application/pair/PairCreateCommand';
import { RequestType } from '../../../@types';

const prisma = new PrismaClient();
const pairRepository = new PairRepository(prisma);
const userRepository = new UserRepository(prisma);
const pairApplication = new PairApplication(pairRepository, userRepository);

// ペア一覧取得
export function view(req: RequestType.Pair, res: express.Response) {
  (async () => {
    const pairAll = await pairApplication.findPairAll();
    res.set({
      'content-type': 'application/json',
    });
    return res.status(200).json(pairAll);
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

// ペア更新
export function update(req: RequestType.Pair, res: express.Response) {
  (async () => {
    await pairApplication.update(new PairCreateCommand(req));
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
