import Issue from 'domain/model/issue/Issue';
import IssueCreateCommand from 'app/application/issue/IssueCreateCommand';
import IssueId from 'domain/model/issue/IssueId';
import IssueNo from 'domain/model/issue/IssueNo';
import IssueName from 'domain/model/issue/IssueName';
import IssueGroup from 'domain/model/issue/IssueGroup';

export default class IssueFactory {
  public create(command: IssueCreateCommand): Issue {
    const props = {
      id: new IssueId(),
      issue_no: new IssueNo(command.issue_no),
      issue_name: new IssueName(command.issue_name),
      issue_group: new IssueGroup(command.issue_group),
    };

    return new Issue(props);
  }
}
