import UserIssue from 'domain/model/userissue/index';

export default class Issue {
    private id: number;
    private issue_name: string;
    private issue_group_id: number;

    constructor(id: number, issue_name: string, issue_group_id: number) {
        this.id = id;
        this.issue_name = issue_name;
        this.issue_group_id = issue_group_id;
    }
}