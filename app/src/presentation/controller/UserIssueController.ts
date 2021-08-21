import express from 'express';
import { PrismaClient } from '.prisma/client';
import UserIssueApplication from 'app/application/userIssue/UserIssueApplication';
import UserIssueGetCommand from 'app/application/userIssue/UserIssueGetCommand';
import UserIssueUpdateCommand from 'app/application/userIssue/UserIssueUpdateCommand';
import UserIssueRepository from 'infra/repository/UserIssueRepository';
import UserIssueQueryService from 'infra/queryservice/UserIssueQueryService';

const prisma = new PrismaClient();
const userIssueRepository = new UserIssueRepository(prisma);
const userIssueQueryService = new UserIssueQueryService(prisma);
const userIssueApplication = new UserIssueApplication(
  userIssueRepository,
  userIssueQueryService
);

// ユーザーが所有する情報一覧取得
export function view(req: express.Request, res: express.Response) {
  try {
    const userAll = userIssueApplication.findAll(new UserIssueGetCommand(req));
    res.set({
      'content-type': 'application/json',
    });
    return res.status(200).json(userAll);
  } catch (e) {
    return res.status(400).send(`Error: User View (${e.message})`);
  }
}

// 条件に合致するユーザー一覧取得
export function user(req: express.Request, res: express.Response) {
  try {
    const users = userIssueApplication.findUsers(new UserIssueGetCommand(req));
    res.set({
      'content-type': 'application/json',
    });
    return res.status(200).json(users);
  } catch (e) {
    return res.status(400).send(`Error: User View (${e.message})`);
  }
}

// 課題更新
export function update(req: express.Request, res: express.Response) {
  try {
    userIssueApplication.update(new UserIssueUpdateCommand(req));
    res.set({
      'content-type': 'text/plain',
    });
    return res.status(201).send('Update success');
  } catch (e) {
    return res.status(400).send(`Error: User Update (${e.message})`);
  }
}

// 課題削除
export function remove(req: express.Request, res: express.Response) {
  try {
    userIssueApplication.delete(new UserIssueUpdateCommand(req));
    res.set({
      'content-type': 'text/plain',
    });
    return res.status(201).send('Delete success');
  } catch (e) {
    return res.status(400).send(`Error: User Delete (${e.message})`);
  }
}
