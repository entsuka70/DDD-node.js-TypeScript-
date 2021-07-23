import UserRepositoryInterface from 'domain/model/user/UserRepositoryInterface';
import UserFactory from 'domain/factory/UserFactory';
import UserDomainService from 'domain/domainservice/UserDomainService';
import PairRepositoryInterface from 'domain/model/pair/PairRepositoryInterface';
import PairDomainService from 'domain/domainservice/PairDomainService';
import PairFactory from 'domain/factory/PairFactory';


export default class UserApplication {
    private readonly userRepository: UserRepositoryInterface;
    private readonly userDomainService: UserDomainService;
    private readonly userFactory: UserFactory;
    private readonly pairRepository: PairRepositoryInterface;
    private readonly pairDomainService: PairDomainService;
    private readonly pairFactory: PairFactory;

    constructor(userRepository: UserRepositoryInterface, pairRepository: PairRepositoryInterface) {
        this.userRepository = userRepository;
        this.pairRepository = pairRepository
        // コンストラクタで渡すとコントローラー層で呼び出すことが必要になるので、ここでドメインサービス初期化
        this.userDomainService = new UserDomainService(userRepository);
        this.userFactory = new UserFactory();
        this.pairDomainService = new PairDomainService(pairRepository, userRepository);
        this.pairFactory = new PairFactory(this.pairDomainService);
    }

    public async findUserAll() {
        try {
            const userAggregations = await this.userRepository.findAll();
            // ※※※※ DTOに詰め替えること ※※※※
            return userAggregations;
        } catch (e) {
            throw new Error(e.message);
        }
    }

    public async create(data: { user_name: string, email: string, pair_id: string, status: number }) {
        try {
            // メールアドレス重複チェック
            await this.userDomainService.isExist(data);
            let userAggregation = await this.userFactory.create(data);
            await this.userRepository.save(userAggregation);
        } catch (e) {
            throw new Error(e.message);
        }
    }

    public async update(data: { id: string, user_name: string, email: string, pair_id: string, status: number }) {
        try {
            const user = await this.userRepository.find(data.id);
            // メールアドレス重複チェック
            await this.userDomainService.isExist(data);
            // Factoryで更新する集約を形成
            let userData = await this.userFactory.updateUser(user);
            // 在籍以外の状態であれば自動でペア・チーム無所属
            // userData = await this.userDomainService.setNoPairAndNoTeamByBelong(userData);
            // ペアの自動編成
            // 4人:2つに分割,1名自動移動(未実装)
            // const userDatas = await this.pairDomainService.controlPairUser(userData);
            await this.userRepository.update(userData);

        } catch (e) {
            throw new Error(e.message);
        }
    }

    public async delete(id: string) {
        try {
            await this.userRepository.delete(id);
        } catch (e) {
            throw new Error(e.message);
        }
    }
}