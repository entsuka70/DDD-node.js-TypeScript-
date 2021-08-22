import express from 'express';
import { PrismaClient } from '.prisma/client';
import IssueApplication from 'app/application/issue/IssueApplication';
import IssueRepository from 'infra/repository/IssueRepository';
import IssueCreateCommand from 'app/application/issue/IssueCreateCommand';
import IssueDeleteCommand from 'app/application/issue/IssueDeleteCommand';
import UserIssueRepository from 'infra/repository/UserIssueRepository';
import UserRepository from 'infra/repository/UserRepository';
import { RequestType } from '../../../@types';

const prisma = new PrismaClient();
const issueRepository = new IssueRepository(prisma);
const userIssueRepository = new UserIssueRepository(prisma);
const userRepository = new UserRepository(prisma);
const issueApplication = new IssueApplication(
  issueRepository,
  userIssueRepository,
  userRepository
);

// 課題一覧取得
export function view(req: express.Request, res: express.Response) {
  (async () => {
    const issues = await issueApplication.findAll();
    res.set({
      'content-type': 'application/json',
    });
    return res.status(200).json(issues);
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

export function create(req: RequestType.CreateIssue, res: express.Response) {
  (async () => {
    await issueApplication.create(new IssueCreateCommand(req));
    res.set({
      'content-type': 'application/json',
    });
    return res.status(200).send('Create Issue.');
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

export function remove(req: RequestType.DeleteIssue, res: express.Response) {
  (async () => {
    await issueApplication.delete(new IssueDeleteCommand(req));
    res.set({
      'content-type': 'application/json',
    });
    return res.status(200).send('Delete Issue.');
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
