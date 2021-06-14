import User from "domain/entity/users/user/index";
import Pair from "domain/entity/users/pair/index";
import Team from "domain/entity/users/team/index";
import UserFactoryInterface from "domain/factory/users/UserFactoryInterface";
import UserPairAggregation from "domain/factory/users/UserFactoryInterface";
import UserDto from "app/dto/UserDto";
import PairDto from "app/dto/PairDto";
import TeamDto from "app/dto/TeamDto";
import BelongsValueObject from "domain/valueobject/belongs";

export default class UserFactory implements UserFactoryInterface {
    public async createUserAll(userAggregations: User[]): Promise<UserDto[]> {
        const users = await userAggregations.map(
            (userAggregation): UserDto => {
                return new UserDto(userAggregation);
            }
        )
        return users;
    }

    public async createUser(data: { id: number | undefined, pair_id: number | null, belong_id: number | null, user_name: string, email: string, pair: Pair }): Promise<User> {
        const teamIns = new Team({
            id: undefined,
            team_name: null,
        });

        const pairIns = new Pair({
            id: undefined,
            teams_id: null,
            pair_name: null,
            team: teamIns,
        })

        const belongIns = new BelongsValueObject();

        const user = new User({
            id: undefined,
            pair_id: data.pair_id ?? null,
            belong_id: data.belong_id ?? null,
            user_name: data.user_name,
            email: data.email,
            belong: belongIns,
            pair: pairIns,
        });

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