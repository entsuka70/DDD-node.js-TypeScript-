import UserId from './UserId';
import UserName from './UserName';
import UserEmail from './UserEmail';
import UserStatus from './UserStatus';
import PairId from '../pair/PairId';
import TeamId from '../team/TeamId';

type Props = {
  id: UserId;
  pair_id: PairId;
  team_id: TeamId;
  status: UserStatus;
  user_name: UserName;
  email: UserEmail;
};

export type UserProps = Required<Props>;

export default class User {
  private id: UserId;
  private pair_id: PairId;
  private team_id: TeamId;
  private status: UserStatus;
  private user_name: UserName;
  private email: UserEmail;

  constructor(props: UserProps) {
    const { id, pair_id, team_id, status, user_name, email } = props;

    this.id = id;
    this.pair_id = pair_id;
    this.team_id = team_id;
    this.status = status;
    this.user_name = user_name;
    this.email = email;
  }

  public getAllProperties() {
    return {
      id: this.id.get(),
      pair_id: this.pair_id.get(),
      team_id: this.team_id.get(),
      status: this.status.get(),
      user_name: this.user_name.get(),
      email: this.email.get(),
    };
  }

  public getId() {
    return this.id.get();
  }

  public getPairId() {
    return this.pair_id.get();
  }

  public getTeamId() {
    return this.team_id.get();
  }

  public getStatus() {
    return this.status.get();
  }

  public getUserName() {
    return this.user_name.get();
  }

  public getEmail() {
    return this.email.get();
  }

  // この辺りメソッドは元のPairIdインスタンスなどで例外処理を行っているので
  // 例外が入ることは無いと判断して、例外処理を含めない
  public changePairId(pair_id: PairId) {
    this.pair_id = pair_id;
  }

  public changeTeamId(team_id: TeamId) {
    this.team_id = team_id;
  }

  public changeStatus(status: UserStatus) {
    this.status = status;
  }
}
