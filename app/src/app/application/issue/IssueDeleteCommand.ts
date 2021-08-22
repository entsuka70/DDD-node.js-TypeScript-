import { RequestType } from '../../../../@types';

export default class IssueDeleteCommand {
  public id: string;

  constructor(req: RequestType.DeleteIssue) {
    this.id = req.params.id;
  }
}
