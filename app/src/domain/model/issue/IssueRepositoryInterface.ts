
export default interface IssueRepositoryInterface {
    findByIssueId(id: number): Promise<void>;
    findAll(): Promise<void>;
    create(data: object): Promise<void>;
    update(entity: void): Promise<void>;
    delete(id: number): Promise<void>;
}