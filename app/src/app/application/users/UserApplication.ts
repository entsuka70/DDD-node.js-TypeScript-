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
            throw new Error(`Error UserApplication::finUSerAll(): ${e.message}`);
        }
    }
}