import User from 'domain/entity/users/user/index';

export default class Pair {
    private id: number;
    private name: string;
    private users: User[];

    constructor(id: number, name: string, users: User[]) {
        this.id = id;
        this.name = name;
        this.users = users;
    }
}