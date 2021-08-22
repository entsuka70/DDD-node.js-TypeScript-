export default class UserStatus {
  private userStatus: number;

  static STATUS_BELONG = 1; // 在籍中
  static STATUS_BREAKING = 2; // 休会中
  static STATUS_WITHDRAWAL = 3; // 退会済み

  static USERSTATUS_MATCHER = /^[1-9]$/;

  constructor(userStatus?: number) {
    if (
      userStatus == 0 ||
      (userStatus && !UserStatus.USERSTATUS_MATCHER.test(String(userStatus)))
    ) {
      throw new Error('Do not match UserStatus FORMAT');
    }
    this.userStatus = userStatus ?? UserStatus.STATUS_BELONG;
  }

  public get(): number {
    return this.userStatus;
  }
}
