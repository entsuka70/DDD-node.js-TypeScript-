import PairRepositoryInterface from '../../../domain/model/pair/PairRepositoryInterface';
import PairFactory from '../../../domain/factory/PairFactory';
import PairDomainService from '../../../domain/domainservice/PairDomainService';
import UserRepositoryInterface from '../../../domain/model/user/UserRepositoryInterface';
import PairDto from './PairDto';
import PairCreateCommand from './PairCreateCommand';
import Pair from '../../../domain/model/pair/Pair';
import UserId from '../../../domain/model/user/UserId';

export default class PairApplication {
  private readonly pairRepository: PairRepositoryInterface;
  private readonly pairDomainService: PairDomainService;
  private readonly pairFactory: PairFactory;
  private readonly userRepository: UserRepositoryInterface;

  constructor(
    pairRepository: PairRepositoryInterface,
    userRepository: UserRepositoryInterface
  ) {
    this.pairRepository = pairRepository;
    this.userRepository = userRepository;
    this.pairDomainService = new PairDomainService(
      pairRepository,
      userRepository
    );
    this.pairFactory = new PairFactory();
  }

  public async findPairAll() {
    const pairAggregations = await this.pairRepository.findAll();
    const pairDtos = pairAggregations.map(
      (pairAggregation) => new PairDto(pairAggregation)
    );
    return pairDtos;
  }

  public async update(command: PairCreateCommand) {
    // ※※※ TODO: ペアのチームID更新時に所属するユーザーのチームIDも変更 ※※※
    const pair = await this.pairRepository.find(command.id);
    // ユーザーid存在チェック
    if (
      command.user_ids &&
      !(await this.pairDomainService.isExist(command, 'user_ids'))
    ) {
      throw new Error(
        `UserId does not exist. You can not register ${command.user_ids.join()}`
      );
    }
    const pairRebuild = this.pairFactory.update(command, pair);

    // ※※※ ペアにユーザーが増えた時の自動制御および不整合制御 ※※※
    if (pairRebuild.getUserIds().length > Pair.MAX_PAIR_USER) {
      throw new Error(
        'You can not set the User to other pair because the maximum number of users is 4 in pair.'
      );
    }

    // ※※※ ペアにユーザーが増えた時の自動制御および不整合制御 ※※※
    if (pairRebuild.getUserIds().length == Pair.MAX_PAIR_USER) {
      // ※※※ プログラムからペア作成を行わず、ペアを事前に多量作成しておいてそこにあてがう仕様 ※※※
      // ユーザーが所属していないペアA,Bを2つ探す
      // ペアAにユーザー2名設定する。ペアBにユーザー2名を設定する。
      const shouldJoinPairs = await this.pairRepository.findFree();

      if (!shouldJoinPairs || shouldJoinPairs.length <= 2) {
        throw new Error(
          `The pair that user can join is too few. ${shouldJoinPairs.join()}`
        );
      }

      // ランダムに抽出したペアにユーザーをセット
      shouldJoinPairs[0].changeUserIds(
        pairRebuild.getUserIdsInstance().filter((ins, index: number) => index <= 1)
      );
      shouldJoinPairs[1].changeUserIds(
        pairRebuild.getUserIdsInstance().filter((ins, index: number) => index > 1)
      );
      await Promise.all(
        shouldJoinPairs.map(
          async (pair) => await this.pairRepository.update(pair)
        )
      );
      return;
    }

    // ※※※ ペア内ユーザーが減った時(ユーザー2名からユーザー1名)の自動制御および不整合制御 ※※※
    if (
      pairRebuild.getUserIds().length == Pair.MIN_PAIR_USER &&
      pair.getUserIds().length == Pair.MIN_ACCEPTABLE_PAIR_USER
    ) {
      const pairMinUser = await this.pairRepository.findMinUser(pairRebuild);
      const pairRebuilds = this.pairFactory.move(pairRebuild, pairMinUser);
      await Promise.all(
        pairRebuilds.map(async (pair) => {
          await this.pairRepository.update(pair);
        })
      );
      // 元々ペアにユーザーが2名所属しており、一人にするupdateリクエストで一人にする時に、片方が移動して残りの一名も移動処理
      const pairRebuildforException = this.pairFactory.update(command, pair); // 例外検出用にpairRebuildと同じオブジェクトを形成
      const excludeUserIds = pair
        .getUserIds()
        .filter((id: string) => id != pairRebuildforException.getUserIds()[0]); // 移動しなかった残留のペア内ユーザーidを取得
      pair.changeUserIds(excludeUserIds.map((id: string) => new UserId(id))); // 残留ユーザーを含むペアへセッター
      // 残留ユーザーが1名の時、不整合が発生するので再度最小構成ユーザー数のペアを探し出し移動する処理を実行
      if (pair.getUserIds().length == Pair.MIN_PAIR_USER) {
        const pairMinUserForLeft = await this.pairRepository.findMinUser(pair);
        const pairRebuildsForLeft = this.pairFactory.move(
          pair,
          pairMinUserForLeft
        );
        await Promise.all(
          pairRebuildsForLeft.map(async (pair) => {
            await this.pairRepository.update(pair);
          })
        );
      }
      return;
    }
    await this.pairRepository.update(pairRebuild);
  }
}
