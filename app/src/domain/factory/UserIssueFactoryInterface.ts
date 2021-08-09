import UserIssue from "domain/model/userissue/UserIssue"
import UserIssueCommand from "app/application/userIssue/UserIssueCreateCommand"
import UserIssueUpdateCommand from "app/application/userIssue/UserIssueUpdateCommand"

export default interface UserIssueFactoryInterface {
    create(UserIssueCommand: UserIssueCommand): Promise<UserIssue>;
    update(command: UserIssueUpdateCommand, userIssue: UserIssue): UserIssue;
}