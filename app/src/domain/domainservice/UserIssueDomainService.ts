import UserIssueUpdateCommand from 'src/app/application/userIssue/UserIssueUpdateCommand';
import UserIssue from 'src/domain/model/userissue/UserIssue';
import UserIssueProgress from 'src/domain/model/userissue/UserIssueProgress';
import UserIssueRepositoryInterface from 'src/domain/model/userissue/UserIssueRepositoryInterface';

export default class UserIssueDomainService {
  private readonly userIssueRepository: UserIssueRepositoryInterface;

  constructor(userIssueRepository: UserIssueRepositoryInterface) {
    this.userIssueRepository = userIssueRepository;
  }

  public isComplete(
    userIssue: UserIssue,
    command: UserIssueUpdateCommand
  ): boolean {
    const progress = userIssue.getProgress();
    const requestProgress = command.progress;
    if (
      progress == UserIssueProgress.PROGRESS_COMPLETE &&
      requestProgress < UserIssueProgress.PROGRESS_COMPLETE
    ) {
      return true;
    }
    return false;
  }
}
