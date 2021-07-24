import { PrismaClient } from '@prisma/client';

import PairRepositoryInterface from "domain/model/pair/PairRepositoryInterface";
import Pair from 'domain/model/pair/Pair';
import PairId from 'domain/model/pair/PairId';
import TeamId from 'domain/model/team/TeamId';
import UserId from 'domain/model/user/UserId';
import PairName from 'domain/model/pair/PairName';

export default class PairRepository implements PairRepositoryInterface {
    private prisma: PrismaClient

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    public async find(id: string): Promise<void> {

    }

    public async findAll(): Promise<Pair[]> {
        const all_pairs = await this.prisma.pair.findMany({
            include: {
                user: true
            }
        });
        const pairs = all_pairs.map((pair) => {
            const props = {
                id: new PairId(pair.id),
                team_id: new TeamId(pair.team_id),
                pair_name: new PairName(pair.pair_name),
                user_ids: pair.user.map((u) => new UserId(u.id))
            }
            return new Pair(props);
        })
        return pairs;
    }

    public async save(user: Pair): Promise<void> {

    }

    public async update(user: void): Promise<void> {

    }

    public async delete(id: string): Promise<void> {

    }

}