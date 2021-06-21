import User from "domain/entity/users/user/index";
import Pair from "domain/entity/users/pair/index";
import Team from "domain/entity/users/team/index";
import UserFactoryInterface from "domain/factory/UserFactoryInterface";
import UserPairAggregation from "domain/factory/UserFactoryInterface";
import UserDto from "app/dto/UserDto";
import PairDto from "app/dto/PairDto";
import TeamDto from "app/dto/TeamDto";
import BelongsValueObject from "domain/valueobject/belongs";
import { PrismaClient } from '@prisma/client';

export default class UserFactory implements UserFactoryInterface {
    public async createUserAll(userAggregations: User[]): Promise<UserDto[]> {
        const users = await userAggregations.map(
            (userAggregation): UserDto => {
                return new UserDto(userAggregation);
            }
        )
        return users;
    }

    public async createUser(data: {
        id: number | undefined, pair_id: number, user_name: string, email: string,
        teams_id: number, pair_name: string, team_name: string
    }): Promise<User> {

        const teamIns = new Team({
            id: undefined,
            team_name: data.team_name ?? Team.TEAM_NAME_NO_BELONG,
        });

        const pairIns = new Pair({
            id: undefined,
            teams_id: data.teams_id ?? Pair.DEFAULT_NO_TEAM_ID,
            pair_name: data.pair_name ?? Pair.PAIR_NAME_NO_BELONG,
            team: teamIns,
        })

        const belongObject = {
            id: BelongsValueObject.DEFAULT_BLONGS_ID,
            belong: BelongsValueObject.BELONGS,
        };
        const belongIns = new BelongsValueObject(belongObject);

        const user = new User({
            id: undefined,
            pair_id: data.pair_id ?? Pair.DEFAULT_NO_PAIR_ID,
            belong_id: BelongsValueObject.DEFAULT_BLONGS_ID,
            user_name: data.user_name,
            email: data.email,
            belong: belongIns,
            pair: pairIns,
        });

        try {
            await this.checkDuplicateEmail(data);
        } catch (e) {
            throw new Error(e.message);
        }

        return user;
    }

    public async updateUser(data: {
        id: number | undefined, pair_id: number, belong_id: number, user_name: string, email: string, belong: number,
        teams_id: number, pair_name: string, team_name: string
    }, userEntity: User): Promise<User> {
        const teamIns = new Team({
            id: data.teams_id ?? userEntity.getAllProperties().pair.getAllProperties().team.getAllProperties().id,
            team_name: data.team_name ?? userEntity.getAllProperties().pair.getAllProperties().team.getAllProperties().team_name,
        });

        const pairIns = new Pair({
            id: data.pair_id ?? userEntity.getAllProperties().pair.getAllProperties().id,
            teams_id: data.teams_id ?? userEntity.getAllProperties().pair.getAllProperties().teams_id,
            pair_name: data.pair_name ?? userEntity.getAllProperties().pair.getAllProperties().pair_name,
            team: teamIns,
        })

        const belongObject = {
            id: data.belong_id ?? userEntity.getAllProperties().belong_id,
            belong: data.belong ?? userEntity.getAllProperties().belong,
        };
        const belongIns = new BelongsValueObject(belongObject);

        let user = new User({
            id: data.id,
            pair_id: data.pair_id ?? userEntity.getAllProperties().pair_id,
            belong_id: data.belong_id ?? userEntity.getAllProperties().belong_id,
            user_name: data.user_name ?? userEntity.getAllProperties().user_name,
            email: data.email ?? userEntity.getAllProperties().email,
            belong: belongIns,
            pair: pairIns,
        });

        try {
            await this.checkDuplicateEmail(data);
        } catch (e) {
            throw new Error(e.message);
        }

        return user;
    }

    // Userが参加しているペアをすべて返す
    public async createPairAll(userAggregations: User[]): Promise<PairDto[]> {
        const pairs: Pair[] = await userAggregations.map(userAggregation => userAggregation.getAllProperties().pair);

        const pairsDtos: PairDto[] = await pairs.map((pair) => {
            return new PairDto(pair);
        });

        // NOTE:重複ペアの削除
        const pairsDtoAll = filterDuplicatedObject(pairsDtos);
        return pairsDtoAll;
    }

    public async createTeamAll(userAggregations: User[]): Promise<TeamDto[]> {
        const teams = await userAggregations.map(userAggregation => userAggregation.getAllProperties().pair.getAllProperties().team);

        const teamDtos: TeamDto[] = await teams.map(team => {
            return new TeamDto(team);
        })

        // NOTE:重複チームの削除
        const teamsDtoAll = filterDuplicatedObject(teamDtos);
        return teamsDtoAll;
    }

    // 重複するメールアドレスは許容しない
    public async checkDuplicateEmail(data: { email: string }): Promise<void> {
        const prisma = new PrismaClient();
        const users = await prisma.user.findMany({
            select: {
                email: true,
            }
        });
        const duplicateEmailUser = users.filter((user) => user.email === data.email);
        if (duplicateEmailUser.length) {
            throw new Error('email is duplicate.');
        }
        return;
    }
}

// 重複するオブジェクトを除外する
function filterDuplicatedObject<T extends dtoProperty>(dtos: T[]): T[] {
    const dtoIds = dtos.map((dto) => {
        return dto.id;
    });
    const filterd: T[] = dtos.filter((dto: T, index: number) => {
        return dtoIds.indexOf(dto.id) === index;
    });
    return filterd;
}

interface dtoProperty {
    id: number | undefined;
}