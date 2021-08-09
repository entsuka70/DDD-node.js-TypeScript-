import UserIssue, { UserIssueProps } from "domain/model/userissue/UserIssue";
import UserIssueFactoryInterface from "domain/factory/UserIssueFactoryInterface";
import UserIssueUpdateCommand from "app/application/userIssue/UserIssueUpdateCommand";
import UserIssueId from "domain/model/userissue/UserIssueId";
import UserId from "domain/model/user/UserId";
import IssueId from "domain/model/issue/IssueId";
import UserIssueProgress from "domain/model/userissue/UserIssueProgress";

export default class UserIssueFactory implements UserIssueFactoryInterface {
    // TODO: User集約の引数のままなのでIssue集約へ修正する
    public create(issue: object): any {
        return;
    }

    public update(command: UserIssueUpdateCommand, userIssue: UserIssue): UserIssue {
        const { id, user_id, issue_id, progress } = userIssue.getAllProperties();
        const props: UserIssueProps = {
            id: new UserIssueId(command.id),
            user_id: command.user_id ? new UserId(command.user_id) : new UserId(user_id),
            issue_id: command.issue_id ? new IssueId(command.issue_id) : new IssueId(issue_id),
            progress: command.progress ? new UserIssueProgress(command.progress) : new UserIssueProgress(progress)
        }

        return new UserIssue(props);
    }

}