import User from "domain/entity/users/user";
import Pair from "domain/entity/users/pair";
import Team from "domain/entity/users/team";
import PairRepositoryInterface from "domain/repository/PairRepositoryInterface";

export default class PairDomainService {

    private readonly pairRepository: PairRepositoryInterface;
    static MAX_PAIR_USER = 3;

    constructor(pairRepository: PairRepositoryInterface) {
        this.pairRepository = pairRepository;
    }

    public controlPairUser(pair: Pair): Pair {
        const user_ids = pair.getAllProperties().user_id;
        if (user_ids && user_ids.length > PairDomainService.MAX_PAIR_USER) {
            let pop_user_id = user_ids.pop();
        }
        return pair;
    }
}