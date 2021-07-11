import { PrismaClient } from '@prisma/client';
import User from 'domain/entity/users/user/index';
import BelongsValueObject from 'domain/valueobject/belongs/index';
import UserRepositoryInterface from "domain/repository/UserRepositoryInterface";
import UserFactory from 'domain/factory/UserFactory';
import Pair from 'domain/entity/users/pair';
import Team from 'domain/entity/users/team';

export default class UserRepository implements UserRepositoryInterface {
    private prisma: PrismaClient

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    public async findByUserId(user_id: number): Promise<User> {
        const user = await this.prisma.user.findFirst({
            where: {
                id: user_id
            },
            include: {
                belong: true,
                pair: {
                    include: {
                        team: true
                    }
                }
            }
        });
        if (user == null) {
            throw new Error(`Not Found User(user_id : ${user_id}).`)
        }

        const teamIns = new Team({
            id: user.pair.team.id,
            team_name: user.pair.team.team_name,
        });

        const pairIns = new Pair({
            id: user.pair.id,
            teams_id: user.pair.teams_id,
            pair_name: user.pair.pair_name,
            team: teamIns,
            user_id: [user_id], // NOTE:本来は複数入るが、Userエンティティに関わる処理を全体的に見直し必要なので一旦保留
        });

        const belongIns = new BelongsValueObject(user.belong);

        return new User({
            id: user.id,
            pair_id: user.pair_id,
            belong_id: user.belong_id,
            user_name: user.user_name,
            email: user.email,
            belong: belongIns,
            pair: pairIns,
        });
    }

    public async findByTeamId(teams_id: number): Promise<User> {
        const user = await this.prisma.user.findFirst({
            where: {
                pair: {
                    teams_id: teams_id
                }
            },
            include: {
                belong: true,
                pair: {
                    include: {
                        team: true
                    }
                }
            }
        });

        if (user == null) {
            throw new Error(`Not Found User(teams_id : ${teams_id}).`)
        }

        const teamIns = new Team({
            id: user.pair.teams_id,
            team_name: user.pair.team.team_name,
        });

        const pairIns = new Pair({
            id: user.pair.id,
            teams_id: user.pair.teams_id,
            pair_name: user.pair.pair_name,
            team: teamIns,
            user_id: [user.id], // NOTE:本来は複数入るが、Userエンティティに関わる処理を全体的に見直し必要なので一旦保留
        });

        const belongIns = new BelongsValueObject(user.belong);

        return new User({
            id: user.id,
            pair_id: user.pair_id,
            belong_id: user.belong_id,
            user_name: user.user_name,
            email: user.email,
            belong: belongIns,
            pair: pairIns,
        });
    }

    public async findAll(): Promise<User[]> {
        const all_users = await this.prisma.user.findMany({
            include: {
                belong: true,
                pair: {
                    include: {
                        team: true
                    }
                }
            },
            orderBy: {
                id: "asc"
            }
        });
        const users = all_users.map((user): User => {

            const teamIns = new Team({
                id: user.pair.team.id,
                team_name: user.pair.team.team_name,
            });

            const pairIns = new Pair({
                id: user.pair.id,
                teams_id: user.pair.teams_id,
                pair_name: user.pair.pair_name,
                team: teamIns,
                user_id: [user.id], // NOTE:本来は複数入るが、Userエンティティに関わる処理を全体的に見直し必要なので一旦保留
            });

            const belongIns = new BelongsValueObject(user.belong);

            return new User({
                id: user.id,
                pair_id: user.pair_id,
                belong_id: user.belong_id,
                user_name: user.user_name,
                email: user.email,
                belong: belongIns,
                pair: pairIns,
            });
        });
        return users;
    }

    public async findBelongByBelongId(belong_id: number): Promise<BelongsValueObject> {
        const belongObject = await this.prisma.belong.findFirst({
            where: {
                id: belong_id,
            }
        });

        if (belongObject === null) {
            throw new Error(`Not Found Belong(belong_id : ${belong_id}).`)
        }

        const belong = new BelongsValueObject({
            id: belong_id,
            belong: belongObject?.belong,
        });
        return belong;
    }

    public async create(user: User): Promise<void> {
        const { pair_id, belong_id, user_name, email } = user.getAllProperties();

        await this.prisma.user.create({
            data: {
                pair_id: pair_id,
                belong_id: belong_id,
                user_name: user_name,
                email: email,
            }
        });

        // belong, pair, teamは仕様上作成しないので保留

        return;
    }

    public async update(user: User): Promise<void> {
        const { id, pair_id, belong_id, user_name, email, belong, pair } = user.getAllProperties();

        await this.prisma.user.update({
            where: {
                id: id,
            },
            data: {
                pair_id: pair_id,
                belong_id: belong_id,
                user_name: user_name,
                email: email,
            }
        });

        return;
    }

    public async updatePairIdAll(user: User): Promise<void> {
        const { id, pair_id } = user.getAllProperties();
    }

    public async delete(user_id: number): Promise<void> {
        await this.prisma.user.delete({
            where: {
                id: user_id
            }
        });
        return;
    }

}