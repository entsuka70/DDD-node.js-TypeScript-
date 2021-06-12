import Pair from "domain/entity/users/pair"
import User from "domain/entity/users/user"

export default class PairDto {
    public readonly id: number;
    public readonly teams_id: number;
    public readonly pair_name: string;
    public readonly user: User[];

    constructor(user: any) {
        this.id = user.id;
        this.teams_id = user.teams_id;
        this.pair_name = user.pair_name;
        this.user = user.user;
    }

    public getUserAll(user: Pair[]) {
        return [user];
    }
}