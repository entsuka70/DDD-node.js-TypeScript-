import express from 'express';
import { PrismaClient } from '.prisma/client';
import PairApplication from 'app/application/pair/PairApplication';
import PairRepository from 'infra/repository/PairRepository';
import UserRepository from 'infra/repository/UserRepository';
import PairCreateCommand from 'app/application/pair/PairCreateCommand';

const prisma = new PrismaClient();
const pairRepository = new PairRepository(prisma);
const userRepository = new UserRepository(prisma);
const pairApplication = new PairApplication(pairRepository, userRepository);

// ペア一覧取得
exports.view = async function (req: express.Request, res: express.Response) {
  try {
    const pairAll = await pairApplication.findPairAll();
    res.set({
      'content-type': 'application/json',
    });
    return res.status(200).json(pairAll);
  } catch (e) {
    return res.status(400).send(e.message);
  }
};

// ペア更新
exports.update = async function (req: express.Request, res: express.Response) {
  try {
    await pairApplication.update(new PairCreateCommand(req));
    res.set({
      'content-type': 'text/plain',
    });
    return res.status(201).send('Update success');
  } catch (e) {
    return res.status(400).send(e.message);
  }
};
