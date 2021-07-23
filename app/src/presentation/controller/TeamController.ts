import express from 'express';
import { PrismaClient } from ".prisma/client";
import TeamApplication from "app/application/team/TeamApplication";
import UserRepository from "infra/repository/UserRepository";

// チーム一覧取得
exports.view = async function (req: express.Request, res: express.Response) {
    try {
        const prisma = new PrismaClient();
        const userRepository = new UserRepository(prisma);
        const teamApplication = new TeamApplication(userRepository);
        const teamAll = await teamApplication.findTeamAll();
        res.set({
            'content-type': 'application/json',
        });
        res.status(200).json(teamAll);
    } catch (e) {
        res.status(400).send(e.message);
    }
}

// チーム更新
exports.update = async function (req: express.Request, res: express.Response) {
    try {
        const prisma = new PrismaClient();
        const userRepository = new UserRepository(prisma);
        const teamApplication = new TeamApplication(userRepository);

        type Props = {
            id: string
            belong: boolean
            team_name: string
        }
        const data: Props = {
            'id': req.params.id,
            'belong': req.body.belong,
            'team_name': req.body.team_name,
        };

        await teamApplication.update(data);
        res.set({
            'content-type': 'text/plain',
        });
        res.status(201).send('Update success');
    } catch (e) {
        res.status(400).send(e.message);
    }
}