import ProgressValueObject from "domain/valueobject/progress";
import User from "domain/entity/users/user/index";
import Issue from "domain/entity/issues/issue/index";

export default class UserIssue {
    private id: number;
    private user_id: number;
    private issue_id: number;
    private progress: number;
    private user: User;
    private issue: Issue;

    constructor(id: number, user_id: number, issue_id: number, progress: number, user: User, issue: Issue) {
        this.id = id;
        this.user_id = user_id;
        this.issue_id = issue_id;
        this.progress = new ProgressValueObject(progress).getProgress();
        this.user = user;
        this.issue = issue;
    }
}