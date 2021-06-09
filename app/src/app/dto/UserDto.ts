import User from "domain/entity/users/user"

export default class UserDto {
    public readonly id: number;
    public readonly pair_id: number;
    public readonly user_name: string;
    public readonly email: string;
    public readonly belongs: number;
    
    constructor(user: any) {
        this.id = user.id;
        this.pair_id = user.pair_id;
        this.user_name = user.user_name;
        this.email = user.email
        this.belongs = user.belong.belong;
    }

    public getUserAll(user: User[]) {
        return [user];
    }
}