import express from 'express';

export default class UserIssueUpdateCommand {
    public id: string;
    public user_id: string;
    public issue_id: string;
    public progress: number;

    constructor(req: express.Request) {
        this.id = req.params.id;
        this.user_id = req.params.user_id;
        this.issue_id = req.params.issue_id;
        this.progress = req.body.progress;
    }
}