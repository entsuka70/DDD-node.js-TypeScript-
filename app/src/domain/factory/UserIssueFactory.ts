import UserIssue, {
  UserIssueProps,
} from 'src/domain/model/userissue/UserIssue';
import UserIssueUpdateCommand from 'src/app/application/userIssue/UserIssueUpdateCommand';
import UserIssueId from 'src/domain/model/userissue/UserIssueId';
import User from 'src/domain/model/user/User';
import UserId from 'src/domain/model/user/UserId';
import IssueId from 'src/domain/model/issue/IssueId';
import UserIssueProgress from 'src/domain/model/userissue/UserIssueProgress';

export default class UserIssueFactory {
  public update(
    command: UserIssueUpdateCommand,
    userIssue: UserIssue
  ): UserIssue {
    const { user_id, issue_id, progress } = userIssue.getAllProperties();
    const props: UserIssueProps = {
      id: new UserIssueId(command.id),
      user_id: command.user_id
        ? new UserId(command.user_id)
        : new UserId(user_id),
      issue_id: command.issue_id
        ? new IssueId(command.issue_id)
        : new IssueId(issue_id),
      progress: command.progress
        ? new UserIssueProgress(command.progress)
        : new UserIssueProgress(progress),
    };

    return new UserIssue(props);
  }

  public createMany(issue_id: string, users: User[]): UserIssue[] {
    const userIssues = users.map((user) => {
      const props = {
        id: new UserIssueId(),
        user_id: new UserId(user.getId()),
        issue_id: new IssueId(issue_id),
        progress: new UserIssueProgress(),
      };
      return new UserIssue(props);
    });
    return userIssues;
  }
}
