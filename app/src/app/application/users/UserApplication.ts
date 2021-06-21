import UserRepositoryInterface from 'domain/repository/UserRepositoryInterface';
import UserFactoryInterface from 'domain/factory/UserFactoryInterface';
import UserDomainService from 'domain/domainservice/UserDomainService';


export default class UserApplication {
    private readonly userRepository: UserRepositoryInterface;
    private readonly userFactory: UserFactoryInterface;
    private readonly userDomainService: UserDomainService;

    constructor(userRepository: UserRepositoryInterface, userFactory: UserFactoryInterface) {
        this.userRepository = userRepository;
        this.userFactory = userFactory;
        // コンストラクタで渡すとコントローラー層で呼び出すことが必要になるので、ここでドメインサービス初期化
        this.userDomainService = new UserDomainService();
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
            let userAggregation = await this.userFactory.createUser(data);
            await this.userRepository.create(userAggregation);
        } catch (e) {
            throw new Error(e.message);
        }
    }

    public async update(data: { id: number }) {
        try {
            const userAggregation = await this.userRepository.findByUserId(data.id);
            let userData = await this.userFactory.updateUser(data, userAggregation);
            userData = this.userDomainService.setNoPairAndNoTeamByBelong(userData);
            await this.userRepository.update(userData);
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