import Team from "domain/entity/users/team"

export default class TeamDto {
    public readonly id: number | undefined;
    public readonly team_name: string;

    constructor(users: any) {
        this.id = users.id;
        this.team_name = users.team_name;
    }

    public getTeamAll(team: Team[]) {
        return [team];
    }
}