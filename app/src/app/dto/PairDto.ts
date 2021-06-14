import Pair from "domain/entity/users/pair"
import Team from "domain/entity/users/team"

export default class PairDto {
    public readonly id: number | undefined;
    public readonly teams_id: number;
    public readonly pair_name: string;
    public readonly team: Team;

    public DEFAULT_PAIR_ID = 1;
    public DEFAULT_TEAM_ID = 1;
    public PAIR_NAME_NO_BELONG = 'n';

    constructor(pair: Pair) {
        this.id = pair.getAllProperties().id ?? pair.DEFAULT_PAIR_ID;
        this.teams_id = pair.getAllProperties().teams_id ?? pair.DEFAULT_TEAM_ID;
        this.pair_name = pair.getAllProperties().pair_name ?? pair.PAIR_NAME_NO_BELONG;
        this.team = pair.getAllProperties().team;
    }
}