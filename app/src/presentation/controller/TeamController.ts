import express from 'express';
import { PrismaClient } from ".prisma/client";
import TeamApplication from "app/application/users/TeamApplication";
import UserFactory from "domain/factory/users/user/UserFactory";
import UserRepository from "infra/repository/UserRepository";

// ユーザー一覧取得
exports.view = async function (req: express.Request, res: express.Response) {
    try {
        const prisma = new PrismaClient();
        const userFactory = new UserFactory();
        const userRepository = new UserRepository(prisma);
        const teamApplication = new TeamApplication(userRepository, userFactory);
        const teamAll = await teamApplication.findTeamAll();
        res.set({
            'content-type': 'application/json',
        });
        res.status(200).json(teamAll);
    } catch (e) {
        res.status(400).send(e.message);
    }
}

exports.update = async function (req: express.Request, res: express.Response) {
    try {
        const prisma = new PrismaClient();
        const userFactory = new UserFactory();
        const userRepository = new UserRepository(prisma);
        const teamApplication = new TeamApplication(userRepository, userFactory);

        // NOTE::user, team情報がPOSTされた時の対処必要
        const data = {
            'id': parseInt(req.params.id),
            'team_name': req.body.team_name ?? null,
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