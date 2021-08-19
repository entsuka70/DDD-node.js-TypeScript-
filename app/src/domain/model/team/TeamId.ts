export default class TeamId {
  private teamId: string;

  static UUID_FORMAT = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
  static UUID_MATCHER =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
  static DEFAULT_TEAM_ID = '06b5ea23-5029-4906-89c4-979f833715c4';

  constructor(teamId?: string) {
    if (teamId && !TeamId.UUID_MATCHER.test(teamId)) {
      throw new Error('Do not match UUID FORMAT');
    }
    this.teamId = teamId ?? TeamId.DEFAULT_TEAM_ID;
  }

  public get(): string {
    return this.teamId;
  }

  public static generateUuid() {
    // https://github.com/GoogleChrome/chrome-platform-analytics/blob/master/src/internal/identifier.js
    // const FORMAT: string = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
    const chars = TeamId.UUID_FORMAT.split('');
    for (let i = 0, len = chars.length; i < len; i++) {
      switch (chars[i]) {
        case 'x':
          chars[i] = Math.floor(Math.random() * 16).toString(16);
          break;
        case 'y':
          chars[i] = (Math.floor(Math.random() * 4) + 8).toString(16);
          break;
      }
    }
    return chars.join('');
  }
}
