import UserRepositoryInterface from 'domain/repository/users/UserRepositoryInterface';
import UserFactoryInterface from 'domain/factory/users/UserFactoryInterface';


export default class TeamApplication {
    private readonly userRepository: UserRepositoryInterface;
    private readonly userFactory: UserFactoryInterface;

    constructor(userRepository: UserRepositoryInterface, userFactory: UserFactoryInterface) {
        this.userRepository = userRepository;
        this.userFactory = userFactory;
    }

    public async findTeamAll() {
        try {
            const userEntities = await this.userRepository.findAll();
            const teamAll = await this.userFactory.createTeamAll(userEntities);
            return teamAll;
        } catch (e) {
            throw new Error(`Error PairApplication::findPairAll(): ${e.message}`);
        }
    }

    // NOTE::UserApplication::update()と全く同じになる
    public async update(data: { id: number }) {
        try {
            const userAggregation = await this.userRepository.findByUserId(data.id);
            await this.userRepository.update(userAggregation, data);
        } catch (e) {
            throw new Error(`Error PairApplication::update(): ${e.message}`);
        }
    }
}