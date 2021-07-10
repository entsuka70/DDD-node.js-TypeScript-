import UserRepositoryInterface from 'domain/repository/UserRepositoryInterface';
import UserFactory from 'domain/factory/UserFactory';
import UserDomainService from 'domain/domainservice/UserDomainService';


export default class PairApplication {
    private readonly userRepository: UserRepositoryInterface;
    private readonly userDomainService: UserDomainService;
    private readonly userFactory: UserFactory;

    constructor(userRepository: UserRepositoryInterface) {
        this.userRepository = userRepository;
        this.userDomainService = new UserDomainService(userRepository);
        this.userFactory = new UserFactory(this.userDomainService);
    }

    public async findPairAll() {
        try {
            const userAggregations = await this.userRepository.findAll();
            const pairAll = await this.userFactory.createPairAll(userAggregations);
            return pairAll;
        } catch (e) {
            throw new Error(`Error PairApplication::findPairAll(): ${e.message}`);
        }
    }

    // NOTE::UserApplication::update()と全く同じになる
    public async update(data: { id: number, pair_name: string, teams_id: number }) {
        try {
            // pair_idに紐づくPair情報を持ったUser集約
            const userPairAggregation = await this.userRepository.findByPairId(data.id);
            // teams_idに紐づくTeam情報を持ったUser集約
            const teamData = await this.userRepository.findByTeamId(data.teams_id);
            const userData = await this.userFactory.updatePair(data, userPairAggregation, teamData);
            await this.userRepository.update(userData);
        } catch (e) {
            throw new Error(`Error PairApplication::update(): ${e.message}`);
        }
    }
}