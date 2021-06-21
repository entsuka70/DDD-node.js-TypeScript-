import BelongsValueObject from "domain/valueobject/belongs";
import User from "domain/entity/users/user";
import Pair from "domain/entity/users/pair";
import Team from "domain/entity/users/team";

export default class UserDomainService {
    // ステータスが在籍中以外の場合、どのチームにもペアにも存在させない
    public setNoPairAndNoTeamByBelong(user: User): User {
        const belong = user.getAllProperties().belong;

        if (belong.getBelongs().belong !== BelongsValueObject.BELONGS) {
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
                    team: teamIns
                };
                const pairIns = new Pair(pair);
                const userProp = {
                    id: user.getAllProperties().id,
                    pair_id: Pair.DEFAULT_NO_PAIR_ID,
                    belong_id: belong.getBelongs().id,
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
}