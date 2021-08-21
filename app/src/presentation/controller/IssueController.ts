import express from 'express';
import { PrismaClient } from '.prisma/client';
import IssueApplication from 'app/application/issue/IssueApplication';
import IssueRepository from 'infra/repository/IssueRepository';
import IssueCreateCommand from 'app/application/issue/IssueCreateCommand';
import IssueDeleteCommand from 'app/application/issue/IssueDeleteCommand';
import UserIssueRepository from 'infra/repository/UserIssueRepository';
import UserRepository from 'infra/repository/UserRepository';

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
  try {
    const issues = issueApplication.findAll();
    res.set({
      'content-type': 'application/json',
    });
    return res.status(200).json(issues);
  } catch (e) {
    return res.status(400).send(`Error: Issue View (${e.message})`);
  }
}

export function create(req: express.Request, res: express.Response) {
  try {
    issueApplication.create(new IssueCreateCommand(req));
    res.set({
      'content-type': 'application/json',
    });
    return res.status(200).send('Create Issue.');
  } catch (e) {
    return res.status(400).send(`Error: Issue Create (${e.message})`);
  }
}

export function remove(req: express.Request, res: express.Response) {
  try {
    issueApplication.delete(new IssueDeleteCommand(req));
    res.set({
      'content-type': 'application/json',
    });
    return res.status(200).send('Delete Issue.');
  } catch (e) {
    return res.status(400).send(`Error: Issue Delete (${e.message})`);
  }
}
