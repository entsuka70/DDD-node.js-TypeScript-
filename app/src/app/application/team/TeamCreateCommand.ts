import { RequestType } from '../../../../@types';

export default class TeamCreateCommand {
  public id: string;
  public team_name: number;
  public pair_ids: string[];
  public user_ids: string[];

  constructor(req: RequestType.Team) {
    this.id = req.params.id;
    this.team_name = req.body.team_name;
    this.pair_ids = req.body.pair_ids;
    this.user_ids = req.body.user_ids;
  }
}
