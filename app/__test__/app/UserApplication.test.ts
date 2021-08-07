import UserApplication from "app/application/user/UserApplication";
import UserRepository from "infra/repository/UserRepository";
import PairRepository from "infra/repository/PairRepository";
import UserFactory from "domain/factory/UserFactory";
import UserId from 'domain/model/user/UserId';
import PairId from 'domain/model/pair/PairId';
import TeamId from 'domain/model/team/TeamId';
import UserDomainService from "domain/domainservice/UserDomainService";
import { PrismaClient } from ".prisma/client";

describe('app/application/user UserApplication', () => {
    const prisma = new PrismaClient({
        datasources: {
            db: {
                url: process.env.DATABASE_URL_TEST
            }
        }
    });
    const factory = new UserFactory();
    const userRepository = new UserRepository(prisma);
    const pairRepository = new PairRepository(prisma);
    const userDomainService = new UserDomainService(userRepository);
    const userApplication = new UserApplication(userRepository, pairRepository);

    beforeEach(async () => {
        await prisma.user.createMany({
            data: [
                {
                    id: new UserId().get(),
                    pair_id: PairId.DEFAULT_PAIR_ID,
                    team_id: TeamId.DEFAULT_TEAM_ID,
                    user_name: 'hoge',
                    email: 'hoge@mail.com',
                    status: 1,
                },
                {
                    id: new UserId().get(),
                    pair_id: PairId.DEFAULT_PAIR_ID,
                    team_id: TeamId.DEFAULT_TEAM_ID,
                    user_name: 'fuga',
                    email: 'fuga@mail.com',
                    status: 1,
                },
            ]
        });
    });

    afterEach(async () => {
        const deleteUserTable = prisma.user.deleteMany();

        await prisma.$transaction([deleteUserTable]);
        await prisma.$disconnect();
    });

    describe('正常系テスト', () => {
        it('UserApplication.findAll()でユーザー一覧取得できる', async () => {
            expect(await userApplication.findAll()).toHaveLength(2);
        });

        it('UserApplication.create()でユーザーのメールアドレスが重複しない', async () => {
            const dummyPost = {
                user_name: 'dadada',
                email: 'dadada@mail.com'
            }
            expect(await userDomainService.isExist(dummyPost.email, 'email')).toBeFalsy();
        });

        it('UserApplication.create()でユーザー新規作成できる', async () => {
            const dummyPost = {
                user_name: 'dummyUser',
                email: 'dummy@mail.com'
            }
            jest.mock('app/application/user/UserCreateCommand', () => {
                return jest.fn(() => dummyPost);
            })
            const dummyData = require('app/application/user/UserCreateCommand');
            const userAggregation = await factory.create(dummyData());
            await userRepository.save(await userAggregation);
            const user = await prisma.user.findMany();
            expect(user).toHaveLength(3);
        });
    });

    describe('異常系テスト', () => {
        it('UserApplication.create()でユーザーのメールアドレスが重複してエラー', async () => {
            const dummyPost = {
                user_name: 'dummyUser',
                email: 'hoge@mail.com' // メールアドレス重複
            }
            expect(() => userDomainService.isExist(dummyPost.email, 'email')).toBeTruthy();
        });
    });
});