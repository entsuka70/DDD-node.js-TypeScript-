import User from "domain/entity/users/user";
import Pair from "domain/entity/users/pair";
import Team from "domain/entity/users/team";
import PairRepositoryInterface from "domain/repository/PairRepositoryInterface";

export default class PairDomainService {

    private readonly pairRepository: PairRepositoryInterface;

    constructor(pairRepository: PairRepositoryInterface) {
        this.pairRepository = pairRepository;
    }

}