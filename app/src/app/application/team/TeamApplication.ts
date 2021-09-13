import TeamRepositoryInterface from '../../../domain/model/team/TeamRepositoryInterface';
import TeamDomainService from '../../../domain/domainservice/TeamDomainService';
import TeamFactory from '../../../domain/factory/TeamFactory';
import TeamCreateCommand from './TeamCreateCommand';
import TeamDto from './TeamDto';
import Team from '../../../domain/model/team/Team';
import PairRepositoryInterface from '../../../domain/model/pair/PairRepositoryInterface';
import UserRepositoryInterface from '../../../domain/model/user/UserRepositoryInterface';

export default class TeamApplication {
  private readonly teamRepository: TeamRepositoryInterface;
  private readonly pairRepository: PairRepositoryInterface;
  private readonly userRepository: UserRepositoryInterface;
  private readonly teamDomainService: TeamDomainService;
  private readonly teamFactory: TeamFactory;

  constructor(
    teamRepository: TeamRepositoryInterface,
    pairRepository: PairRepositoryInterface,
    userRepository: UserRepositoryInterface
  ) {
    this.teamRepository = teamRepository;
    this.pairRepository = pairRepository;
    this.userRepository = userRepository;
    this.teamDomainService = new TeamDomainService(teamRepository);
    this.teamFactory = new TeamFactory(
      teamRepository,
      pairRepository,
      userRepository
    );
  }

  public async findTeamAll(): Promise<TeamDto[]> {
    const teamEntities = await this.teamRepository.findAll();
    const teamDtos = teamEntities.map((teamEntity) => new TeamDto(teamEntity));
    return teamDtos;
  }

  public async update(command: TeamCreateCommand): Promise<void> {
    const team = await this.teamRepository.find(command.id);

    // チーム集約・重複存在がないか確認
    if (
      command.team_name &&
      !(await this.teamDomainService.isExist(command.team_name, 'team_name'))
    ) {
      throw new Error(
        `Cannot register because of duplicate team name. team_name: ${command.team_name} `
      );
    }

    const rebuildTeam = await this.teamFactory.update(command, team);
    // ※※※ 2名以下のチームは他のチームに自動合流 ※※※
    if (rebuildTeam.getUserIds().length < Team.MIN_TEAM_USER) {
      console.log(
        'Automatic merging due to small number of users to be updated.'
      );
      // 3名以上参加しているチームを探索
      const canJoinTeam = await this.teamRepository.findMinUser();
      if (canJoinTeam == null) {
        throw new Error('There is not exist Team which has min user');
      }
      // チーム合流
      canJoinTeam.acceptTeam(rebuildTeam);
      await this.teamRepository.update(canJoinTeam);
      return;
    }

    // ※※※ ユーザーに紐付くペア ※※※
    // ※※※ ペアに紐付くユーザー ※※※
    // どちらも同時更新
    await this.teamRepository.update(rebuildTeam);
  }
}
