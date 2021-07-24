import express from 'express';
import { PrismaClient } from ".prisma/client";
import PairApplication from "app/application/pair/PairApplication";
import PairRepository from "infra/repository/PairRepository";
import UserRepository from "infra/repository/UserRepository";
import PairCreateCommand from 'app/application/pair/PairCreateCommand';

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

        await pairApplication.update(new PairCreateCommand(req));
        res.set({
            'content-type': 'text/plain',
        });
        res.status(201).send('Update success');
    } catch (e) {
        res.status(400).send(e.message);
    }
}
