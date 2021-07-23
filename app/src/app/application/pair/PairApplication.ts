import PairRepositoryInterface from 'domain/model/pair/PairRepositoryInterface';
import PairFactory from 'domain/factory/PairFactory';
import PairDomainService from 'domain/domainservice/PairDomainService';
import UserRepositoryInterface from 'domain/model/user/UserRepositoryInterface';


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
            // ※※※※ DTOに詰め替えること ※※※※
            return pairAggregations;
        } catch (e) {
            throw new Error(`Error PairApplication::findPairAll(): ${e.message}`);
        }
    }

    // NOTE::UserApplication::update()と全く同じになる
    public async update(data: { id: string, team_id: string, belong: boolean, pair_name: string }) {
        try {
            // pair_idに紐づくPair情報を持ったUser集約
            const pairEntity = await this.pairRepository.find(data.id);
            // teams_idに紐づくTeam情報を持ったUser集約
            let pairData = await this.pairFactory.updatePair(pairEntity);
            await this.pairRepository.update(pairData);
        } catch (e) {
            throw new Error(`Error PairApplication::update(): ${e.message}`);
        }
    }
}