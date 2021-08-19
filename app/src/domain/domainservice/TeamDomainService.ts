import Team from 'domain/model/team/Team';
import TeamRepositoryInterface from 'domain/model/team/TeamRepositoryInterface';

export default class TeamDomainService {
  private readonly teamRepository: TeamRepositoryInterface;

  constructor(teamRepository: TeamRepositoryInterface) {
    this.teamRepository = teamRepository;
  }

  // 既に永続下層に存在する対象User確認
  public async isExist(
    target: string | number,
    type: string
  ): Promise<boolean> {
    if (!target) {
      return false;
    }
    const teams = await this.teamRepository.findAll();
    const isExistUser = teams.filter((team) => {
      switch (type) {
        case 'team_name':
          team.getTeamName() === target;
          break;
        default:
      }
    });
    if (isExistUser.length) {
      return true;
    }
    return false;
  }
}
