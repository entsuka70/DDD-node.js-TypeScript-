import Team from 'src/domain/model/team/Team';

export default class TeamDto {
  public readonly id: string;
  public readonly team_name: number;
  public readonly pair_ids: string[];
  public readonly user_ids: string[];

  constructor(team: Team) {
    this.id = team.getId();
    this.team_name = team.getTeamName();
    this.pair_ids = team.getPairIds();
    this.user_ids = team.getUserIds();
  }
}
