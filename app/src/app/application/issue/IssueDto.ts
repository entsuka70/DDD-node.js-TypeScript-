import Issue from 'domain/model/issue/Issue';

export default class IssueDto {
  public readonly id: string;
  public readonly issue_no: number;
  public readonly issue_name: string;
  public readonly issue_group: number;

  constructor(issue: Issue) {
    this.id = issue.getId();
    this.issue_no = issue.getIssueNo();
    this.issue_name = issue.getIssueName();
    this.issue_group = issue.getIssueGroup();
  }
}
