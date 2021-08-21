import UserRepositoryInterface from 'domain/model/user/UserRepositoryInterface';
import UserFactory from 'domain/factory/UserFactory';
import UserDomainService from 'domain/domainservice/UserDomainService';
import PairRepositoryInterface from 'domain/model/pair/PairRepositoryInterface';
import PairDomainService from 'domain/domainservice/PairDomainService';
import UserCreateCommand from './UserCreateCommand';
import UserDto from './UserDto';
import UserStatus from 'domain/model/user/UserStatus';

export default class UserApplication {
  private readonly userRepository: UserRepositoryInterface;
  private readonly userDomainService: UserDomainService;
  private readonly userFactory: UserFactory;
  private readonly pairRepository: PairRepositoryInterface;
  private readonly pairDomainService: PairDomainService;

  constructor(
    userRepository: UserRepositoryInterface,
    pairRepository: PairRepositoryInterface
  ) {
    this.userRepository = userRepository;
    this.pairRepository = pairRepository;
    // コンストラクタで渡すとコントローラー層で呼び出すことが必要になるので、ここでドメインサービス初期化
    this.userDomainService = new UserDomainService(userRepository);
    this.userFactory = new UserFactory();
    this.pairDomainService = new PairDomainService(
      pairRepository,
      userRepository
    );
  }

  public async findAll() {
    const userAggregations = await this.userRepository.findAll();
    const userDtos = userAggregations.map(
      (userAggregation) => new UserDto(userAggregation)
    );
    return userDtos;
  }

  public async create(command: UserCreateCommand) {
    // メールアドレス重複チェック
    if (await this.userDomainService.isExist(command.email, 'email')) {
      throw new ReferenceError(
        `Email is already exist. You can not register ${command.email}`
      );
    }
    const user = this.userFactory.create(command);
    await this.userRepository.save(user);
    return;
  }

  public async update(command: UserCreateCommand) {
    const user = await this.userRepository.find(command.id);
    // メールアドレス重複チェック
    if (
      command.email &&
      (await this.userDomainService.isExist(command.email, 'email'))
    ) {
      throw new ReferenceError(
        `Email is already exist. You can not register ${command.email}`
      );
    }
    // 移動先ペア存在チェック
    if (
      command.pair_id &&
      !(await this.userDomainService.isExist(command.pair_id, 'pair_id'))
    ) {
      throw new ReferenceError(
        `PairId does not exist. You can not register ${command.pair_id}`
      );
    }
    // 移動先チーム存在チェック
    if (
      command.team_id &&
      !(await this.userDomainService.isExist(command.team_id, 'team_id'))
    ) {
      throw new ReferenceError(
        `TeamId does not exist. You can not register ${command.team_id}`
      );
    }

    // Factoryで更新する集約を再構築
    let userRebuild = this.userFactory.update(command, user);
    // 在籍以外の状態であれば自動でペア・チーム無所属
    if (userRebuild.getStatus() !== UserStatus.STATUS_BELONG) {
      userRebuild = await this.userDomainService.setPairAndTeam(userRebuild);
      console.log('Automaticaly set pairId and teamId');
    }
    // ペアの自動編成
    // 4人:2つに分割,1名自動移動(未実装)
    // const userDatas = await this.pairDomainService.controlPairUser(userData);
    await this.userRepository.update(userRebuild);
  }

  public async delete(id: string) {
    await this.userRepository.delete(id);
  }
}
