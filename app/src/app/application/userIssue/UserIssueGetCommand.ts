import { RequestType } from '../../../../@types';

export default class UserIssueGetCommand {
  public id: string;
  public issue_id: string;
  public issue_no: string;
  public issue_name: string;
  public issue_group: string;
  public user_id: string;
  public user_name: string;
  public status: string;
  public progress: string;
  public list: string;
  public list_no: string;

  constructor(req: RequestType.GetUserIssue) {
    this.id = req.params.id;
    this.issue_id = req.query.issue_id;
    this.issue_no = req.query.issue_no;
    this.issue_name = req.query.issue_name;
    this.issue_group = req.query.issue_group;
    this.user_id = req.query.user_id;
    this.user_name = req.query.user_name;
    this.status = req.query.status;
    this.progress = req.query.progress;
    this.list = req.query.list;
    this.list_no = req.query.list_no;
  }
}
