import UserIssue from "domain/model/userissue/UserIssue"
import UserIssueCreateCommand from "app/application/userIssue/UserIssueCreateCommand"
import UserIssueUpdateCommand from "app/application/userIssue/UserIssueUpdateCommand"
import User from "domain/model/user/User"

export default interface UserIssueFactoryInterface {
    update(command: UserIssueUpdateCommand, userIssue: UserIssue): UserIssue;
    createMany(issue_id: string, users: User[]): UserIssue[];
}