
export default interface UserFactoryInterface {
    createIssueAll(issues: object[]): Promise<object[]>;
    createIssue(issue: object): Promise<object>;
    updateIssue(issue: object): Promise<object>;
}