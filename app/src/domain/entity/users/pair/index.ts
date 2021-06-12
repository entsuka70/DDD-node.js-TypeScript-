import User from 'domain/entity/users/user/index';

export default class Pair {
    // idはオートインクリメントによる生成にしているためUserを新規作成する時に
    // FactoryでUserインスタンスを呼び出す際にid指定ができない。
    // そのため、null許容指定にしている。
    private id: number | null;
    private teams_id: number;
    private pair_name: string;
    private users: User[] | null;

    constructor(props: { id: number | null, teams_id: number, pair_name: string, users: User[] | null }) {
        const { id, teams_id, pair_name, users } = props;
        this.id = id;
        this.teams_id = teams_id;
        this.pair_name = pair_name;
        this.users = users; // ここのUser[]はPairとUser関係の整合性を保つためと考える 例)あるペアを削除した際にUserのPairIdを更新するとか
    }
}