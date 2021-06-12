import User from "domain/entity/users/user/index";
import Pair from "domain/entity/users/pair/index";
import UserFactoryInterface from "domain/factory/users/UserFactoryInterface";
import UserPairAggregation from "domain/factory/users/UserFactoryInterface";
import UserDto from "app/dto/UserDto";
import PairDto from "app/dto/PairDto";
import TeamDto from "app/dto/TeamDto";

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
    public async createPairAll(userEntities: { pair: object }[]): Promise<object[]> {
        const pairs = await userEntities.map(userEntity => userEntity.pair);

        const pairsDtos = await pairs.map((pair) => {
            return new PairDto(pair);
        });
        // NOTE:重複ペアの削除
        // filterDuplicatedObject()を利用するとPairDto[]を返り値にしたままだとESLintに怒られるのでobjectに変更
        const pairsDtoAll = filterDuplicatedObject(pairsDtos);
        return pairsDtoAll;
    }

    public async createPair(data: { pair: { id: number | null, teams_id: number, pair_name: string, users: User[] | null } }): Promise<object> {
        const pair = new Pair(data.pair);
        console.log(pair);

        return pair;
    }

    public async createTeamAll(userEntities: { pair: { team: object } }[]): Promise<object[]> {
        const teams = await userEntities.map(userEntity => userEntity.pair.team);
        console.log(teams);
        const pairs = await userEntities.filter((userEntity) => {
            const pairIncludeTeam = userEntity.pair;
            console.log(pairIncludeTeam);

        });

        const teamDtos = await teams.map((team) => {
            const props = {
                id: team.id,
                team_name: team.team_name,
                pair: pairs
            };
            return new TeamDto(props);
        });
        // return pairs;
        return teamDtos;
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

function getTeamProperties(team: { id: number, team_name: string }) {
    return {
        id: team.id,
        team_name: team.team_name,
    }
}