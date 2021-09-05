import User from 'src/domain/model/user/User';
import UserId from 'src/domain/model/user/UserId';
import UserName from 'src/domain/model/user/UserName';
import UserEmail from 'src/domain/model/user/UserEmail';
import UserStatus from 'src/domain/model/user/UserStatus';
import PairId from 'src/domain/model/pair/PairId';
import TeamId from 'src/domain/model/team/TeamId';
import UserCreateCommand from 'src/app/application/user/UserCreateCommand';
import UserUpdateCommand from 'src/app/application/user/UserUpdateCommand';

export default class UserFactory {
  public create(command: UserCreateCommand): User {
    const props = {
      id: new UserId(),
      pair_id: new PairId(command.pair_id),
      team_id: new TeamId(command.team_id),
      status: new UserStatus(command.status),
      user_name: new UserName(command.user_name),
      email: new UserEmail(command.email),
    };
    return new User(props);
  }

  public update(command: UserUpdateCommand, user: User): User {
    const { pair_id, team_id, status, user_name, email } =
      user.getAllProperties();
    const props = {
      id: new UserId(command.id),
      pair_id: command.pair_id
        ? new PairId(command.pair_id)
        : new PairId(pair_id),
      team_id: command.team_id
        ? new TeamId(command.team_id)
        : new TeamId(team_id),
      status: command.status
        ? new UserStatus(command.status)
        : new UserStatus(status),
      user_name: command.user_name
        ? new UserName(command.user_name)
        : new UserName(user_name),
      email: command.email
        ? new UserEmail(command.email)
        : new UserEmail(email),
    };
    return new User(props);
  }
}
