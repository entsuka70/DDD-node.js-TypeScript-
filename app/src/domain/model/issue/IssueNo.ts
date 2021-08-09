export default class IssueNo {
    private issueNo: number;

    static ISSUE_NO_MATCHER = /^[0-9]{1,3}$/;

    constructor(issueNo: number) {
        if (!issueNo || (issueNo && !IssueNo.ISSUE_NO_MATCHER.test(String(issueNo)))) {
            throw new Error('Do not match IssueNo FORMAT')
        }
        this.issueNo = issueNo
    }

    public get(): number {
        return this.issueNo
    }
}