import UserIssueId from './UserIssueId';
import UserId from 'src/domain/model/user/UserId';
import IssueId from 'src/domain/model/issue/IssueId';
import UserIssueProgress from './UserIssueProgress';

type Props = {
  id: UserIssueId;
  user_id: UserId;
  issue_id: IssueId;
  progress: UserIssueProgress;
};

export type UserIssueProps = Required<Props>;

export default class UserIssue {
  private id: UserIssueId;
  private user_id: UserId;
  private issue_id: IssueId;
  private progress: UserIssueProgress;

  constructor(props: UserIssueProps) {
    const { id, user_id, issue_id, progress } = props;
    this.id = id;
    this.user_id = user_id;
    this.issue_id = issue_id;
    this.progress = progress;
  }

  public getAllProperties() {
    return {
      id: this.id.get(),
      user_id: this.user_id.get(),
      issue_id: this.issue_id.get(),
      progress: this.progress.get(),
    };
  }

  public getId() {
    return this.id.get();
  }

  public getUserId() {
    return this.user_id.get();
  }

  public getIssueId() {
    return this.issue_id.get();
  }

  public getProgress() {
    return this.progress.get();
  }

  public changeProgress(progress: UserIssueProgress, requestUser: string) {
    if (!progress) {
      throw new Error('Not Found progress properties.');
    }
    if (requestUser !== this.user_id.get()) {
      throw new Error(
        'Can not change progress because issue owner is not correct.'
      );
    }
    this.progress = progress;
  }
}
