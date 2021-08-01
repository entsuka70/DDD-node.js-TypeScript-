import TeamRepositoryInterface from 'domain/model/team/TeamRepositoryInterface';
import TeamDomainService from 'domain/domainservice/TeamDomainService';
import TeamFactory from 'domain/factory/TeamFactory';
import TeamCreateCommand from './TeamCreateCommand';
import TeamDto from './TeamDto';

export default class TeamApplication {
    private readonly teamRepository: TeamRepositoryInterface;
    private readonly teamDomainService: TeamDomainService;
    private readonly teamFactory: TeamFactory;

    constructor(teamRepository: TeamRepositoryInterface) {
        this.teamRepository = teamRepository;
        this.teamDomainService = new TeamDomainService(teamRepository);
        this.teamFactory = new TeamFactory();
    }

    public async findTeamAll() {
        try {
            const teamEntities = await this.teamRepository.findAll();
            const teamDtos = teamEntities.map((teamEntity) => new TeamDto(teamEntity));
            return teamDtos;
        } catch (e) {
            throw new Error(`Error TeamApplication::findTeamAll(): ${e.message}`);
        }
    }

    public async update(command: TeamCreateCommand) {
        try {
            const teamAggregation = await this.teamRepository.find(command.id);
            // チーム集約・重複存在がないか確認
            if (teamAggregation.getTeamName() && !await this.teamDomainService.isExist(command.team_name, 'team_name')) {
                throw new Error(`Cannot register because of duplicate team name. team_name: ${command.team_name} `)
            }


            await this.teamRepository.update(teamAggregation);
        } catch (e) {
            throw new Error(`Error TeamApplication::update(): ${e.message}`);
        }
    }
}