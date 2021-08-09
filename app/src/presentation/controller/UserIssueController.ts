import express from 'express';
import { PrismaClient } from ".prisma/client";
import UserIssueApplication from "app/application/userIssue/UserIssueApplication";
import UserIssueGetCommand from 'app/application/userIssue/UserIssueGetCommand';
import UserIssueCreateCommand from 'app/application/userIssue/UserIssueCreateCommand';
import UserIssueUpdateCommand from 'app/application/userIssue/UserIssueUpdateCommand';
import UserIssueRepository from "infra/repository/UserIssueRepository";
import UserIssueQueryService from 'infra/queryservice/UserIssueQueryService';

// ユーザーが所有する情報一覧取得
exports.view = async function (req: express.Request, res: express.Response) {
    const prisma = new PrismaClient();
    const userIssueRepository = new UserIssueRepository(prisma);
    const userIssueQueryService = new UserIssueQueryService(prisma);
    const userIssueApplication = new UserIssueApplication(userIssueRepository, userIssueQueryService);
    try {
        const userAll = await userIssueApplication.findAll(new UserIssueGetCommand(req));
        res.set({
            'content-type': 'application/json',
        });
        return res.status(200).json(userAll);
    } catch (e) {
        return res.status(400).send(`Error: User View (${e.message})`);
    }
}

// 条件に合致するユーザー一覧取得
exports.user = async function (req: express.Request, res: express.Response) {
    const prisma = new PrismaClient();
    const userIssueRepository = new UserIssueRepository(prisma);
    const userIssueQueryService = new UserIssueQueryService(prisma);
    const userIssueApplication = new UserIssueApplication(userIssueRepository, userIssueQueryService);
    try {
        const users = await userIssueApplication.findUsers(new UserIssueGetCommand(req));
        res.set({
            'content-type': 'application/json',
        });
        return res.status(200).json(users);
    } catch (e) {
        return res.status(400).send(`Error: User View (${e.message})`);
    }
}

// 課題更新
exports.update = async function (req: express.Request, res: express.Response) {
    const prisma = new PrismaClient();
    const userIssueRepository = new UserIssueRepository(prisma);
    const userIssueQueryService = new UserIssueQueryService(prisma);
    const userIssueApplication = new UserIssueApplication(userIssueRepository, userIssueQueryService);

    try {
        await userIssueApplication.update(new UserIssueUpdateCommand(req));
        res.set({
            'content-type': 'text/plain',
        });
        return res.status(201).send('Update success');
    } catch (e) {
        return res.status(400).send(`Error: User Update (${e.message})`);
    }
}

// 課題削除
exports.delete = async function (req: express.Request, res: express.Response) {
    const prisma = new PrismaClient();
    const userIssueRepository = new UserIssueRepository(prisma);
    const userIssueQueryService = new UserIssueQueryService(prisma);
    const userIssueApplication = new UserIssueApplication(userIssueRepository, userIssueQueryService);

    try {
        const userDelete = await userIssueApplication.delete(new UserIssueUpdateCommand(req));
        res.set({
            'content-type': 'text/plain',
        });
        return res.status(201).send('Delete success');
    } catch (e) {
        return res.status(400).send(`Error: User Delete (${e.message})`);
    }
}