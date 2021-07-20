import User from "domain/entity/users/user/user";
import Pair from "domain/entity/users/pair";
import Team from "domain/entity/users/team";
import PairRepositoryInterface from "domain/repository/PairRepositoryInterface";
import UserRepositoryInterface from "domain/repository/UserRepositoryInterface";

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
    public async controlPairUser(user: User): Promise<any> {
        const user_ids = user.getAllProperties().pair.getAllProperties().user_id;
        console.log(user_ids)
        let users = [];
        if (user_ids) {
            for (let i = 0; i < user_ids.length; i++) {
                // 4人の時のペア自動分割
                if (user_ids.length === PairDomainService.SEPARATE_PAIR_USER_NUMBER) {
                    console.log('pair includes 4 persons')
                    let fixed_user_ids = user_ids.slice(0, 2);
                    let separated_user_ids = user_ids.slice(2);
                    let fixed_users = await this.userRepository.findByUserIds(fixed_user_ids);
                    fixed_users = fixed_users.map((user): User => {
                        user.getAllProperties().pair.getAllProperties().user_id = fixed_user_ids;
                        return user;
                    });
                    let no_user_pair = await this.pairRepository.findNoUserPairByUserId();
                    let separated_users = await this.userRepository.findByUserIds(separated_user_ids);
                    separated_users = separated_users.map((user): User => {
                        const no_user_pair_id = no_user_pair.getAllProperties().id;
                        user.getAllProperties().pair_id = no_user_pair_id ?? User.DEFAULT_PAIR_ID;
                        user.getAllProperties().pair = no_user_pair;
                        return user;
                    });

                    users.push(fixed_users);
                    users.push(separated_users);

                    return users;
                } else if (user_ids.length > PairDomainService.MAX_PAIR_USER_NUMBER) {

                }
            }
            // return users;
        }
        return [user];
    }
}