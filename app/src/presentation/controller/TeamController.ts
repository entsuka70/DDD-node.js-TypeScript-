import express from 'express';
import { PrismaClient } from 'prisma/prisma-client';
import TeamApplication from '../../app/application/team/TeamApplication';
import TeamRepository from '../../infra/repository/TeamRepository';
import PairRepository from '../../infra/repository/PairRepository';
import UserRepository from '../../infra/repository/UserRepository';
import TeamCreateCommand from '../../app/application/team/TeamCreateCommand';
import { RequestType } from '../../../@types';

const prisma = new PrismaClient();
const teamRepository = new TeamRepository(prisma);
const pairRepository = new PairRepository(prisma);
const userRepository = new UserRepository(prisma);
const teamApplication = new TeamApplication(
  teamRepository,
  pairRepository,
  userRepository
);

// チーム一覧取得
export function view(req: express.Request, res: express.Response) {
  (async () => {
    const teamAll = await teamApplication.findTeamAll();
    res.set({
      'content-type': 'application/json',
    });
    return res.status(200).json(teamAll);
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

// チーム更新
export function update(req: RequestType.Team, res: express.Response) {
  (async () => {
    await teamApplication.update(new TeamCreateCommand(req));
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
