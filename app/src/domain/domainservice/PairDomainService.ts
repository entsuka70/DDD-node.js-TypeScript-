import PairRepositoryInterface from 'domain/model/pair/PairRepositoryInterface';
import UserRepositoryInterface from 'domain/model/user/UserRepositoryInterface';
import PairCreateCommand from 'app/application/pair/PairCreateCommand';

export default class PairDomainService {
  private readonly pairRepository: PairRepositoryInterface;
  private readonly userRepository: UserRepositoryInterface;

  constructor(
    pairRepository: PairRepositoryInterface,
    userRepository: UserRepositoryInterface
  ) {
    this.pairRepository = pairRepository;
    this.userRepository = userRepository;
  }

  // 既に永続下層に存在する対象確認
  public async isExist(
    target: PairCreateCommand,
    type: string
  ): Promise<boolean> {
    if (!target) {
      return false;
    }
    if (target.pair_name || target.team_id) {
      const pairs = await this.pairRepository.findAll();
      const isExistPair = pairs.filter((pair) => {
        switch (type) {
          case 'pair_name':
            return pair.getPairName() === target.pair_name;
          case 'team_id':
            return pair.getTeamId() === target.team_id;
          default:
        }
      });
      if (isExistPair.length) {
        return true;
      }
    }
    if (target.user_ids) {
      const users = await this.userRepository.findAll();
      const isExistUser = users.filter((user) => {
        for (let i = 0; i < target.user_ids.length; i++) {
          if (user.getId() === target.user_ids[i]) {
            return user.getId();
          }
        }
      });
      if (isExistUser.length && isExistUser.length == target.user_ids.length) {
        return true;
      }
    }
    return false;
  }
}
