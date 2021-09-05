import Team, { TeamProps } from 'src/domain/model/team/Team';
import TeamId from 'src/domain/model/team/TeamId';
import TeamName from 'src/domain/model/team/TeamName';
import PairId from 'src/domain/model/pair/PairId';
import UserId from 'src/domain/model/user/UserId';
import User from 'src/domain/model/user/User';
import Pair from 'src/domain/model/pair/Pair';
import TeamCreateCommand from 'src/app/application/team/TeamCreateCommand';
import TeamRepositoryInterface from 'src/domain/model/team/TeamRepositoryInterface';
import PairRepositoryInterface from 'src/domain/model/pair/PairRepositoryInterface';
import UserRepositoryInterface from 'src/domain/model/user/UserRepositoryInterface';

export default class TeamFactory {
  private readonly teamRepository: TeamRepositoryInterface;
  private readonly pairRepository: PairRepositoryInterface;
  private readonly userRepository: UserRepositoryInterface;

  constructor(
    teamRepository: TeamRepositoryInterface,
    pairRepository: PairRepositoryInterface,
    userRepository: UserRepositoryInterface
  ) {
    this.teamRepository = teamRepository;
    this.pairRepository = pairRepository;
    this.userRepository = userRepository;
  }

  public async update(command: TeamCreateCommand, team: Team): Promise<Team> {
    const { team_name, pair_ids, user_ids } = team.getAllProperties();

    // ペアIDの記載があれば紐付くユーザーを取得
    const users_ids: string[] = [];
    if (command.pair_ids && command.pair_ids.length) {
      const users: User[] = await this.userRepository.findByPairIds(
        command.pair_ids
      );
      if (users.length) {
        users.map((user) => users_ids.push(user.getId()));
      }
    }

    // ユーザーIDの記載があれば紐付くペアを取得
    const pairs_ids: string[] = [];
    if (command.user_ids && command.user_ids.length) {
      const pairs: Pair[] = await this.pairRepository.findByUserIds(
        command.user_ids
      );
      if (pairs.length) {
        pairs.map((pair) => pairs_ids.push(pair.getId()));
      }
    }

    const props: TeamProps = {
      id: new TeamId(command.id),
      team_name: command.team_name
        ? new TeamName(command.team_name)
        : team_name,
      pair_ids: pairs_ids.length
        ? pairs_ids.map((pairs_id) => new PairId(pairs_id))
        : command.pair_ids
        ? command.pair_ids.map((pair_id) => new PairId(pair_id))
        : pair_ids,
      user_ids: users_ids.length
        ? users_ids.map((users_id) => new UserId(users_id))
        : command.user_ids
        ? command.user_ids.map((user_id) => new UserId(user_id))
        : user_ids,
    };

    return new Team(props);
  }
}
