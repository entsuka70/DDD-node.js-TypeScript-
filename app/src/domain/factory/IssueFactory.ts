import User from "domain/entity/users/user/index";
import Pair from "domain/entity/users/pair/index";
import Team from "domain/entity/users/team/index";
import IssueFactoryInterface from "domain/factory/IssueFactoryInterface";
import UserDto from "app/dto/UserDto";
import PairDto from "app/dto/PairDto";
import TeamDto from "app/dto/TeamDto";
import BelongsValueObject from "domain/valueobject/belongs";

export default class IssueFactory implements IssueFactoryInterface {
    // TODO: User集約の引数のままなのでIssue集約へ修正する

    public async createIssueAll(userAggregations: User[]): Promise<UserDto[]> {
        const users = await userAggregations.map(
            (userAggregation): UserDto => {
                return new UserDto(userAggregation);
            }
        )
        return users;
    }

    public async createIssue(data: {
        id: number | undefined, pair_id: number, belong_id: number, user_name: string, email: string, belong: number
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
            belong_id: data.belong_id ?? BelongsValueObject.DEFAULT_BLONGS_ID,
            user_name: data.user_name,
            email: data.email,
            belong: belongIns,
            pair: pairIns,
        });

        return user;
    }

    public async updateIssue(data: {
        id: number | undefined, pair_id: number, belong_id: number, user_name: string, email: string, belong: number,
        teams_id: number, pair_name: string, team_name: string
    }): Promise<User> {
        const teamIns = new Team({
            id: undefined,
            team_name: data.team_name,
        });

        const pairIns = new Pair({
            id: undefined,
            teams_id: data.teams_id,
            pair_name: data.pair_name,
            team: teamIns,
        })

        const belongObject = {
            id: BelongsValueObject.DEFAULT_BLONGS_ID,
            belong: BelongsValueObject.BELONGS,
        };
        const belongIns = new BelongsValueObject(belongObject);

        const user = new User({
            id: undefined,
            pair_id: data.pair_id,
            belong_id: data.belong_id,
            user_name: data.user_name,
            email: data.email,
            belong: belongIns,
            pair: pairIns,
        });

        return user;
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