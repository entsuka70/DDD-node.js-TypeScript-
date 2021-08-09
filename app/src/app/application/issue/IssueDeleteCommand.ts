import express from 'express';

export default class IssueDeleteCommand {
    public id: string;

    constructor(req: express.Request) {
        this.id = req.params.id;
    }
}