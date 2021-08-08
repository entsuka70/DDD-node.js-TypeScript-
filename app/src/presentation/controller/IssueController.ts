import express from 'express';
import { PrismaClient } from ".prisma/client";
import IssueApplication from "app/application/issue/IssueApplication";
import IssueRepository from "infra/repository/IssueRepository";

// 課題一覧取得
exports.view = async function (req: express.Request, res: express.Response) {
    const prisma = new PrismaClient();
    const issueRepository = new IssueRepository(prisma);
    const issueApplication = new IssueApplication(issueRepository);
    try {
        const issues = await issueApplication.findAll();
        res.set({
            'content-type': 'application/json',
        });
        return res.status(200).json(issues);
    } catch (e) {
        return res.status(400).send(`Error: User View (${e.message})`);
    }
}