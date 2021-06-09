import User from 'domain/entity/users/user/index';

export default class Pair {
    private id: number;
    private teams_id: number;
    private pair_name: string;
    private users: User[];

    constructor(props: {id: number, teams_id: number, pair_name: string, users: User[]}) {
        const {id, teams_id, pair_name, users} = props;
        this.id = id;
        this.teams_id = teams_id;
        this.pair_name = pair_name;
        this.users = users; // ここのUser[]はPairとUser関係の整合性を保つためと考える 例)あるペアを削除した際にUserのPairIdを更新するとか
    }
}