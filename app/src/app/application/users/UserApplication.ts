import UserRepositoryInterface from 'domain/repository/users/UserRepositoryInterface';
import UserFactoryInterface from 'domain/factory/users/UserFactoryInterface';


export default class UserApplication {
    private readonly userRepository: UserRepositoryInterface;
    private readonly userFactory: UserFactoryInterface;

    constructor(userRepository: UserRepositoryInterface, userFactory: UserFactoryInterface) {
        this.userRepository = userRepository;
        this.userFactory = userFactory;
    }

    public async findUserAll() {
        try {
            const userEntities = await this.userRepository.findUserAll();
            const userAll = await this.userFactory.createUserAll(userEntities);
            return userAll;
        } catch (e) {
            throw new Error(`Error UserApplication::findUserAll(): ${e.message}`);
        }
    }

    public async create(data: object) {
        try {
            const user_data = await this.userFactory.createUser(data);
            await this.userRepository.create(user_data);
        } catch (e) {
            throw new Error(`Error UserApplication::create(): ${e.message}`);
        }
    }

    public async update(data: {id:number, user_name: string|null, email: string|null, pair_id: number|null, belong_id: number|null}) {
        try {
            const userAggregation = await this.userRepository.findByUserId(data.id);
            const userEntity = await this.userFactory.createUser(userAggregation);
            await this.userRepository.update(userEntity, data);
        } catch (e) {
            throw new Error(`Error UserApplication::update(): ${e.message}`);
        }
    }

    public async delete(id: number) {
        try {
            await this.userRepository.delete(id);
        } catch (e) {
            throw new Error(`Error UserApplication::delete(): ${e.message}`);
        }
    }
}