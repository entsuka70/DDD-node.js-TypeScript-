import Team from 'domain/model/team';
import Pair from 'domain/model/pair';
import User from 'domain/model/user/User';

export default interface IssueRepositoryInterface {
    findByIssueId(id: number): Promise<object>;
    findAll(): Promise<object[]>;
    create(data: object): Promise<void>;
    update(entity: object, data: object): Promise<void>;
    delete(id: number): Promise<void>;
}