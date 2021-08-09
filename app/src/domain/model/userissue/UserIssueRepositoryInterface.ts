import UserIssue from "./UserIssue";

export default interface UserIssueRepositoryInterface {
    find(id: string): Promise<UserIssue>;
    findAll(): Promise<UserIssue[]>;
    create(userIssue: UserIssue): Promise<void>;
    createMany(userIssues: UserIssue[]): Promise<void>;
    update(userIssue: UserIssue): Promise<void>;
    delete(id: string): Promise<void>;
}