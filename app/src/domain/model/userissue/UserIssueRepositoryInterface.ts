import UserIssue from './UserIssue';

export default interface UserIssueRepositoryInterface {
  find(id: string): Promise<UserIssue>;
  findAll(): Promise<UserIssue[]>;
  createMany(userIssues: UserIssue[]): Promise<void>;
  update(userIssue: UserIssue): Promise<void>;
  delete(id: string): Promise<void>;
  deletManyIssue(id: string): Promise<void>;
}
