
export default class Team {
    private id: number | undefined;
    private team_name: string;

    static DEFAULT_NO_TEAM_ID = 1;
    static TEAM_NAME_NO_BELONG = '001';

    constructor(props: { id: number | undefined, team_name: string }) {
        const { id, team_name } = props;

        this.id = id;
        this.team_name = team_name;
    }

    public getAllProperties() {
        return {
            id: this.id,
            team_name: this.team_name
        };
    }
}