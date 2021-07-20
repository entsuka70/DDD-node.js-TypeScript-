import { PrismaClient } from '@prisma/client';
import User from 'domain/entity/users/user/index';
import BelongsValueObject from 'domain/valueobject/belongs/index';
import PairRepositoryInterface from "domain/repository/PairRepositoryInterface";
import Pair from 'domain/entity/users/pair';
import Team from 'domain/entity/users/team';

export default class PairRepository implements PairRepositoryInterface {
    private prisma: PrismaClient

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    public async findById(pair_id: number): Promise<Pair> {
        const pair = await this.prisma.pair.findFirst({
            where: {
                id: pair_id
            },
            include: {
                team: true,
            }
        });
        if (pair == null) {
            throw new Error(`Not Found Pair(pair_id : ${pair_id}).`)
        }
        const users = await this.prisma.user.findMany({
            where: {
                pair_id: pair_id,
            }
        });
        if (users == null) {
            throw new Error(`Not Found Users(PairRepository users is null.`)
        }
        const user_ids = users.map((user): number => {
            return user.id;
        });
        console.log(user_ids);

        const teamIns = new Team({
            id: pair.team.id,
            team_name: pair.team.team_name,
        });

        return new Pair({
            id: pair.id,
            teams_id: pair.teams_id,
            pair_name: pair.pair_name,
            team: teamIns,
            user_id: user_ids,
        });

    }

    public async findNoUserPairByUserId(): Promise<any> {
        const no_user_pair = await this.prisma.pair.findFirst({
            where: {
                user: {
                    none: {}
                }
            }
        });
        if (no_user_pair == null) {
            throw new Error(`Not Found No_User_Pair(PairRepository no_user_pair is null.`)
        }
        console.log('---- findNoUserPairByUserId ---');
        console.log(no_user_pair);
        return no_user_pair;
    }

    public async findAll(): Promise<Pair[]> {
        const all_pairs = await this.prisma.pair.findMany({
            include: {
                team: true,
                user: true,
            },
            orderBy: {
                id: "asc"
            }
        });

        const pairs = all_pairs.map((pair) => {
            const user_ids = pair.user.map((entity) => {
                return entity.id;
            });

            const pair_entity = {
                id: pair.id,
                teams_id: pair.teams_id,
                pair_name: pair.pair_name,
                team: new Team(pair.team),
                user_id: user_ids,
            };

            return new Pair(pair_entity);
        });

        return pairs;
    }

    public async update(pair: Pair): Promise<void> {
        const { id, teams_id, pair_name, team, user_id } = pair.getAllProperties();

        await this.prisma.pair.update({
            where: {
                id: id,
            },
            data: {
                teams_id: teams_id,
                pair_name: pair_name,
            }
        });

        await this.prisma.team.update({
            where: {
                id: teams_id,
            },
            data: {
                team_name: team.getAllProperties().team_name
            }
        });

        return;
    }

}