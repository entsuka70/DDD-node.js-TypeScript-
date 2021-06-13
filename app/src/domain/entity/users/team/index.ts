
export default class Team {
    private id: number | undefined;
    private team_name: string;

    public DEFAULT_TEAM_ID = 1;
    public TEAM_NAME_NO_BELONG = '001';

    constructor(props: { id: number | undefined, team_name: string | null }) {
        const { id, team_name } = props;
        this.id = id ?? this.DEFAULT_TEAM_ID;
        this.team_name = team_name ?? this.TEAM_NAME_NO_BELONG;
    }

    public getAllProperties() {
        return {
            id: this.id,
            team_name: this.team_name
        };
    }
}