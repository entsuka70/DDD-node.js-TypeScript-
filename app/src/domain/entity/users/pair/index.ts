import Team from 'domain/entity/users/team';

export default class Pair {
    // idはオートインクリメントによる生成にしているためUserを新規作成する時に
    // FactoryでUserインスタンスを呼び出す際にid指定ができない。
    // そのため、null許容指定にしている。
    private id: number | undefined;
    private teams_id: number;
    private pair_name: string;
    private team: Team;

    static DEFAULT_NO_PAIR_ID = 1;
    static DEFAULT_NO_TEAM_ID = 1;
    static PAIR_NAME_NO_BELONG = 'n';

    constructor(props: { id: number | undefined, teams_id: number, pair_name: string, team: Team }) {
        const { id, teams_id, pair_name, team } = props;

        this.id = id;
        this.teams_id = teams_id;
        this.pair_name = pair_name;
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