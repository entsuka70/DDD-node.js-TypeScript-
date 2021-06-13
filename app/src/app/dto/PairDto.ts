import Pair from "domain/entity/users/pair"
import Team from "domain/entity/users/team"

export default class PairDto {
    public readonly id: number | undefined;
    public readonly teams_id: number;
    public readonly pair_name: string;
    public readonly team: Team;

    constructor(user: any) {
        this.id = user.id;
        this.teams_id = user.teams_id;
        this.pair_name = user.pair_name;
        this.team = user.team;
    }

    public getPairAll(pair: Pair[]) {
        return [pair];
    }
}