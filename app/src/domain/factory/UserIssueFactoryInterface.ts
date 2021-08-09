import UserIssue from "domain/model/userissue/UserIssue"
import UserIssueCommand from "app/application/userIssue/UserIssueCreateCommand"

export default interface UserIssueFactoryInterface {
    create(UserIssueCommand: UserIssueCommand): Promise<UserIssue>;
    updateIssue(userIssue: UserIssue): Promise<void>;
}