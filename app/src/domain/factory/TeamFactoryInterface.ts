import Team from "domain/model/team/Team"
import TeamCreateCommand from "app/application/team/TeamCreateCommand"

export default interface PairFactoryInterface {
    update(command: TeamCreateCommand, team: Team): Promise<Team>;
}