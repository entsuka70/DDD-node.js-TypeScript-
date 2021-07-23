import express from 'express';
import { PrismaClient } from ".prisma/client";
import UserApplication from "app/application/user/UserApplication";
import UserCreateCommand from 'app/application/user/UserCreateCommand';
import UserRepository from "infra/repository/UserRepository";
import PairRepository from "infra/repository/PairRepository"

// ユーザー一覧取得
exports.view = async function (req: express.Request, res: express.Response) {
    const prisma = new PrismaClient();
    const userRepository = new UserRepository(prisma);
    const pairRepository = new PairRepository(prisma);
    const userApplication = new UserApplication(userRepository, pairRepository);
    try {
        const userAll = await userApplication.findUserAll();
        res.set({
            'content-type': 'application/json',
        });
        res.status(200).json(userAll);
    } catch (e) {
        res.status(400).send(`Error: User View (${e.message})`);
    }
}

// ユーザー新規作成
exports.create = async function (req: express.Request, res: express.Response) {
    const prisma = new PrismaClient();
    const userRepository = new UserRepository(prisma);
    const pairRepository = new PairRepository(prisma);
    const userApplication = new UserApplication(userRepository, pairRepository);

    type Props = {
        id: string
        pair_id: string
        team_id: string
        status: number
        user_name: string
        email: string
    }

    const data: Props = {
        'id': req.body.id,
        'pair_id': req.body.pair_id,
        'team_id': req.body.team_id,
        'status': req.body.status,
        'user_name': req.body.user_name,
        'email': req.body.email,
    }

    try {
        const userCreate = await userApplication.create(new UserCreateCommand(data));
        res.set({
            'content-type': 'text/plain',
        });
        res.status(201).send('Create : ' + req.body.user_name + ', ' + req.body.email)
    } catch (e) {
        res.status(400).send(`Error: User Create (${e.message})`);
    }
}

// ユーザー更新
exports.update = async function (req: express.Request, res: express.Response) {
    const prisma = new PrismaClient();
    const userRepository = new UserRepository(prisma);
    const pairRepository = new PairRepository(prisma);
    const userApplication = new UserApplication(userRepository, pairRepository);

    type Props = {
        id: string
        pair_id: string
        team_id: string
        status: number
        user_name: string
        email: string
    };

    const data: Props = {
        'id': req.body.id,
        'pair_id': req.body.pair_id,
        'team_id': req.body.team_id,
        'status': req.body.status,
        'user_name': req.body.user_name,
        'email': req.body.email,
    };

    try {
        const userUpdate = await userApplication.update(new UserCreateCommand(data));
        res.set({
            'content-type': 'text/plain',
        });
        res.status(201).send('Update success');
    } catch (e) {
        res.status(400).send(`Error: User Update (${e.message})`);
    }
}

// ユーザー削除
exports.delete = async function (req: express.Request, res: express.Response) {
    const prisma = new PrismaClient();
    const userRepository = new UserRepository(prisma);
    const pairRepository = new PairRepository(prisma);
    const userApplication = new UserApplication(userRepository, pairRepository);
    try {
        const userDelete = await userApplication.delete(req.params.id);
        res.set({
            'content-type': 'text/plain',
        });
        res.status(201).send('Delete success');
    } catch (e) {
        res.status(400).send(`Error: User Delete (${e.message})`);
    }
}