import UserRepositoryInterface from 'domain/repository/UserRepositoryInterface';
import UserFactory from 'domain/factory/UserFactory';
import UserDomainService from 'domain/domainservice/UserDomainService';


export default class UserApplication {
    private readonly userRepository: UserRepositoryInterface;
    private readonly userDomainService: UserDomainService;
    private readonly userFactory: UserFactory;

    constructor(userRepository: UserRepositoryInterface) {
        this.userRepository = userRepository;
        // コンストラクタで渡すとコントローラー層で呼び出すことが必要になるので、ここでドメインサービス初期化
        this.userDomainService = new UserDomainService(userRepository);
        this.userFactory = new UserFactory(this.userDomainService);
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

    public async create(data: { user_name: string, email: string, pair_id: number, belong_id: number }) {
        try {
            // メールアドレス重複チェック
            await this.userDomainService.checkDuplicateEmail(data);
            let userAggregation = await this.userFactory.createUser(data);
            await this.userRepository.create(userAggregation);
        } catch (e) {
            throw new Error(e.message);
        }
    }

    public async update(data: { id: number, user_name: string, email: string, pair_id: number, belong_id: number }) {
        try {
            // メールアドレス重複チェック
            await this.userDomainService.checkDuplicateEmail(data);
            // User集約取得
            const userAggregation = await this.userRepository.findByUserId(data.id);
            // pair_idに紐づくPair情報を持ったUser集約
            // ----- TODO:belongにidはあってもuserがdata.belong_idを持っていないと指定のbelong_idに更新できないので修正する -----
            const pairData = await this.userRepository.findByPairId(data.pair_id);
            // belong_idに紐づくBelong情報を持ったUser集約
            // ----- TODO:belongにidはあってもuserがdata.belong_idを持っていないと指定のbelong_idに更新できないので修正する -----
            const belongData = await this.userRepository.findByBelongId(data.belong_id);

            // Factoryで更新する集約を形成
            let userData = await this.userFactory.updateUser(data, userAggregation, pairData, belongData);
            console.log(userAggregation);
            console.log(pairData);
            console.log(belongData);
            console.log(userData);
            // 在籍以外の状態であれば自動でペア・チーム無所属
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