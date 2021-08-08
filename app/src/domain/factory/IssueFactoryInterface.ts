import Issue from "domain/model/issue/Issue"

export default interface IssueFactoryInterface {
    create(issue: object): Promise<any>;
    updateIssue(issue: Issue): Promise<any>;
}