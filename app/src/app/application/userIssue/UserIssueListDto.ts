import UserId from 'domain/model/user/UserId';
import IssueId from 'domain/model/issue/IssueId';
import IssueName from 'domain/model/issue/IssueName';
import UserIssueProgress from 'domain/model/userissue/UserIssueProgress';
import IssueNo from 'domain/model/issue/IssueNo';
import IssueGroup from 'domain/model/issue/IssueGroup';
import UserName from 'domain/model/user/UserName';
import UserStatus from 'domain/model/user/UserStatus';

type Props = {
  user_id: UserId;
  user_name: UserName;
  status: UserStatus;
  issue_id: IssueId;
  issue_no: IssueNo;
  issue_name: IssueName;
  issue_group: IssueGroup;
  progress: UserIssueProgress;
};

export type UserIssueListProps = Required<Props>;

export default class UserIssueListDto {
  public readonly user_id: string;
  public readonly user_name: string;
  public readonly status: number;
  public readonly issue_id: string;
  public readonly issue_no: number;
  public readonly issue_name: string;
  public readonly issue_group: number;
  public readonly progress: number;

  constructor(props: UserIssueListProps) {
    const {
      user_id,
      user_name,
      status,
      issue_id,
      issue_no,
      issue_name,
      issue_group,
      progress,
    } = props;
    this.user_id = user_id.get();
    this.user_name = user_name.get();
    this.status = status.get();
    this.issue_id = issue_id.get();
    this.issue_no = issue_no.get();
    this.issue_name = issue_name.get();
    this.issue_group = issue_group.get();
    this.progress = progress.get();
  }
}
