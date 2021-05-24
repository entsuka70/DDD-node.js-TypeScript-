import Pair from 'domain/entity/users/pair/index';

export default class Team {
    private id: number;
    private name: string;
    private pairs: Pair[];

    constructor(id: number, name: string, pairs: Pair[]) {
        this.id = id;
        this.name = name;
        this.pairs = pairs;
    }
}