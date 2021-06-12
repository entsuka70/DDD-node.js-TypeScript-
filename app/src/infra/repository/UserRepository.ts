import { PrismaClient } from '@prisma/client';
import User from 'domain/entity/users/user/index';
import BelongsValueObject from 'domain/valueobject/belongs/index';
import UserRepositoryInterface from "domain/repository/users/UserRepositoryInterface";
import UserFactory from 'domain/factory/users/user/UserFactory';

export default class UserRepository implements UserRepositoryInterface {
    private prisma: PrismaClient

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    public async findByUserId(user_id: number): Promise<object> {
        const aggregation = await this.prisma.user.findFirst({
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
        if (aggregation == null) {
            throw new Error(`Not Found User(user_id : ${user_id}).`)
        }
        return aggregation;
    }

    public async findAll(): Promise<object[]> {
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
        return all_users;
    }

    public async create(data: { user_name: string, email: string, belongs: number | null }): Promise<void> {
        await this.prisma.user.create({
            data: {
                user_name: data.user_name,
                email: data.email,
                belong_id: data.belongs ?? 1,
            }
        });
        return;
    }

    public async update(
        entity: { pair_id: number, user_name: string, email: string, belongs: number, pair: { pair_name: string, teams_id: number, team: { team_name: string } } },
        data: { id: number, pair_id: number | null, user_name: string | null, email: string | null, belongs: number | null, pair_name: string | null, teams_id: number | null, team_name: string | null }
    ): Promise<void> {
        const { id, pair_id, user_name, email, belongs, pair_name, teams_id, team_name } = data;

        await this.prisma.user.update({
            where: {
                id: id,
            },
            data: {
                pair_id: pair_id ?? entity.pair_id,
                user_name: user_name ?? entity.user_name,
                email: email ?? entity.email,
                belong_id: belongs ?? entity.belongs,
                updated_at: new Date(),
            }
        });

        await this.prisma.pair.update({
            where: {
                id: entity.pair_id,
            },
            data: {
                teams_id: teams_id ?? entity.pair.teams_id,
                pair_name: pair_name ?? entity.pair.pair_name,
            }
        });

        await this.prisma.team.update({
            where: {
                id: entity.pair.teams_id,
            },
            data: {
                team_name: team_name ?? entity.pair.team.team_name
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

    // public async updatePair(entity: {})

}