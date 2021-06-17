import Pair from "domain/entity/users/pair"
import Team from "domain/entity/users/team"

export default class PairDto {
    public readonly id: number | undefined;
    public readonly teams_id: number;
    public readonly pair_name: string;
    public readonly team: Team;

    static DEFAULT_PAIR_ID = 1;
    static DEFAULT_TEAM_ID = 1;
    static PAIR_NAME_NO_BELONG = 'n';

    constructor(pair: Pair) {
        this.id = pair.getAllProperties().id ?? PairDto.DEFAULT_PAIR_ID;
        this.teams_id = pair.getAllProperties().teams_id ?? PairDto.DEFAULT_TEAM_ID;
        this.pair_name = pair.getAllProperties().pair_name ?? PairDto.PAIR_NAME_NO_BELONG;
        this.team = pair.getAllProperties().team;
    }
}