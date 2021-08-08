import UserIssue from "domain/model/userissue/UserIssue";

export default class UserIssueDto {
    public readonly id: string;
    public readonly issue_id: string;
    public readonly user_id: string;
    public readonly progress: number;

    constructor(userIssue: UserIssue) {
        this.id = userIssue.getId();
        this.issue_id = userIssue.getIssueId();
        this.user_id = userIssue.getUserId();
        this.progress = userIssue.getProgress();
    }
}