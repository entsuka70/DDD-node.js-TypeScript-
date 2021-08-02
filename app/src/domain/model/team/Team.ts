import TeamId from "./TeamId";
import TeamName from "./TeamName";
import UserId from "../user/UserId";
import PairId from "../pair/PairId";

export type TeamProps = {
    id: TeamId
    team_name: TeamName
    pair_ids: PairId[]
    user_ids: UserId[]
}

export default class Team {
    private id: TeamId;
    private team_name: TeamName;
    private pair_ids: PairId[];
    private user_ids: UserId[];

    static MIN_TEAM_USER = 3;

    constructor(props: TeamProps) {
        const { id, team_name, pair_ids, user_ids } = props;

        if (!id) {
            throw new Error('Please set id at TeamId Domain')
        }
        if (!team_name) {
            throw new Error('Please set team_name at Team Domain')
        }
        if (!pair_ids) {
            throw new Error('Please set pair_ids at Team Domain')
        }
        if (!user_ids) {
            throw new Error('Please set user_ids at Team Domain')
        }

        // 現時点で未所属チームが発生しているので仮コメントアウト
        // if (user_ids.length < Team.MIN_TEAM_USER) {
        //     throw new Error('Make sure you have at least 3 users in your team.')
        // }

        this.id = id;
        this.team_name = team_name;
        this.pair_ids = pair_ids;
        this.user_ids = user_ids;
    }

    public getAllProperties() {
        return {
            id: this.id,
            team_name: this.team_name,
            pair_ids: this.pair_ids,
            user_ids: this.user_ids
        };
    }

    public getId() {
        return this.id.get();
    }

    public getTeamName() {
        return this.team_name.get();
    }

    public getPairIds() {
        return this.pair_ids.map((pair_id) => pair_id.get());
    }

    public getUserIds() {
        return this.user_ids.map((user_id) => user_id.get());
    }

    public changePairIds(pair_ids?: PairId[]) {
        this.pair_ids = pair_ids ?? []
    }

    public changeUserIds(user_ids?: UserId[]) {
        this.user_ids = user_ids ?? []
    }

    public acceptTeam(team: Team) {
        this.pair_ids = this.pair_ids.concat(team.pair_ids);
        this.user_ids = this.user_ids.concat(team.user_ids);
    }

}