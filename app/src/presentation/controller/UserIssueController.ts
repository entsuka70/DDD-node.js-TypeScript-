import express from 'express';
import { PrismaClient } from '.prisma/client';
import UserIssueApplication from '../../app/application/userIssue/UserIssueApplication';
import UserIssueGetCommand from '../../app/application/userIssue/UserIssueGetCommand';
import UserIssueUpdateCommand from '../../app/application/userIssue/UserIssueUpdateCommand';
import UserIssueRepository from '../../infra/repository/UserIssueRepository';
import UserIssueQueryService from '../../infra/queryservice/UserIssueQueryService';
import { RequestType } from '../../../@types';

const prisma = new PrismaClient();
const userIssueRepository = new UserIssueRepository(prisma);
const userIssueQueryService = new UserIssueQueryService(prisma);
const userIssueApplication = new UserIssueApplication(
  userIssueRepository,
  userIssueQueryService
);

// ユーザーが所有する情報一覧取得
export function view(req: RequestType.GetUserIssue, res: express.Response) {
  (async () => {
    const userAll = await userIssueApplication.findAll(
      new UserIssueGetCommand(req)
    );
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

// 条件に合致するユーザー一覧取得
export function user(req: RequestType.GetUserIssue, res: express.Response) {
  (async () => {
    const users = await userIssueApplication.findUsers(
      new UserIssueGetCommand(req)
    );
    res.set({
      'content-type': 'application/json',
    });
    return res.status(200).json(users);
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

// 課題更新
export function update(
  req: RequestType.UpdateUserIssue,
  res: express.Response
) {
  (async () => {
    await userIssueApplication.update(new UserIssueUpdateCommand(req));
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

// 課題削除
export function remove(
  req: RequestType.UpdateUserIssue,
  res: express.Response
) {
  (async () => {
    await userIssueApplication.delete(new UserIssueUpdateCommand(req));
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
