import BelongsValueObject from "domain/valueobject/belongs";
import User from "domain/entity/users/user";
import Pair from "domain/entity/users/pair";
import Team from "domain/entity/users/team";
import UserRepositoryInterface from "domain/repository/UserRepositoryInterface";

export default class UserDomainService {

    private readonly userRepository: UserRepositoryInterface;

    static MAX_PAIR_USER = 3;

    constructor(userRepository: UserRepositoryInterface) {
        this.userRepository = userRepository;
    }

    // ステータスが在籍中以外の場合、どのチームにもペアにも存在させない
    public setNoPairAndNoTeamByBelong(user: User): User {
        const belong = user.getAllProperties().belong;

        if (belong.getAllProperties().belong !== BelongsValueObject.BELONGS) {
            let pairId = user.getAllProperties().pair_id;
            let teamId = user.getAllProperties().pair.getAllProperties().teams_id;

            if (pairId !== Pair.DEFAULT_NO_PAIR_ID || teamId !== Pair.DEFAULT_NO_PAIR_ID) {
                user.getAllProperties().pair_id = Pair.DEFAULT_NO_PAIR_ID;

                const team = {
                    id: Team.DEFAULT_NO_TEAM_ID,
                    team_name: Team.TEAM_NAME_NO_BELONG,
                };
                const teamIns = new Team(team);
                const pair = {
                    id: Pair.DEFAULT_NO_PAIR_ID,
                    teams_id: Team.DEFAULT_NO_TEAM_ID,
                    pair_name: user.getAllProperties().pair.getAllProperties().pair_name,
                    team: teamIns,
                    // NOTE:本来は複数入るが、Userエンティティに関わる処理を全体的に見直し必要なので一旦保留
                    user_id: user.getAllProperties().id != undefined ? [Pair.DEFAULT_NO_PAIR_ID] : undefined,
                };
                const pairIns = new Pair(pair);
                const userProp = {
                    id: user.getAllProperties().id,
                    pair_id: Pair.DEFAULT_NO_PAIR_ID,
                    belong_id: belong.getAllProperties().id,
                    user_name: user.getAllProperties().user_name,
                    email: user.getAllProperties().email,
                    belong: belong,
                    pair: pairIns
                }
                console.error('Breaking or Withdrawal user does not has pair and team. This user is set no-pair and no-team.');
                return new User(userProp);
            }
        }
        return user;
    }

    // 重複するメールアドレスは許容しない
    public async checkDuplicateEmail(data: { email: string }): Promise<void> {
        const users = await this.userRepository.findAll();
        const duplicateEmailUser = users.filter((user) => user.getAllProperties().email === data.email);
        if (duplicateEmailUser.length) {
            throw new Error('email is duplicate.');
        }
        return;
    }

    public controlPairUser(user: User): void {
        // const user_ids = pair.getAllProperties().user_id;
        // if (user_ids && user_ids.length > UserDomainService.MAX_PAIR_USER) {
        //     let pop_user_id = user_ids.pop();
        // }
        return;
    }
}