import UserIssueUpdateCommand from "app/application/userIssue/UserIssueUpdateCommand";
import UserIssue from "domain/model/userissue/UserIssue";
import UserIssueProgress from "domain/model/userissue/UserIssueProgress";
import UserIssueRepositoryInterface from "domain/model/userissue/UserIssueRepositoryInterface";

export default class UserIssueDomainService {
    private readonly userIssueRepository: UserIssueRepositoryInterface;

    constructor(userIssueRepository: UserIssueRepositoryInterface) {
        this.userIssueRepository = userIssueRepository;
    }

    public isComplete(userIssue: UserIssue, command: UserIssueUpdateCommand): Boolean {
        const progress = userIssue.getProgress();
        const requestProgress = command.progress;
        if (progress == UserIssueProgress.PROGRESS_COMPLETE && requestProgress < UserIssueProgress.PROGRESS_COMPLETE) {
            return true;
        }
        return false;
    }
}