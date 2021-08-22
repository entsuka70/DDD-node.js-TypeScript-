export default class UserIssueProgress {
  private userIssueProgress: number;

  static PROGRESS_NONE = 1; // 未着手
  static PROGRESS_WAIT_REVIEW = 2; // レビュー待ち
  static PROGRESS_COMPLETE = 3; // 完了

  static USER_ISSUE_PROGRESS_MATCHER = /^[1-3]$/;

  constructor(userIssueProgress?: number) {
    if (
      userIssueProgress &&
      !UserIssueProgress.USER_ISSUE_PROGRESS_MATCHER.test(
        String(userIssueProgress)
      )
    ) {
      throw new Error('Do not match UserIssueProgress FORMAT');
    }
    this.userIssueProgress =
      userIssueProgress ?? UserIssueProgress.PROGRESS_NONE;
  }

  public get(): number {
    return this.userIssueProgress;
  }
}
