import User from "domain/model/user/User";
import Pair from "domain/model/pair";
import Team from "domain/model/team";
import PairRepositoryInterface from "domain/model/pair/PairRepositoryInterface";
import UserRepositoryInterface from "domain/model/user/UserRepositoryInterface";

export default class PairDomainService {

    private readonly pairRepository: PairRepositoryInterface;
    private readonly userRepository: UserRepositoryInterface;

    static MAX_PAIR_USER_NUMBER = 3;
    static SEPARATE_PAIR_USER_NUMBER = 4;

    constructor(pairRepository: PairRepositoryInterface, userRepository: UserRepositoryInterface) {
        this.pairRepository = pairRepository;
        this.userRepository = userRepository;
    }

    // ペア人数の自動編成

}