import IssueCreateCommand from "app/application/issue/IssueCreateCommand";
import Issue from "domain/model/issue/Issue"

export default interface IssueFactoryInterface {
    create(command: IssueCreateCommand): Issue;
}