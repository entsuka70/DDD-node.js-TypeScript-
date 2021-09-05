import UserId from 'src/domain/model/user/UserId';

type Props = {
  user_id: UserId;
};

export default class UserIssueDto {
  public readonly user_id: string;

  constructor(props: Props) {
    const { user_id } = props;
    this.user_id = user_id.get();
  }
}
