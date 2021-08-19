export default class TeamName {
  private teamName: number;

  static TEAMNAME_MATCHER = /^[0-9]{1,3}$/;

  constructor(teamName: number) {
    if (teamName && !TeamName.TEAMNAME_MATCHER.test(String(teamName))) {
      throw new Error('Do not match TeamName FORMAT');
    }
    this.teamName = teamName;
  }

  public get(): number {
    return this.teamName;
  }
}
