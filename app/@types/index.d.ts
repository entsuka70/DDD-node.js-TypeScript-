import { Request } from 'express';

declare namespace RequestType {
  export interface CreateUser extends Request {
    body: {
      user_name: string;
      email: string;
      pair_id?: string;
      team_id?: string;
      status?: number;
    };
  }
  export interface UpdateUser extends Request {
    params: {
      id: string;
    };
    body: {
      user_name: string;
      email: string;
      pair_id: string;
      team_id: string;
      status: number;
    };
  }
  export interface DeleteUser extends Request {
    params: {
      id: string;
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
      team_name: number;
      pair_ids: string[];
      user_ids: string[];
    };
  }
  export interface CreateIssue extends Request {
    body: {
      issue_no: number;
      issue_name: string;
      issue_group: number;
    };
  }
  export interface DeleteIssue extends Request {
    params: {
      id: string;
    };
  }
  export interface GetUserIssue extends Request {
    params: {
      id: string;
    };
    query: {
      issue_id: string;
      issue_no: string;
      issue_name: string;
      issue_group: string;
      user_id: string;
      user_name: string;
      status: string;
      progress: string;
      list: string;
      list_no: string;
    };
  }
  export interface CreateUserIssue extends Request {
    params: {
      id: string;
    };
    body: {
      issue_id: string;
      user_id: string;
      progress: number;
    };
  }
  export interface UpdateUserIssue extends Request {
    params: {
      id: string;
      user_id: string;
      issue_id: string;
    };
    body: {
      progress: number;
    };
  }
}
