export default class IssueGroup {
    private issueGroup: number;

    static NO_ISSUE_GROUP = 1; // 未分類
    static GROUP_WEB_BASE = 2; // WEBの基礎
    static GROUP_WEB_TEST = 3; // テスト
    static GROUP_WEB_DB = 4; // DB
    static GROUP_WEB_ARCHITECT = 5 // 設計

    static ISSUE_GROUP_MATCHER = /^[1-9]{1,2}$/;

    constructor(issueGroup?: number) {
        if (issueGroup == 0 || (issueGroup && !IssueGroup.ISSUE_GROUP_MATCHER.test(String(issueGroup)))) {
            throw new Error('Do not match IssueGroup FORMAT')
        }
        this.issueGroup = issueGroup ?? IssueGroup.NO_ISSUE_GROUP;
    }

    public get(): number {
        return this.issueGroup
    }

}