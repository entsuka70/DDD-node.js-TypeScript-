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

    static DEFAULT_PAIR_ID = 1;
    static DEFAULT_BELONG_ID = 1;

    constructor(props: {
        id: number | undefined, pair_id: number, belong_id: number, user_name: string, email: string,
        belong: BelongsValueObject,
        pair: Pair
    }) {
        const { id, pair_id, belong_id, user_name, email, belong, pair } = props;

        this.id = id;
        this.pair_id = pair_id;
        this.belong_id = belong_id;
        this.user_name = user_name;
        this.email = email;
        this.belong = belong;
        this.pair = pair;
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
