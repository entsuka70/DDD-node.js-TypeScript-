import express from 'express';
import { PrismaClient } from ".prisma/client";
import UserIssueApplication from "app/application/userIssue/UserIssueApplication";
import UserIssueCommand from 'app/application/userIssue/UserIssueCommand';
import UserIssueRepository from "infra/repository/UserIssueRepository";

// ユーザーが所有する課題一覧取得
exports.view = async function (req: express.Request, res: express.Response) {
    const prisma = new PrismaClient();
    const userIssueRepository = new UserIssueRepository(prisma);
    const userIssueApplication = new UserIssueApplication(userIssueRepository);
    try {
        const userAll = await userIssueApplication.findAll();
        res.set({
            'content-type': 'application/json',
        });
        return res.status(200).json(userAll);
    } catch (e) {
        return res.status(400).send(`Error: User View (${e.message})`);
    }
}

// 課題更新
exports.update = async function (req: express.Request, res: express.Response) {
    const prisma = new PrismaClient();
    const userIssueRepository = new UserIssueRepository(prisma);
    const userIssueApplication = new UserIssueApplication(userIssueRepository);

    try {
        await userIssueApplication.update(new UserIssueCommand(req));
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
    const userIssueApplication = new UserIssueApplication(userIssueRepository);
    try {
        const userDelete = await userIssueApplication.delete(req.params.id);
        res.set({
            'content-type': 'text/plain',
        });
        return res.status(201).send('Delete success');
    } catch (e) {
        return res.status(400).send(`Error: User Delete (${e.message})`);
    }
}