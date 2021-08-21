import { Request } from 'express';

declare namespace RequestType {
  export interface User extends Request {
    params: {
      id: string;
    };
    body: {
      id: string;
      user_name: string;
      email: string;
      pair_id: string;
      team_id: string;
      status: number;
    };
  }
  export interface Pair extends Request {
    params: {
      id: string;
    };
    body: {
      team_id: string;
      pair_name: string;
      user_ids: string[];
    };
  }
  export interface Team extends Request {
    params: {
      id: string;
    };
    body: {
      team_name: string;
      pair_ids: string[];
      user_ids: string[];
    };
  }
  export interface Issue extends Request {
    params: {
      id: string;
    };
    body: {
      issue_no: number;
      issue_name: string;
      issue_group: number;
    };
  }
  export interface UserIssue extends Request {
    params: {
      id: string;
    };
    body: {
      user_id: string;
      issue_id: string;
      progress: number;
    };
  }
}
