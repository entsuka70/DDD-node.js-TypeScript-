export default class TeamName {
    private teamName: string;

    static TEAMNAME_MATCHER = /^[0-9]{1,3}$/;

    constructor(teamName: string) {
        if (teamName && !TeamName.TEAMNAME_MATCHER.test(teamName)) {
            throw new Error('Do not match TeamName FORMAT')
        }
        this.teamName = teamName
    }

    public get(): string {
        return this.teamName
    }

}