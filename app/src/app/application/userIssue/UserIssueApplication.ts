import UserIssueRepositoryInterface from 'src/domain/model/userissue/UserIssueRepositoryInterface';
import UserIssueFactory from 'src/domain/factory/UserIssueFactory';
import UserIssueGetCommand from './UserIssueGetCommand';
import UserIssueUpdateCommand from './UserIssueUpdateCommand';
import UserIssueQueryServiceInterface from './UserIssueQueryServiceInterface';
import UserIssueProgress from 'src/domain/model/userissue/UserIssueProgress';
import UserIssueDomainService from 'src/domain/domainservice/UserIssueDomainService';

export default class UserIssueApplication {
  private readonly userIssueRepository: UserIssueRepositoryInterface;
  private readonly userIssueFactory: UserIssueFactory;
  private readonly userIssueQueryService: UserIssueQueryServiceInterface;
  private readonly userIssueDomainService: UserIssueDomainService;

  constructor(
    userIssueRepository: UserIssueRepositoryInterface,
    userIssueQueryService: UserIssueQueryServiceInterface
  ) {
    this.userIssueRepository = userIssueRepository;
    this.userIssueFactory = new UserIssueFactory();
    this.userIssueQueryService = userIssueQueryService;
    this.userIssueDomainService = new UserIssueDomainService(
      userIssueRepository
    );
  }

  public async findAll(command: UserIssueGetCommand) {
    const userIssues = await this.userIssueQueryService.find(command);
    return userIssues;
  }

  public async findUsers(command: UserIssueGetCommand) {
    const users = await this.userIssueQueryService.findUsers(command);
    return users;
  }

  public async update(command: UserIssueUpdateCommand) {
    const userIssue = await this.userIssueRepository.find(command.id);
    if (this.userIssueDomainService.isComplete(userIssue, command)) {
      throw new Error(
        'Can not change progress because the progress has already completed.'
      );
    }
    userIssue.changeProgress(
      new UserIssueProgress(command.progress),
      command.user_id
    );
    await this.userIssueRepository.update(userIssue);
  }

  public async delete(command: UserIssueUpdateCommand) {
    await this.userIssueRepository.delete(command.id);
  }
}
