import { PrismaClient } from ".prisma/client";
import UserApplication from "app/application/users/UserApplication";
import UserFactory from "infra/factory/users/user/UserFactory";
import UserRepository from "infra/repository/UserRepository";



// ユーザー一覧取得
exports.getAll = async function(req: any, res: any) {
    const prisma = new PrismaClient();
    const userFactory = new UserFactory();
    const userRepository = new UserRepository(prisma);
    const userApplication = new UserApplication(userRepository, userFactory); // インターフェイスを継承したuserRepositoryだから引数として利用できるのか？
    const userAll = await userApplication.findUserAll();
    res.set({
        'content-type': 'application/json',
    });
    res.json(userAll);
}