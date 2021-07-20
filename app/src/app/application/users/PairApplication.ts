import PairRepositoryInterface from 'domain/repository/PairRepositoryInterface';
import PairFactory from 'domain/factory/PairFactory';
import PairDomainService from 'domain/domainservice/PairDomainService';
import UserRepositoryInterface from 'domain/repository/UserRepositoryInterface';


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
            const pairAll = await this.pairFactory.createPairAll(pairAggregations);
            return pairAll;
        } catch (e) {
            throw new Error(`Error PairApplication::findPairAll(): ${e.message}`);
        }
    }

    // NOTE::UserApplication::update()と全く同じになる
    public async update(data: { id: number, pair_name: string, teams_id: number }) {
        try {
            // pair_idに紐づくPair情報を持ったUser集約
            const pairEntity = await this.pairRepository.findById(data.id);
            // teams_idに紐づくTeam情報を持ったUser集約
            let pairData = await this.pairFactory.updatePair(data, pairEntity);
            await this.pairRepository.update(pairData);
        } catch (e) {
            throw new Error(`Error PairApplication::update(): ${e.message}`);
        }
    }
}