import Team from "domain/entity/users/team"
import Pair from "domain/entity/users/pair"

export default class TeamDto {
    public readonly id: number | null;
    public readonly team_name: string;
    public readonly pairs: Pair[] | null;

    constructor(props: { id: number | null, team_name: string, pairs: Pair[] | null }) {
        const { id, team_name, pairs } = props;
        this.id = id;
        this.team_name = team_name;
        this.pairs = pairs;
    }

    public getTeamAll(team: Team[]) {
        return [team];
    }
}