import Team from 'domain/entity/users/team';
import Pair from 'domain/entity/users/pair';
import User from 'domain/entity/users/user';

export default interface IssueRepositoryInterface {
    findByIssueId(id: number): Promise<object>;
    findAll(): Promise<object[]>;
    create(data: object): Promise<void>;
    update(entity: object, data: object): Promise<void>;
    delete(id: number): Promise<void>;
}