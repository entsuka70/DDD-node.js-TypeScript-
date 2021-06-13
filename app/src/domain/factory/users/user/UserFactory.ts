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
    // TODO:Userの紐付けを行うべき
    // public async createPairAll(userEntities: { id: number, pair_id: number, belong_id: number, user_name: string, email: string, pair: { id: number, teams_id: number, pair_name: string } }[]): Promise<object[]> {
    public async createPairAll(userAggregations: User[]): Promise<PairDto[]> {
        const pairs = await userAggregations.map(userAggregation => userAggregation.getAllProperties().pair);
        // const users = await userAggregations.map(userAggregation => {
        //     const propsUser = {
        //         id: userAggregation.getAllProperties().id,
        //         pair_id: userAggregation.getAllProperties().pair_id,
        //         belong_id: userAggregation.getAllProperties().belong_id,
        //         user_name: userAggregation.getAllProperties().user_name,
        //         email: userAggregation.getAllProperties().email,
        //         belong: userAggregation.getAllProperties().belong,
        //         pair: userAggregation.getAllProperties().pair
        //     };
        //     return new UserDto(propsUser);
        // });

        const pairsDtos = await pairs.map((pair) => {
            const propsPair = {
                id: pair.getAllProperties().id,
                teams_id: pair.getAllProperties().teams_id,
                pair_name: pair.getAllProperties().pair_name,
                team: pair.getAllProperties().team
            }
            return new PairDto(propsPair);
        });
        // NOTE:重複ペアの削除
        // filterDuplicatedObject()を利用するとPairDto[]を返り値にしたままだとESLintに怒られるのでobjectに変更
        const pairsDtoAll = filterDuplicatedObject(pairsDtos);
        return pairsDtoAll;
    }

    public async createTeamAll(userEntities:
        {
            id: number, pair_id: number, belong_id: number, user_name: string, email: string,
            pair: {
                id: number, teams_id: number, pair_name: string,
                team: {
                    id: number, team_name: string
                }
            }
        }[]): Promise<object[]> {
        const teams = await userEntities.map(userEntity => userEntity.pair.team);
        const pairs = await userEntities.map(userEntity => userEntity.pair);
        const users = await userEntities.map(userEntity => {
            const propsUser = {
                id: userEntity.id,
                pair_id: userEntity.pair_id,
                belong_id: userEntity.belong_id,
                user_name: userEntity.user_name,
                email: userEntity.email
            };
            return new UserDto(propsUser);
        })
        const pairDtos = await pairs.map(pair => {
            const propsPair = {
                id: pair.id,
                teams_id: pair.teams_id,
                pair_name: pair.pair_name,
                user: users.filter(user => user.pair_id === pair.id)
            }
            return new PairDto(propsPair);
        })
        const teamDtos = await teams.map(team => {
            const propsTeam = {
                id: team.id,
                team_name: team.team_name,
                pair: pairs.filter(pair => pair.teams_id === team.id)
            };
            return new TeamDto(propsTeam);
        })
        const teamsDtoAll = filterDuplicatedObject(teamDtos);
        return teamsDtoAll;
    }
}

// 重複するオブジェクトを除外する
function filterDuplicatedObject(objects: { id: number }[]) {
    // function filterDuplicatedObject(objects: { id: number }[]) {
    const objectIds = objects.map((object) => {
        return object.id;
    });
    return objects.filter(function (object, index) {
        return objectIds.indexOf(object.id) === index;
    });
}