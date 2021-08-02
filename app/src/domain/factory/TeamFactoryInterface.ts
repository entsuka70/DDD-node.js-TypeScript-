import Team from "domain/model/team/Team"
import TeamCreateCommand from "app/application/team/TeamCreateCommand"

export default interface PairFactoryInterface {
    create(team: Team): Team;
    update(command: TeamCreateCommand, team: Team): Promise<Team>;
}