import IssueRepositoryInterface from 'domain/model/issue/IssueRepositoryInterface';
import IssueFactoryInterface from 'domain/factory/IssueFactoryInterface';


export default class IssueApplication {
    private readonly issueRepository: IssueRepositoryInterface;
    private readonly issueFactory: IssueFactoryInterface;

    constructor(issueRepository: IssueRepositoryInterface, issueFactory: IssueFactoryInterface) {
        this.issueRepository = issueRepository;
        this.issueFactory = issueFactory;
    }

    /**
     * 課題ユースケース層
     * 課題更新ユースケース
     * 
     * @param {object} data
     */
    public async update(data: { id: number }) {
        try {
            const issueAggregation = await this.issueRepository.findByIssueId(data.id);
            await this.issueRepository.update(issueAggregation);
        } catch (e) {
            throw new Error(`Error PairApplication::update(): ${e.message}`);
        }
    }
}