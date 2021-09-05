import UserApplication from 'src/app/application/user/UserApplication';
import UserRepository from 'src/infra/repository/UserRepository';
import PairRepository from 'src/infra/repository/PairRepository';
import UserFactory from 'src/domain/factory/UserFactory';
import UserId from 'src/domain/model/user/UserId';
import PairId from 'src/domain/model/pair/PairId';
import TeamId from 'src/domain/model/team/TeamId';
import PairName from 'src/domain/model/pair/PairName';
import UserDomainService from 'src/domain/domainservice/UserDomainService';
import UserCreateCommand from 'src/app/application/user/UserCreateCommand';
import { getMockReq } from '@jest-mock/express';
import { PrismaClient } from '@prisma/client';

describe('app/application/user UserApplication', () => {
  const prisma = new PrismaClient();
  const factory = new UserFactory();
  const userRepository = new UserRepository(prisma);
  const pairRepository = new PairRepository(prisma);
  const userDomainService = new UserDomainService(userRepository);
  const userApplication = new UserApplication(userRepository, pairRepository);

  beforeEach(async () => {
    await prisma.team.create({
      data: {
        id: TeamId.DEFAULT_TEAM_ID,
        team_name: 1,
        belong: false,
      },
    });

    await prisma.pair.create({
      data: {
        id: PairId.DEFAULT_PAIR_ID,
        team_id: TeamId.DEFAULT_TEAM_ID,
        pair_name: new PairName('a').get(),
        belong: false,
      },
    });

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
      ],
    });
  });

  afterEach(async () => {
    const deleteUserTable = prisma.user.deleteMany();
    const deletePairTable = prisma.pair.deleteMany();
    const deleteTeamTable = prisma.team.deleteMany();

    await prisma.$transaction([
      deleteUserTable,
      deletePairTable,
      deleteTeamTable,
    ]);
    await prisma.$disconnect();
  });

  describe('正常系テスト', () => {
    it('UserApplication.findAll()でユーザー一覧取得できる', async () => {
      expect(await userApplication.findAll()).toHaveLength(2);
    });

    it('UserApplication.create()でユーザーのメールアドレスが重複しない', async () => {
      const dummyPost = {
        user_name: 'dadada',
        email: 'dadada@mail.com',
      };
      expect(
        await userDomainService.isExist(dummyPost.email, 'email')
      ).toBeFalsy();
    });

    it('UserApplication.create()でユーザー新規作成できる', async () => {
      const dummyPost = {
        body: {
          user_name: 'dummyUser',
          email: 'dummy@mail.com',
        },
      };
      jest.mock('app/application/user/UserCreateCommand');
      const req = getMockReq(dummyPost);
      const UserCreateCommandMock = UserCreateCommand as jest.MockedClass<
        typeof UserCreateCommand
      >;
      const userAggregation = factory.create(new UserCreateCommandMock(req));
      await userRepository.save(userAggregation);
      const user = await prisma.user.findMany();
      expect(user).toHaveLength(3);
    });
  });

  describe('異常系テスト', () => {
    it('UserApplication.create()でユーザーのメールアドレスが重複してエラー', () => {
      const dummyPost = {
        user_name: 'dummyUser',
        email: 'hoge@mail.com', // メールアドレス重複
      };
      expect(
        async () => await userDomainService.isExist(dummyPost.email, 'email')
      ).toBeTruthy();
    });
  });
});
