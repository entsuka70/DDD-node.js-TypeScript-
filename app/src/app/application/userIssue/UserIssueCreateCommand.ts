import express from 'express';

export default class UserIssueCreateCommand {
  public id: string;
  public issue_id: string;
  public user_id: string;
  public progress: number;

  constructor(req: express.Request) {
    this.id = req.params.id || req.body.id;
    this.issue_id = req.body.issue_id;
    this.user_id = req.body.user_id;
    this.progress = req.body.progress;
  }

  public getId() {
    return this.id;
  }
}
