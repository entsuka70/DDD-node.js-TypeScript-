import Team from 'domain/entity/users/team';

export default class Pair {
    // idはオートインクリメントによる生成にしているためUserを新規作成する時に
    // FactoryでUserインスタンスを呼び出す際にid指定ができない。
    // そのため、null許容指定にしている。
    private id: number | undefined;
    private teams_id: number;
    private pair_name: string;
    private team: Team;

    public DEFAULT_PAIR_ID = 1;
    public DEFAULT_TEAM_ID = 1;
    public PAIR_NAME_NO_BELONG = 'n';

    constructor(props: { id: number | undefined, teams_id: number | null, pair_name: string | null, team: Team }) {
        const { id, teams_id, pair_name, team } = props;
        this.id = id ?? this.DEFAULT_PAIR_ID;
        this.teams_id = teams_id ?? this.DEFAULT_TEAM_ID;
        this.pair_name = pair_name ?? this.PAIR_NAME_NO_BELONG;
        this.team = team; // ここのteamはPairとTeam関係の整合性を保つためと考える 例)あるペアを削除した際にUserのPairIdを更新するとか
    }
    public getAllProperties() {
        return {
            id: this.id,
            teams_id: this.teams_id,
            pair_name: this.pair_name,
            team: this.team,
        };
    }
}