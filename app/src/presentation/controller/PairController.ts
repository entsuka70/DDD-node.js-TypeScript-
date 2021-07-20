import express from 'express';
import { PrismaClient } from ".prisma/client";
import PairApplication from "app/application/users/PairApplication";
import PairRepository from "infra/repository/PairRepository";
import UserRepository from "infra/repository/UserRepository";

// ペア一覧取得
exports.view = async function (req: express.Request, res: express.Response) {
    try {
        const prisma = new PrismaClient();
        const pairRepository = new PairRepository(prisma);
        const userRepository = new UserRepository(prisma);
        const pairApplication = new PairApplication(pairRepository, userRepository);
        const pairAll = await pairApplication.findPairAll();
        res.set({
            'content-type': 'application/json',
        });
        res.status(200).json(pairAll);
    } catch (e) {
        res.status(400).send(e.message);
    }
}

// ペア更新
exports.update = async function (req: express.Request, res: express.Response) {
    try {
        const prisma = new PrismaClient();
        const pairRepository = new PairRepository(prisma);
        const userRepository = new UserRepository(prisma);
        const pairApplication = new PairApplication(pairRepository, userRepository);

        // NOTE::user, team情報がPOSTされた時の対処必要
        const data = {
            'id': parseInt(req.params.id),
            'pair_name': req.body.pair_name,
            'teams_id': parseInt(req.body.teams_id),
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
