import express from 'express';
import { PrismaClient } from ".prisma/client";
import UserApplication from "app/application/users/UserApplication";
import UserFactory from "infra/factory/users/user/UserFactory";
import UserRepository from "infra/repository/UserRepository";
import bodyParser from 'body-parser';

const app = express();
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());
// const jsonParser = bodyParser.json();
app.use(express.json());

// ユーザー一覧取得
exports.view = async function(req: express.Request, res: express.Response) {
    const prisma = new PrismaClient();
    const userFactory = new UserFactory();
    const userRepository = new UserRepository(prisma);
    const userApplication = new UserApplication(userRepository, userFactory); // インターフェイスを継承したuserRepositoryだから引数として利用できるのか？
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