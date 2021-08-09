import express from 'express';

export default class IssueCreateCommand {
    public issue_no: number;
    public issue_name: string;
    public issue_group: number;

    constructor(req: express.Request) {
        this.issue_no = req.body.issue_no;
        this.issue_name = req.body.issue_name;
        this.issue_group = req.body.issue_group;
    }
}