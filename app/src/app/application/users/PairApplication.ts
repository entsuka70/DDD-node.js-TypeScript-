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
            throw new Error(`Error PairApplication::findPairAll(): ${e.message}`);
        }
    }

    // 仕様変更により不要
    // TODO:利用には修正必要
    // public async create(data: object) {
    //     try {
    //         const user_data = await this.userFactory.createPair(data);
    //         await this.userRepository.create(user_data);
    //     } catch (e) {
    //         throw new Error(`Error PairApplication::create(): ${e.message}`);
    //     }
    // }

    // NOTE::UserApplication::update()と全く同じになる
    public async update(data: { id: number }) {
        try {
            const userAggregation = await this.userRepository.findByUserId(data.id);
            // const userEntity = await this.userFactory.createPair(userAggregation);
            await this.userRepository.update(userAggregation, data);
        } catch (e) {
            throw new Error(`Error PairApplication::update(): ${e.message}`);
        }
    }

    // 仕様変更により不要
    // TODO:利用には修正必要
    // public async delete(id: number) {
    //     try {
    //         await this.userRepository.delete(id);
    //     } catch (e) {
    //         throw new Error(`Error PairApplication::delete(): ${e.message}`);
    //     }
    // }
}