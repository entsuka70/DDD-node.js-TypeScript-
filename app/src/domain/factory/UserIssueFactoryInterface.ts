import UserIssue from "domain/model/userissue/UserIssue"
import UserIssueCommand from "app/application/userIssue/UserIssueCommand"

export default interface UserIssueFactoryInterface {
    create(UserIssueCommand: UserIssueCommand): Promise<UserIssue>;
    updateIssue(userIssue: UserIssue): Promise<void>;
}