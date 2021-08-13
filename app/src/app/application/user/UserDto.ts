import User from "domain/model/user/User"

// 現状は問題ないですが、将来的には1つのuseceseのメソッドに対して1つのdtoを用意したほうがいいみたいです。
export default class UserDto {
    public readonly id: string;
    public readonly pair_id: string;
    public readonly team_id: string;
    public readonly status: number;
    public readonly user_name: string;
    public readonly email: string;


    constructor(user: User) {
        this.id = user.getId();
        this.pair_id = user.getPairId();
        this.team_id = user.getTeamId();
        this.status = user.getStatus();
        this.user_name = user.getUserName();
        this.email = user.getEmail();
    }

    public getUserAll(user: User[]) {
        return [user];
    }
}