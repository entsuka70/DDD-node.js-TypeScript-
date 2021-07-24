import PairId from 'domain/model/pair/PairId';
import TeamId from 'domain/model/team/TeamId';
import UserId from '../user/UserId';
import PairName from './PairName';

type PairProps = {
    id: PairId
    team_id: TeamId
    pair_name: PairName
    user_ids: UserId[]
}

export default class Pair {
    static MIN_PAIR_USER = 1;
    static MAX_PAIR_USER = 4;

    private id: PairId;
    private team_id: TeamId;
    private pair_name: PairName;
    private user_ids: UserId[];

    constructor(props: PairProps) {
        const { id, team_id, pair_name, user_ids } = props;

        if (!id) {
            throw new Error('Please set id at Pair Domain')
        }
        if (!team_id) {
            throw new Error('Please set team_id at Pair Domain')
        }
        if (!pair_name) {
            throw new Error('Please set pair_name at Pair Domain')
        }
        if (!user_ids) {
            throw new Error('Please set user_ids at Pair Domain')
        }
        if (user_ids.length <= Pair.MIN_PAIR_USER && user_ids.length >= Pair.MAX_PAIR_USER) {
            throw new Error('Incorrect number of users joining the pair at Pair Domain')
        }

        this.id = id;
        this.team_id = team_id;
        this.pair_name = pair_name;
        this.user_ids = user_ids;
    }

    public getAllProperties() {
        return {
            id: this.id,
            teams_id: this.team_id,
            pair_name: this.pair_name,
            user_ids: this.user_ids,
        };
    }

    public getId() {
        return this.id.get()
    }

    public getTeamId() {
        return this.team_id.get()
    }

    public getPairName() {
        return this.pair_name.get()
    }

    public getUserIds() {
        return this.user_ids.map((user_id) => user_id.get());
    }
}