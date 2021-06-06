import express from 'express';
import { PrismaClient } from ".prisma/client";
import UserApplication from "app/application/users/UserApplication";
import UserFactory from "infra/factory/users/user/UserFactory";
import UserRepository from "infra/repository/UserRepository";

// ユーザー一覧取得
exports.view = async function(req: express.Request, res: express.Response) {
    const prisma = new PrismaClient();
    const userFactory = new UserFactory();
    const userRepository = new UserRepository(prisma);
    const userApplication = new UserApplication(userRepository, userFactory);
    const userAll = await userApplication.findUserAll();
    res.set({
        'content-type': 'application/json',
    });
    res.status(200).json(userAll);
}

exports.create = async function(req: express.Request, res: express.Response) {
    try {
        res.set({
            'content-type': 'text/plain',
        });
        res.status(200).send('Create : ' + req.body.name + ', ' +req.body.email);
        console.log('Create : ' + req.body.name + ', ' +req.body.email);
    } catch (e) {
        console.log(req.body);
        console.error(e.message);
        res.send(e.message);
    }
}