import UserIssueRepositoryInterface from 'domain/model/userissue/UserIssueRepositoryInterface';
import UserIssueFactory from 'domain/factory/UserIssueFactory';
import UserIssueDto from './UserIssueDto';
import UserIssueCommand from './UserIssueCommand';


export default class UserIssueApplication {
    private readonly userIssueRepository: UserIssueRepositoryInterface;
    private readonly userIssueFactory: UserIssueFactory;

    constructor(userIssueRepository: UserIssueRepositoryInterface) {
        this.userIssueRepository = userIssueRepository;
        this.userIssueFactory = new UserIssueFactory();
    }

    public async findAll() {
        try {
            const userIssues = await this.userIssueRepository.findAll();
            const userIssuesDto = userIssues.map((userIssue) => new UserIssueDto(userIssue));
            return userIssuesDto;
        } catch (e) {
            throw new Error(e.message);
        }
    }

    public async update(command: UserIssueCommand) {

    }

    public async delete(id: string) {

    }
}