import Issue from "./Issue";

export default interface IssueRepositoryInterface {
    find(id: string): Promise<Issue>;
    findAll(): Promise<Issue[]>;
    create(issue: Issue): Promise<void>;
    update(issue: Issue): Promise<void>;
    delete(id: string): Promise<void>;
}