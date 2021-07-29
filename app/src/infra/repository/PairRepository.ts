import { PrismaClient } from '@prisma/client';

import PairRepositoryInterface from "domain/model/pair/PairRepositoryInterface";
import Pair, { PairProps } from 'domain/model/pair/Pair';
import PairId from 'domain/model/pair/PairId';
import TeamId from 'domain/model/team/TeamId';
import UserId from 'domain/model/user/UserId';
import PairName from 'domain/model/pair/PairName';

export default class PairRepository implements PairRepositoryInterface {
    private prisma: PrismaClient

    constructor(prisma: PrismaClient) {
        this.prisma = prisma;
    }

    public async find(id: string): Promise<Pair> {
        const pair = await this.prisma.pair.findFirst({
            where: {
                id: id
            },
            include: {
                user: true
            }
        });
        if (pair == null) {
            throw new Error(`Not Found Pair Id : id is ${id}`)
        }
        const props: PairProps = {
            id: new PairId(pair.id),
            team_id: new TeamId(pair.team_id),
            pair_name: new PairName(pair.pair_name),
            user_ids: pair.user.map((u) => new UserId(u.id))
        }
        return new Pair(props);
    }

    public async findAll(): Promise<Pair[]> {
        const all_pairs = await this.prisma.pair.findMany({
            include: {
                user: true
            }
        });
        const pairs = all_pairs.map((pair) => {
            const props: PairProps = {
                id: new PairId(pair.id),
                team_id: new TeamId(pair.team_id),
                pair_name: new PairName(pair.pair_name),
                user_ids: pair.user.map((u) => new UserId(u.id))
            }
            return new Pair(props);
        })
        return pairs;
    }

    public async findMinUser(pair: Pair): Promise<Pair> {
        const pairs = await this.prisma.pair.findMany({
            include: {
                _count: {
                    select: {
                        user: true
                    }
                },
                user: true
            }
        });

        // ユーザー数2名のペア抽出
        const minUserPair = pairs.filter((pair) => pair._count?.user == Pair.MIN_ACCEPTABLE_PAIR_USER);

        if (!minUserPair || !minUserPair.length) {
            throw new Error('There is not exist Pair which has min user')
        }

        // findMinUser()に渡されたペア内のユーザーが、抽出したユーザー数2名のペア内に含まれるかをチェック
        const isExistsUserArray = minUserPair.map((mP) => mP.user.map((u) => pair.isExistUser(u.id)));
        const isExist = isExistsUserArray.some((is) => is.some((i) => i == true));

        // ユーザー数2名のペアが2組で、その片方に渡されたペアに対象ユーザーが存在した場合は
        // ユーザー移動・ペア形成の不整合が発生するので例外発生処理
        if (minUserPair.length == Pair.MIN_ACCEPTABLE_PAIR_USER && isExist) {
            throw new Error('Can not set User to new Pair because of few pair')
        }

        // ランダム(適当)に最小ユーザー数ペアを抽出
        const props: PairProps = {
            id: new PairId(minUserPair[0].id),
            team_id: new TeamId(minUserPair[0].team_id),
            pair_name: new PairName(minUserPair[0].pair_name),
            user_ids: minUserPair[0].user.map((u) => new UserId(u.id))
        }

        return new Pair(props);
    }

    public async save(user: Pair): Promise<void> {

    }

    public async update(pair: Pair): Promise<void> {
        const { id, team_id, pair_name, user_ids } = pair.getAllProperties();

        await this.prisma.pair.update({
            where: {
                id: id,
            },
            data: {
                team_id: team_id,
                pair_name: pair_name,
            }
        });

        if (user_ids.length != 0) {
            await this.prisma.user.updateMany({
                where: {
                    id: {
                        in: user_ids
                    }
                },
                data: {
                    pair_id: id
                }
            })
        }
    }

    public async delete(id: string): Promise<void> {

    }

}