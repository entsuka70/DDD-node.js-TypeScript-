import express from 'express';
import { PrismaClient } from ".prisma/client";
import UserApplication from "app/application/users/UserApplication";
import UserFactory from "domain/factory/users/user/UserFactory";
import UserRepository from "infra/repository/UserRepository";

// ユーザー一覧取得
exports.view = async function (req: express.Request, res: express.Response) {
    try {
        const prisma = new PrismaClient();
        const userFactory = new UserFactory();
        const userRepository = new UserRepository(prisma);
        const userApplication = new UserApplication(userRepository, userFactory);
        const userAll = await userApplication.findUserAll();
        res.set({
            'content-type': 'application/json',
        });
        res.status(200).json(userAll);
    } catch (e) {
        res.status(400).send(e.message);
    }
}

// ユーザー新規作成
exports.create = async function (req: express.Request, res: express.Response) {
    try {
        const prisma = new PrismaClient();
        const userFactory = new UserFactory();
        const userRepository = new UserRepository(prisma);
        const userApplication = new UserApplication(userRepository, userFactory);
        const data = {
            'user_name': req.body.user_name,
            'email': req.body.email,
            'pair_id': req.body.pair_id ? parseInt(req.body.pair_id) : null,
            'belong_id': req.body.belong_id ? parseInt(req.body.belong_id) : null
        }
        const userCreate = await userApplication.create(data);
        res.set({
            'content-type': 'text/plain',
        });
        res.status(201).send('Create : ' + req.body.user_name + ', ' + req.body.email)
    } catch (e) {
        res.status(400).send(e.message);
    }
}

// ユーザー更新
exports.update = async function (req: express.Request, res: express.Response) {
    try {
        const prisma = new PrismaClient();
        const userFactory = new UserFactory();
        const userRepository = new UserRepository(prisma);
        const userApplication = new UserApplication(userRepository, userFactory);

        // NOTE::pair, team情報がPOSTされた時の対処必要
        const data = {
            'id': parseInt(req.params.id),
            'user_name': req.body.user_name ?? null,
            'email': req.body.email ?? null,
            'pair_id': req.body.pair_id ? parseInt(req.body.pair_id) : null,
            'belong_id': req.body.belong_id ? parseInt(req.body.belong_id) : null,
        };

        const userUpdate = await userApplication.update(data);
        res.set({
            'content-type': 'text/plain',
        });
        res.status(201).send('Update success');
    } catch (e) {
        res.status(400).send(e.message);
    }
}

// ユーザー削除
exports.delete = async function (req: express.Request, res: express.Response) {
    try {
        const prism = new PrismaClient();
        const userFactory = new UserFactory();
        const userRepository = new UserRepository(prism);
        const userApplication = new UserApplication(userRepository, userFactory);
        const userDelete = await userApplication.delete(parseInt(req.params.id));
        res.set({
            'content-type': 'text/plain',
        });
        res.status(201).send('Delete success');
    } catch (e) {
        res.status(400).send(e.message);
    }
}