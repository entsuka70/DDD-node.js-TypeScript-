import User from 'domain/model/user/User';
import UserId from 'domain/model/user/UserId';
import UserName from 'domain/model/user/UserName';
import UserEmail from 'domain/model/user/UserEmail';
import UserStatus from 'domain/model/user/UserStatus';
import PairId from 'domain/model/pair/PairId';
import TeamId from 'domain/model/team/TeamId';
import UserCreateCommand from 'app/application/user/UserCreateCommand';

export default class UserFactory {
  public async create(command: UserCreateCommand): Promise<User> {
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

  public async update(command: UserCreateCommand, user: User): Promise<User> {
    const { id, pair_id, team_id, status, user_name, email } =
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
