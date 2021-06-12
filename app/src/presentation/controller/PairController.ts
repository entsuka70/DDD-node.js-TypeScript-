import express from 'express';
import { PrismaClient } from ".prisma/client";
import PairApplication from "app/application/users/PairApplication";
import UserFactory from "domain/factory/users/user/UserFactory";
import UserRepository from "infra/repository/UserRepository";

// ユーザー一覧取得
exports.view = async function (req: express.Request, res: express.Response) {
    try {
        const prisma = new PrismaClient();
        const userFactory = new UserFactory();
        const userRepository = new UserRepository(prisma);
        const pairApplication = new PairApplication(userRepository, userFactory);
        const pairAll = await pairApplication.findPairAll();
        res.set({
            'content-type': 'application/json',
        });
        res.status(200).json(pairAll);
    } catch (e) {
        res.status(400).send(e.message);
    }
}

exports.update = async function (req: express.Request, res: express.Response) {
    try {
        const prisma = new PrismaClient();
        const userFactory = new UserFactory();
        const userRepository = new UserRepository(prisma);
        const pairApplication = new PairApplication(userRepository, userFactory);

        // NOTE::user, team情報がPOSTされた時の対処必要
        const data = {
            'id': parseInt(req.params.id),
            'pair_name': req.body.pair_name ?? null,
            'teams_id': req.body.teams_id ?? null,
            // 'team_name': req.body.pair.team.team_name ?? null,
        };

        await pairApplication.update(data);
        res.set({
            'content-type': 'text/plain',
        });
        res.status(201).send('Update success');
    } catch (e) {
        res.status(400).send(e.message);
    }
}
