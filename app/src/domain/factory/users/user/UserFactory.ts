import User from "domain/entity/users/user/index";
import Pair from "domain/entity/users/pair/index";
import UserFactoryInterface from "domain/factory/users/UserFactoryInterface";
import UserPairAggregation from "domain/factory/users/UserFactoryInterface";
import UserDto from "app/dto/UserDto";
import PairDto from "app/dto/PairDto";
import TeamDto from "app/dto/TeamDto";
import { timeStamp } from "console";

export default class UserFactory implements UserFactoryInterface {
    public async createUserAll(userEntities: object[]): Promise<UserDto[]> {
        const users = await userEntities.map(
            (userEntity): UserDto => {
                return new UserDto(userEntity);
            }
        )
        return users;
    }

    public async createUser(data: { id: number | null, user_name: string, email: string, belong_id: number | null, pair_id: number | null }): Promise<object> {
        const user = new User(data);
        return user;
    }

    // Userが参加しているペアをすべて返す
    // TODO:Userの紐付けを行うべき
    public async createPairAll(userEntities: { id: number, pair_id: number, belong_id: number, user_name: string, email: string, pair: { id: number, teams_id: number, pair_name: string } }[]): Promise<object[]> {
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
        });

        const pairsDtos = await pairs.map((pair) => {
            const propsPair = {
                id: pair.id,
                teams_id: pair.teams_id,
                pair_name: pair.pair_name,
                user: users.filter(user => user.pair_id === pair.id)
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
    const objectIds = objects.map((object) => {
        return object.id;
    });
    return objects.filter(function (object, index) {
        return objectIds.indexOf(object.id) === index;
    });
}