import User from "domain/entity/users/user/index";
import BelongsValueObject from "domain/valueobject/belongs/index";

export default class UserFactory {
    /// リポジトリから受け取った集約を最適化した集約に再構成する
    public createUserEntity(aggregation: any): object {
        if (aggregation.hasOwnProperty('pair')) {
            delete aggregation.pair;
        } else {
            throw new Error(`Not Found Pair property : user_id(${aggregation.id})`);
        }
        return aggregation;
    }
}