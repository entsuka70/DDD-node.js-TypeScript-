import Team from "domain/entity/users/team"

export default class TeamDto {
    public readonly id: number | undefined;
    public readonly team_name: string;

    constructor(team: Team) {
        this.id = team.getAllProperties().id;
        this.team_name = team.getAllProperties().team_name;
    }
}