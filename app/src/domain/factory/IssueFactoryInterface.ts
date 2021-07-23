import Issue from "domain/model/issue"

export default interface IssueFactoryInterface {
    create(issue: object): Promise<any>;
    updateIssue(issue: Issue): Promise<any>;
}