import BelongsValueObject from 'domain/valueobject/belongs/index';
import Pair from 'domain/entity/users/pair'
import Team from 'domain/entity/users/team'

export default class User {
    // idはオートインクリメントによる生成にしているためUserを新規作成する時に
    // FactoryでUserインスタンスを呼び出す際にid指定ができない。
    // そのため、null許容指定にしている。
    private id: number | undefined;
    private pair_id: number;
    private belong_id: number;
    private user_name: string;
    private email: string;
    private belong: BelongsValueObject;
    private pair: Pair;
    // private team: Team;

    public DEFAULT_PAIR_ID = 1;
    public DEFAULT_BELONG_ID = 1;

    constructor(props: {
        id: number | undefined, pair_id: number | null, belong_id: number | null, user_name: string, email: string,
        belong: BelongsValueObject,
        // belong: { id: number, belong: number },
        // pair: { id: number, teams_id: number, pair_name: string, team: Team }
        // pair: {
        //     id: number, teams_id: number, pair_name: string,
        //     team: Team & {
        //         id: number, team_name: string
        //     }
        // }
        pair: Pair
    }) {
        const { id, pair_id, belong_id, user_name, email, belong, pair } = props;
        // const { team } = props.pair;
        // const { id, pair_id, user_name, email, belong_id, pair, team } = props;

        const belongInstance = new BelongsValueObject(belong_id);
        // const pairInstance = new Pair(pair);
        // const teamInstance = new Team(team);

        this.id = id;
        this.pair_id = pair_id ?? this.DEFAULT_PAIR_ID;
        this.belong_id = belong_id ? new BelongsValueObject(belong_id).getBelongs() : new BelongsValueObject().getBelongs();
        this.user_name = user_name;
        this.email = email;
        this.belong = belong;
        // this.belong = belongInstance;
        this.pair = pair;
        // this.pair = pairInstance;
        // this.pair.team = teamInstance;
        // this.team = teamInstance;
    }

    public getAllProperties() {
        return {
            id: this.id,
            pair_id: this.pair_id,
            user_name: this.user_name,
            email: this.email,
            belong_id: this.belong_id,
            belong: this.belong,
            pair: this.pair,
        };
    }

    public changeUserBelongs(belongs: number) {
        this.belong_id = new BelongsValueObject(belongs).getBelongs();
        return this;
    }
}
