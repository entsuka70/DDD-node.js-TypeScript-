import IssueId from "./IssueId";
import IssueNo from "./IssueNo";
import IssueName from "./IssueName";
import IssueGroup from "./IssueGroup";

type Props = {
    id: IssueId
    issue_no: IssueNo
    issue_name: IssueName
    issue_group: IssueGroup
}

export type IssueProps = Required<Props>

export default class Issue {
    private id: IssueId;
    private issue_no: IssueNo;
    private issue_name: IssueName;
    private issue_group: IssueGroup;

    constructor(props: IssueProps) {
        const { id, issue_no, issue_name, issue_group } = props;
        this.id = id;
        this.issue_no = issue_no;
        this.issue_name = issue_name;
        this.issue_group = issue_group;
    }

    public getAllProperties() {
        return {
            id: this.id.get(),
            issue_no: this.issue_no.get(),
            issue_name: this.issue_name.get(),
            issue_group: this.issue_group.get(),
        };
    }

    public getId() {
        return this.id.get()
    }

    public getIssueNo() {
        return this.issue_no.get()
    }

    public getIssueName() {
        return this.issue_name.get()
    }

    public getIssueGroup() {
        return this.issue_group.get()
    }
}