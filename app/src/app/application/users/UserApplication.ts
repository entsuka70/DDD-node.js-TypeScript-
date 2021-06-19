import UserRepositoryInterface from 'domain/repository/UserRepositoryInterface';
import UserFactoryInterface from 'domain/factory/UserFactoryInterface';


export default class UserApplication {
    private readonly userRepository: UserRepositoryInterface;
    private readonly userFactory: UserFactoryInterface;

    constructor(userRepository: UserRepositoryInterface, userFactory: UserFactoryInterface) {
        this.userRepository = userRepository;
        this.userFactory = userFactory;
    }

    public async findUserAll() {
        try {
            const userAggregations = await this.userRepository.findAll();
            const userAll = await this.userFactory.createUserAll(userAggregations);
            return userAll;
        } catch (e) {
            throw new Error(e.message);
        }
    }

    public async create(data: object) {
        try {
            const userAggregation = await this.userFactory.createUser(data);
            await this.userRepository.create(userAggregation);
        } catch (e) {
            throw new Error(e.message);
        }
    }

    public async update(data: { id: number }) {
        try {
            const userAggregation = await this.userRepository.findByUserId(data.id);
            const userData = await this.userFactory.updateUser(data);
            await this.userRepository.update(userAggregation, userData);
        } catch (e) {
            throw new Error(e.message);
        }
    }

    public async delete(id: number) {
        try {
            await this.userRepository.delete(id);
        } catch (e) {
            throw new Error(e.message);
        }
    }
}