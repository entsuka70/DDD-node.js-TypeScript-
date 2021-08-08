import Issue from 'domain/model/issue/Issue';

export default class Issuegroup {
    private id: number;
    private name: string;
    private issue: Issue[];

    constructor(id: number, name: string, issue: Issue[]) {
        this.id = id;
        this.name = name;
        this.issue = issue;
    }
}