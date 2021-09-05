import Pair from 'src/domain/model/pair/Pair';

export default class PairDto {
  public readonly id: string;
  public readonly team_id: string;
  public readonly pair_name: string;
  public readonly user_ids: string[];

  constructor(pair: Pair) {
    this.id = pair.getId();
    this.team_id = pair.getTeamId();
    this.pair_name = pair.getPairName();
    this.user_ids = pair.getUserIds();
  }
}
