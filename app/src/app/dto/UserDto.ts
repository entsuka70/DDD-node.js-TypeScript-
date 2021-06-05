import User from "domain/entity/users/user"

export default class UserDto {
    public readonly id: number;
    public readonly name: string;
    public readonly email: string;
    public readonly belongs: number;
    
    constructor(user: any) {
        this.id = user.id;
        this.name = user.user_name;
        this.email = user.email
        this.belongs = user.belong.belong;
    }

    public getUserAll(user: User[]) {
        return [user];
    }
}