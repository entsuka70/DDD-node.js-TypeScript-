import UserRepositoryInterface from 'domain/repository/UserRepositoryInterface';
import UserFactoryInterface from 'domain/factory/UserFactoryInterface';


export default class PairApplication {
    private readonly userRepository: UserRepositoryInterface;
    private readonly userFactory: UserFactoryInterface;

    constructor(userRepository: UserRepositoryInterface, userFactory: UserFactoryInterface) {
        this.userRepository = userRepository;
        this.userFactory = userFactory;
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
    public async update(data: { id: number }) {
        try {
            // TODO:userIdで検索しているのでpairIdで検索するようにする
            const userAggregation = await this.userRepository.findByPairId(data.id);
            const userData = await this.userFactory.updateUser(data, userAggregation);
            await this.userRepository.update(userData);
        } catch (e) {
            throw new Error(`Error PairApplication::update(): ${e.message}`);
        }
    }
}