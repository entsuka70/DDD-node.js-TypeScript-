import Pair from "domain/model/pair/Pair";
import PairId from 'domain/model/pair/PairId';
import TeamId from "domain/model/team/TeamId";
import PairName from "domain/model/pair/PairName";
import PairFactoryInterface from "domain/factory/PairFactoryInterface";
import PairCreateCommand from "app/application/pair/PairCreateCommand";
import UserId from "domain/model/user/UserId";

export default class PairFactory implements PairFactoryInterface {
    public async create(data: { pair_name: string, belong: boolean, team_id: string }): Promise<object> {
        return data;
    }

    public async update(command: PairCreateCommand, pair: Pair): Promise<Pair> {
        const { id, team_id, pair_name, user_ids } = pair.getAllProperties();
        const props = {
            id: new PairId(command.id),
            team_id: command.team_id ? new TeamId(command.team_id) : new TeamId(team_id),
            pair_name: command.pair_name ? new PairName(command.pair_name) : new PairName(pair_name),
            user_ids: command.user_ids ? command.user_ids.map((id) => new UserId(id)) : user_ids.map((id) => new UserId(id))
        }
        return new Pair(props);
    }

    public move(from: Pair, to: Pair): Pair[] {
        if (from.getUserIds().length != Pair.MIN_PAIR_USER) {
            throw new Error('UserIds which Pair has is not MIN_PAIR_USER(length = 1)')
        }
        const fromUser = from.getUserIds();
        const toUser = to.getUserIds();
        toUser.push(fromUser[0]);
        from.changeUserIds();
        to.changeUserIds(toUser.map((u) => new UserId(u)));
        return [from, to];
    }

}