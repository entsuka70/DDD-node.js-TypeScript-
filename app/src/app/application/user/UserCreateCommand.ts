type Props = {
    id: string
    pair_id: string
    team_id: string
    status: number
    user_name: string
    email: string
}

export default class UserCreateCommand {
    public id: string
    public pair_id: string
    public team_id: string
    public status: number
    public user_name: string
    public email: string

    constructor(props: Props) {
        const { id, pair_id, team_id, status, user_name, email } = props;
        this.id = id;
        this.pair_id = pair_id;
        this.team_id = team_id;
        this.status = status;
        this.user_name = user_name;
        this.email = email;
    }

    public getId() {
        return this.id;
    }

    public getPairId() {
        return this.pair_id;
    }

    public getTeamId() {
        return this.team_id;
    }

    public getStatus() {
        return this.status;
    }

    public getUserName() {
        return this.user_name;
    }

    public getEmail() {
        return this.email;
    }
}