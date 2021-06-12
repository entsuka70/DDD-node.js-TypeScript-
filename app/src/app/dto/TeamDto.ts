import Team from "domain/entity/users/team"
import Pair from "domain/entity/users/pair"

export default class TeamDto {
    public readonly id: number;
    public readonly team_name: string;
    public readonly pair: Pair[];

    constructor(users: any) {
        this.id = users.id;
        this.team_name = users.team_name;
        this.pair = users.pair;
    }

    public getTeamAll(team: Team[]) {
        return [team];
    }
}