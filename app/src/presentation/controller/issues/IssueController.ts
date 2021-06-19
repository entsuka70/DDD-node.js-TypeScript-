import express from 'express';
import { PrismaClient } from ".prisma/client";
import IssueApplication from "app/application/issues/IssueApplication";
import IssueFactory from "domain/factory/issues/issue/IssueFactory";
import IssueRepository from "infra/repository/IssueRepository";

/**
 * 課題プレゼンテーション層
 * 課題の更新
 * method: POST
 * URI: issue/:id
 * data: {object}
 * @param {express.Request} req
 * @param {express.Response} res
 */
exports.update = async function (req: express.Request, res: express.Response) {
    try {
        const prisma = new PrismaClient();
        const issueFactory = new IssueFactory();
        const issueRepository = new IssueRepository(prisma);
        const issueApplication = new IssueApplication(issueRepository, issueFactory);

        const data = {
            'id': parseInt(req.params.id),
            'issue_name': req.body.issue_name,
            'issue_group_id': parseInt(req.body.issue_group_id),
        };

        await issueApplication.update(data);
        res.set({
            'content-type': 'text/plain',
        });
        res.status(201).send('Issue Update success');
    } catch (e) {
        res.status(400).send(e.message);
    }
}