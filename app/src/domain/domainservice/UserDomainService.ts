import User from 'domain/model/user/User';
import PairId from 'domain/model/pair/PairId';
import TeamId from 'domain/model/team/TeamId';
import UserRepositoryInterface from 'domain/model/user/UserRepositoryInterface';

export default class UserDomainService {
  private readonly userRepository: UserRepositoryInterface;

  constructor(userRepository: UserRepositoryInterface) {
    this.userRepository = userRepository;
  }

  // 既に永続下層に存在する対象User確認
  public async isExist(target: string, type: string): Promise<boolean> {
    if (!target) {
      return false;
    }
    const users = await this.userRepository.findAll();
    const isExistUser = users.filter((user) => {
      switch (type) {
        case 'email':
          return user.getEmail() === target;
        case 'pair_id':
          return user.getPairId() === target;
        case 'team_id':
          return user.getTeamId() === target;
        default:
      }
    });
    if (isExistUser.length) {
      return true;
    }
    return false;
  }

  // 在籍以外の状態であれば自動でペア・チーム無所属
  public setPairAndTeam(user: User): User {
    user.changePairId(new PairId(PairId.DEFAULT_PAIR_ID));
    user.changeTeamId(new TeamId(TeamId.DEFAULT_TEAM_ID));
    return user;
  }
}
