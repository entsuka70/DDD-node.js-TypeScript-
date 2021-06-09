import Pair from "domain/entity/users/pair"

export default class PairDto {
    public readonly id: number;
    public readonly teams_id: number;
    public readonly pair_name: string;
    
    constructor(user: any) {
        this.id = user.id;
        this.teams_id = user.teams_id;
        this.pair_name = user.pair_name;
    }

    public getUserAll(user: Pair[]) {
        return [user];
    }
}