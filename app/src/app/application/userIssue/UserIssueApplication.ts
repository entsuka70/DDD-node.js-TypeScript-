import UserIssueRepositoryInterface from 'domain/model/userissue/UserIssueRepositoryInterface';
import UserIssueFactory from 'domain/factory/UserIssueFactory';
import UserIssueDto from './UserIssueDto';
import UserIssueGetCommand from './UserIssueGetCommand';
import UserIssueCreateCommand from './UserIssueCreateCommand';
import UserIssueQueryServiceInterface from './UserIssueQueryServiceInterface';

export default class UserIssueApplication {
    private readonly userIssueRepository: UserIssueRepositoryInterface;
    private readonly userIssueFactory: UserIssueFactory;
    private readonly userIssueQueryService: UserIssueQueryServiceInterface;

    constructor(userIssueRepository: UserIssueRepositoryInterface, userIssueQueryService: UserIssueQueryServiceInterface) {
        this.userIssueRepository = userIssueRepository;
        this.userIssueFactory = new UserIssueFactory();
        this.userIssueQueryService = userIssueQueryService;
    }

    public async findAll(command: UserIssueGetCommand) {
        try {
            const userIssues = await this.userIssueQueryService.find(command);
            return userIssues;
        } catch (e) {
            throw new Error(e.message);
        }
    }

    public async update(command: UserIssueCreateCommand) {

    }

    public async delete(id: string) {

    }
}