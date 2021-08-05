import PairId from 'domain/model/pair/PairId';
import TeamId from 'domain/model/team/TeamId';
import UserId from '../user/UserId';
import PairName from './PairName';

type Props = {
    id: PairId
    team_id: TeamId
    pair_name: PairName
    user_ids: UserId[]
}

export type PairProps = Required<Props>

export default class Pair {
    static MIN_PAIR_USER = 1;
    static MIN_ACCEPTABLE_PAIR_USER = 2;
    static MAX_PAIR_USER = 4;

    private id: PairId;
    private team_id: TeamId;
    private pair_name: PairName;
    private user_ids: UserId[];

    constructor(props: PairProps) {
        const { id, team_id, pair_name, user_ids } = props;

        // ユーザー数5名以上のペアは形成不可
        if (user_ids.length > Pair.MAX_PAIR_USER) {
            throw new Error(`Can not set many users. ${user_ids}`)
        }

        this.id = id;
        this.team_id = team_id;
        this.pair_name = pair_name;
        this.user_ids = user_ids;
    }

    public getAllProperties() {
        return {
            id: this.id.get(),
            team_id: this.team_id.get(),
            pair_name: this.pair_name.get(),
            user_ids: this.user_ids.map((id) => id.get()),
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

    public getUserIdsInstance() {
        return this.user_ids;
    }

    public changeUserIds(user_ids?: UserId[]) {
        this.user_ids = user_ids ?? []
    }

    public isExistUser(user_id: string) {
        return this.user_ids.some((u_id) => u_id.get() === user_id);
    }
}