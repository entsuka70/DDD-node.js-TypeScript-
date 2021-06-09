import UserRepositoryInterface from 'domain/repository/users/UserRepositoryInterface';
import UserFactoryInterface from 'domain/factory/users/UserFactoryInterface';


export default class PairApplication {
    private readonly userRepository: UserRepositoryInterface;
    private readonly userFactory: UserFactoryInterface;

    constructor(userRepository: UserRepositoryInterface, userFactory: UserFactoryInterface) {
        this.userRepository = userRepository;
        this.userFactory = userFactory;
    }

    public async findPairAll() {
        try {
            const userEntities = await this.userRepository.findAll();
            const userAll = await this.userFactory.createPairAll(userEntities);
            return userAll;
        } catch (e) {
            throw new Error(`Error PairApplication::findUserAll(): ${e.message}`);
        }
    }

    public async create(data: object) {
        try {
            const user_data = await this.userFactory.createPair(data);
            await this.userRepository.create(user_data);
        } catch (e) {
            throw new Error(`Error PairApplication::create(): ${e.message}`);
        }
    }

    public async update(data: {id:number, user_name: string|null, email: string|null, pair_id: number|null, belong_id: number|null}) {
        try {
            const userAggregation = await this.userRepository.findByUserId(data.id);
            const userEntity = await this.userFactory.createPair(userAggregation);
            await this.userRepository.update(userEntity, data);
        } catch (e) {
            throw new Error(`Error PairApplication::update(): ${e.message}`);
        }
    }

    public async delete(id: number) {
        try {
            await this.userRepository.delete(id);
        } catch (e) {
            throw new Error(`Error PairApplication::delete(): ${e.message}`);
        }
    }
}