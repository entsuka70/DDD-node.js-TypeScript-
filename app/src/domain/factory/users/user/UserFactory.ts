import User from "domain/entity/users/user/index";
import Pair from "domain/entity/users/pair/index";
import UserFactoryInterface from "domain/factory/users/UserFactoryInterface";
import UserPairAggregation from "domain/factory/users/UserFactoryInterface";
import UserDto from "app/dto/UserDto";
import PairDto from "app/dto/PairDto";

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