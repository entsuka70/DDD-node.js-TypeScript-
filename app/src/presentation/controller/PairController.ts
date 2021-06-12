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
        const userAll = await pairApplication.findPairAll();
        res.set({
            'content-type': 'application/json',
        });
        res.status(200).json(userAll);
    } catch (e) {
        res.status(400).send(e.message);
    }
}

// 仕様変更により不要
// TODO:利用には修正必要
// exports.create = async function (req: express.Request, res: express.Response) {
//     try {
//         const prisma = new PrismaClient();
//         const userFactory = new UserFactory();
//         const userRepository = new UserRepository(prisma);
//         const pairApplication = new PairApplication(userRepository, userFactory);
//         const data = {
//             'user_name': req.body.user_name,
//             'email': req.body.email
//         }
//         const userCreate = await pairApplication.create(data);
//         res.set({
//             'content-type': 'text/plain',
//         });
//         res.status(201).send('Create : ' + req.body.user_name + ', ' + req.body.email)
//     } catch (e) {
//         res.status(400).send(e.message);
//     }
// }

exports.update = async function (req: express.Request, res: express.Response) {
    try {
        const prisma = new PrismaClient();
        const userFactory = new UserFactory();
        const userRepository = new UserRepository(prisma);
        const pairApplication = new PairApplication(userRepository, userFactory);

        // NOTE::user, team情報がPOSTされた時の対処必要
        const data = {
            'id': parseInt(req.params.id),
            'pair_name': req.body.pair.pair_name ?? null,
            'teams_id': req.body.pair.teams_id ?? null,
            // 'team_name': req.body.pair.team.team_name ?? null,
        };

        const userUpdate = await pairApplication.update(data);
        res.set({
            'content-type': 'text/plain',
        });
        res.status(201).send('Update success');
    } catch (e) {
        res.status(400).send(e.message);
    }
}

// 仕様変更により不要
// TODO:利用には修正必要
// exports.delete = async function (req: express.Request, res: express.Response) {
//     try {
//         const prism = new PrismaClient();
//         const userFactory = new UserFactory();
//         const userRepository = new UserRepository(prism);
//         const pairApplication = new PairApplication(userRepository, userFactory);
//         const userDelete = await pairApplication.delete(parseInt(req.params.id));
//         res.set({
//             'content-type': 'text/plain',
//         });
//         res.status(201).send('Delete success');
//     } catch (e) {
//         res.status(400).send(e.message);
//     }
// }