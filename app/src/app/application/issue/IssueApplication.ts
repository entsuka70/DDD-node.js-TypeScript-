import IssueRepositoryInterface from 'domain/model/issue/IssueRepositoryInterface';
import IssueFactory from 'domain/factory/IssueFactory';
import IssueDto from './IssueDto';


export default class IssueApplication {
    private readonly issueRepository: IssueRepositoryInterface;
    private readonly issueFactory: IssueFactory;

    constructor(issueRepository: IssueRepositoryInterface) {
        this.issueRepository = issueRepository;
        this.issueFactory = new IssueFactory();
    }

    public async findAll() {
        try {
            const issues = await this.issueRepository.findAll();
            const issueDto = issues.map((issue) => new IssueDto(issue));
            return issueDto;
        } catch (e) {
            throw new Error(e.message);
        }
    }
}