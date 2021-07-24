import UserId from './UserId';
import UserName from './UserName';
import UserEmail from './UserEmail';
import UserStatus from './UserStatus';
import PairId from '../pair/PairId';
import TeamId from '../team/TeamId';

type UserProps = {
    id: UserId
    pair_id: PairId
    team_id: TeamId
    status: UserStatus
    user_name: UserName
    email: UserEmail
}

export default class User {
    private id: UserId;
    private pair_id: PairId;
    private team_id: TeamId
    private status: UserStatus;
    private user_name: UserName;
    private email: UserEmail;

    constructor(props: UserProps) {
        const { id, pair_id, team_id, status, user_name, email } = props;

        if (!id) {
            throw new Error('Please set id at User Domain')
        }
        if (!pair_id) {
            throw new Error('Please set pair_id at User Domain')
        }
        if (!team_id) {
            throw new Error('Please set team_id at User Domain')
        }
        if (!status) {
            throw new Error('Please set status at User Domain')
        }
        if (!user_name) {
            throw new Error('Please set user_name at User Domain')
        }
        if (!email) {
            throw new Error('Please set email at User Domain')
        }

        this.id = id;
        this.pair_id = pair_id;
        this.team_id = team_id;
        this.status = status;
        this.user_name = user_name;
        this.email = email;
    }

    public getAllProperties() {
        return {
            id: this.id.get(),
            pair_id: this.pair_id.get(),
            team_id: this.team_id.get(),
            status: this.status.get(),
            user_name: this.user_name.get(),
            email: this.email.get(),
        };
    }

    public getId() {
        return this.id.get()
    }

    public getPairId() {
        return this.pair_id.get()
    }

    public getTeamId() {
        return this.pair_id.get()
    }

    public getStatus() {
        return this.status.get()
    }

    public getUserName() {
        return this.user_name.get()
    }

    public getEmail() {
        return this.email.get()
    }

    public changePairId(pair_id: PairId) {
        if (!pair_id) {
            throw new Error('changePairId is empty');
        }
        this.pair_id = pair_id;
    }

    public changeTeamId(team_id: TeamId) {
        if (!team_id) {
            throw new Error('changeTeamId is empty');
        }
        this.team_id = team_id;
    }

    public changeStatus(status: UserStatus) {
        if (!status) {
            throw new Error('chnageStatus is empty');
        }
        this.status = status;
    }
}
