import { PrismaClient } from '.prisma/client';
import User, { UserProps } from '../../domain/model/user/User';
import UserId from '../../domain/model/user/UserId';
import UserName from '../../domain/model/user/UserName';
import UserEmail from '../../domain/model/user/UserEmail';
import UserStatus from '../../domain/model/user/UserStatus';
import PairId from '../../domain/model/pair/PairId';
import TeamId from '../../domain/model/team/TeamId';
import UserRepositoryInterface from '../../domain/model/user/UserRepositoryInterface';

export default class UserRepository implements UserRepositoryInterface {
  private prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async find(id: string): Promise<User> {
    const user = await this.prisma.user.findFirst({
      where: {
        id: id,
      },
    });
    if (user == null) {
      throw new ReferenceError(`Not Found User Id : id is ${id}`);
    }

    const props: UserProps = {
      id: new UserId(user.id),
      pair_id: new PairId(user.pair_id),
      team_id: new TeamId(user.team_id),
      status: new UserStatus(user.status),
      user_name: new UserName(user.user_name),
      email: new UserEmail(user.email),
    };

    return new User(props);
  }

  public async findAll(): Promise<User[]> {
    const all_users = await this.prisma.user.findMany();
    if (all_users == null) {
      throw new ReferenceError(`Not Found Any User`);
    }
    const users: User[] = all_users.map((user): User => {
      const props: UserProps = {
        id: new UserId(user.id),
        pair_id: new PairId(user.pair_id),
        team_id: new TeamId(user.team_id),
        status: new UserStatus(user.status),
        user_name: new UserName(user.user_name),
        email: new UserEmail(user.email),
      };
      return new User(props);
    });
    return users;
  }

  public async findByPairIds(ids: string[]): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      where: {
        pair: {
          id: {
            in: ids,
          },
        },
      },
    });

    const all_users = users.map((user) => {
      const props: UserProps = {
        id: new UserId(user.id),
        pair_id: new PairId(user.pair_id),
        team_id: new TeamId(user.team_id),
        status: new UserStatus(user.status),
        user_name: new UserName(user.user_name),
        email: new UserEmail(user.email),
      };
      return new User(props);
    });
    return all_users;
  }

  public async save(user: User): Promise<void> {
    const { id, pair_id, team_id, status, user_name, email } =
      user.getAllProperties();

    await this.prisma.user.create({
      data: {
        id: id,
        pair_id: pair_id,
        team_id: team_id,
        status: status,
        user_name: user_name,
        email: email,
      },
    });

    return;
  }

  public async update(user: User): Promise<void> {
    const { id, pair_id, team_id, status, user_name, email } =
      user.getAllProperties();

    await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        pair_id: pair_id,
        team_id: team_id,
        status: status,
        user_name: user_name,
        email: email,
      },
    });

    return;
  }

  public async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: {
        id: id,
      },
    });
    return;
  }
}
