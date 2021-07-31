import TeamRepositoryInterface from 'domain/model/team/TeamRepositoryInterface';
import TeamFactory from 'domain/factory/TeamFactory';

export default class TeamApplication {
    private readonly teamRepository: TeamRepositoryInterface;
    private readonly teamFactory: TeamFactory;

    constructor(teamRepository: TeamRepositoryInterface) {
        this.teamRepository = teamRepository;
        this.teamFactory = new TeamFactory();
    }

    public async findTeamAll() {
        try {
            const teamEntities = await this.teamRepository.findAll();
            // ※※※※ DTOに詰め替えること ※※※※
            return teamEntities;
        } catch (e) {
            throw new Error(`Error TeamApplication::findPairAll(): ${e.message}`);
        }
    }

    public async update(data: { id: string }) {
        try {
            const teamAggregation = await this.teamRepository.find(data.id);
            // TODO:要動作確認
            await this.teamRepository.update(teamAggregation);
        } catch (e) {
            throw new Error(`Error TeamApplication::update(): ${e.message}`);
        }
    }
}