import UserIssueRepositoryInterface from 'domain/model/userissue/UserIssueRepositoryInterface';
import UserIssueFactory from 'domain/factory/UserIssueFactory';
import UserIssueGetCommand from './UserIssueGetCommand';
import UserIssueCreateCommand from './UserIssueCreateCommand';
import UserIssueUpdateCommand from './UserIssueUpdateCommand';
import UserIssueQueryServiceInterface from './UserIssueQueryServiceInterface';
import UserIssueProgress from 'domain/model/userissue/UserIssueProgress';
import UserIssueDomainService from 'domain/domainservice/UserIssueDomainService';

export default class UserIssueApplication {
    private readonly userIssueRepository: UserIssueRepositoryInterface;
    private readonly userIssueFactory: UserIssueFactory;
    private readonly userIssueQueryService: UserIssueQueryServiceInterface;
    private readonly userIssueDomainService: UserIssueDomainService;

    constructor(userIssueRepository: UserIssueRepositoryInterface, userIssueQueryService: UserIssueQueryServiceInterface) {
        this.userIssueRepository = userIssueRepository;
        this.userIssueFactory = new UserIssueFactory();
        this.userIssueQueryService = userIssueQueryService;
        this.userIssueDomainService = new UserIssueDomainService(userIssueRepository);
    }

    public async findAll(command: UserIssueGetCommand) {
        try {
            const userIssues = await this.userIssueQueryService.find(command);
            return userIssues;
        } catch (e) {
            throw new Error(e.message);
        }
    }

    public async findUsers(command: UserIssueGetCommand) {
        try {
            const users = await this.userIssueQueryService.findUsers(command);
            return users;
        } catch (e) {
            throw new Error(e.message);
        }
    }

    public async update(command: UserIssueUpdateCommand) {
        try {
            const userIssue = await this.userIssueRepository.find(command.id);
            if (this.userIssueDomainService.isComplete(userIssue, command)) {
                throw new Error('Can not change progress because the progress has already completed.')
            }
            userIssue.changeProgress(new UserIssueProgress(command.progress), command.user_id);
            await this.userIssueRepository.update(userIssue);
        } catch (e) {
            throw new Error(e.message);
        }
    }

    public async delete(command: UserIssueUpdateCommand) {
        try {
            await this.userIssueRepository.delete(command.id);
        } catch (e) {
            throw new Error(e.message);
        }
    }
}