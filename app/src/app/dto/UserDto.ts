import Pair from "domain/entity/users/pair";
import User from "domain/entity/users/user/user"
import BelongsValueObject from "domain/valueobject/belongs";

export default class UserDto {
    public readonly id: number | undefined;
    public readonly pair_id: number;
    public readonly user_name: string;
    public readonly email: string;
    public readonly belong_id: number;
    public readonly belong: BelongsValueObject;
    public readonly pair: Pair | null;

    constructor(user: User) {
        this.id = user.getAllProperties().id;
        this.pair_id = user.getAllProperties().pair_id;
        this.user_name = user.getAllProperties().user_name;
        this.email = user.getAllProperties().email;
        this.belong_id = user.getAllProperties().belong_id;
        this.belong = user.getAllProperties().belong;
        this.pair = user.getAllProperties().pair;
    }

    public getUserAll(user: User[]) {
        return [user];
    }
}