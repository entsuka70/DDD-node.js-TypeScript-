import User from "domain/model/user/User";
import PairId from 'domain/model/pair/PairId';
import TeamId from 'domain/model/team/TeamId';
import UserRepositoryInterface from "domain/model/user/UserRepositoryInterface";

export default class UserDomainService {

    private readonly userRepository: UserRepositoryInterface;

    constructor(userRepository: UserRepositoryInterface) {
        this.userRepository = userRepository;
    }

    // 既に永続下層に存在する対象User確認
    public async isExist(target: string, type: string): Promise<Boolean> {
        if (!target) {
            return false;
        }
        const users = await this.userRepository.findAll();
        const isExistUser = users.filter((user) => {
            switch (type) {
                case 'email':
                    user.getEmail() === target
                    break;
                case 'pair_id':
                    user.getPairId() === target
                    break;
                case 'team_id':
                    user.getTeamId() === target
                    break;
                default:
            }
        });
        if (isExistUser.length) {
            return true;
        }
        return false;
    }

    // 在籍以外の状態であれば自動でペア・チーム無所属
    public async setPairAndTeam(user: User): Promise<User> {
        user.changePairId(new PairId(PairId.DEFAULT_PAIR_ID));
        user.changeTeamId(new TeamId(TeamId.DEFAULT_TEAM_ID));
        return user;
    }

}