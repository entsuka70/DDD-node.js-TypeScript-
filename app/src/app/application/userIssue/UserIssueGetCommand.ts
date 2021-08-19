import express from 'express';
import { ParsedQs } from 'qs';

type QueryString = string | ParsedQs | string[] | ParsedQs[] | undefined;

export default class UserIssueGetCommand {
  public id: QueryString;
  public issue_id: QueryString;
  public issue_no: QueryString;
  public issue_name: QueryString;
  public issue_group: QueryString;
  public user_id: QueryString;
  public user_name: QueryString;
  public status: QueryString;
  public progress: QueryString;
  public list: QueryString;
  public list_no: QueryString;

  constructor(req: express.Request) {
    this.id = req.params.id;
    this.issue_id = req.query.issue_id;
    this.issue_no = req.query.issue_no;
    this.issue_name = req.query.issue_name;
    this.issue_group = req.query.issue_group;
    this.user_id = req.query.user_id;
    this.user_name = req.query.user_name;
    this.status = req.query.status;
    this.progress = req.query.progress;
    this.list = req.query.list;
    this.list_no = req.query.list_no;
  }
}
