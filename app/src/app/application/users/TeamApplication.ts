import UserRepositoryInterface from 'domain/model/user/UserRepositoryInterface';
import UserFactory from 'domain/factory/UserFactory';
import UserDomainService from 'domain/domainservice/UserDomainService';


export default class TeamApplication {
    private readonly userRepository: UserRepositoryInterface;
    private readonly userFactory: UserFactory;
    private readonly userDomainService: UserDomainService;

    constructor(userRepository: UserRepositoryInterface) {
        this.userRepository = userRepository;
        this.userDomainService = new UserDomainService(userRepository);
        this.userFactory = new UserFactory();
    }

    public async findTeamAll() {
        try {
            const userEntities = await this.userRepository.findAll();
            // ※※※※ DTOに詰め替えること ※※※※
            return userEntities;
        } catch (e) {
            throw new Error(`Error PairApplication::findPairAll(): ${e.message}`);
        }
    }

    public async update(data: { id: string }) {
        try {
            const userAggregation = await this.userRepository.find(data.id);
            // TODO:要動作確認
            await this.userRepository.update(userAggregation);
        } catch (e) {
            throw new Error(`Error PairApplication::update(): ${e.message}`);
        }
    }
}