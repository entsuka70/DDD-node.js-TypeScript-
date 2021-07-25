import PairRepositoryInterface from 'domain/model/pair/PairRepositoryInterface';
import PairFactory from 'domain/factory/PairFactory';
import PairDomainService from 'domain/domainservice/PairDomainService';
import UserRepositoryInterface from 'domain/model/user/UserRepositoryInterface';
import PairDto from './PairDto';
import PairCreateCommand from './PairCreateCommand';


export default class PairApplication {
    private readonly pairRepository: PairRepositoryInterface;
    private readonly pairDomainService: PairDomainService;
    private readonly pairFactory: PairFactory;
    private readonly userRepository: UserRepositoryInterface;

    constructor(pairRepository: PairRepositoryInterface, userRepository: UserRepositoryInterface) {
        this.pairRepository = pairRepository;
        this.userRepository = userRepository;
        this.pairDomainService = new PairDomainService(pairRepository, userRepository);
        this.pairFactory = new PairFactory(this.pairDomainService);
    }

    public async findPairAll() {
        try {
            const pairAggregations = await this.pairRepository.findAll();
            const pairDtos = pairAggregations.map((pairAggregation) => new PairDto(pairAggregation));
            return pairDtos;
        } catch (e) {
            throw new Error(`Error PairApplication::findPairAll(): ${e.message}`);
        }
    }

    public async update(command: PairCreateCommand) {
        try {
            const pair = await this.pairRepository.find(command.id);
            // ユーザーid存在チェック
            if (command.user_ids && !await this.pairDomainService.isExist(command, 'user_ids')) {
                throw new Error(`UserId does not exist. You can not register ${command.user_ids}`);
            }
            const pairRebuild = await this.pairFactory.update(command, pair);
            await this.pairRepository.update(pairRebuild);
        } catch (e) {
            throw new Error(`Error PairApplication::update(): ${e.message}`);
        }
    }
}