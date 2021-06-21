import { PrismaClient } from '@prisma/client';
import User from 'domain/entity/users/user/index';
import BelongsValueObject from 'domain/valueobject/belongs/index';
import UserRepositoryInterface from "domain/repository/UserRepositoryInterface";
import UserFactory from 'infra/factory/UserFactory';
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
            team: teamIns
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

    public async findByPairId(pair_id: number): Promise<User> {
        const user = await this.prisma.user.findFirst({
            where: {
                pair_id: pair_id
            },
            include: {
                belong: true,
                pair: {
                    include: {
                        team: true,
                    }
                }
            },
        });


        if (user == null) {
            throw new Error(`Not Found User(pair_id : ${pair_id}).`)
        }

        const teamIns = new Team({
            id: user.pair.team.id,
            team_name: user.pair.team.team_name,
        });

        const pairIns = new Pair({
            id: user.pair.id,
            teams_id: user.pair.teams_id,
            pair_name: user.pair.pair_name,
            team: teamIns
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
                team: teamIns
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
                // pair_id: userData.getAllProperties().pair_id ?? pair_id,
                // belong_id: userData.getAllProperties().belong_id ?? belong_id,
                // user_name: userData.getAllProperties().user_name ?? user_name,
                // email: userData.getAllProperties().email ?? email,
            }
        });

        await this.prisma.pair.update({
            where: {
                id: pair.getAllProperties().id,
            },
            data: {
                teams_id: pair.getAllProperties().teams_id,
                pair_name: pair.getAllProperties().pair_name,
            }
        });

        await this.prisma.team.update({
            where: {
                id: pair.getAllProperties().team.getAllProperties().id,
            },
            data: {
                team_name: pair.getAllProperties().team.getAllProperties().team_name
            }
        });

        return;
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