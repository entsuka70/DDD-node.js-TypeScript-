import Team from 'domain/entity/users/team';
import Pair from 'domain/entity/users/pair';
import User from 'domain/entity/users/user';
import { NodeWorker } from 'inspector';

export default interface UserRepositoryInterface {
    findAggregationByUserId(id: number): Promise<object>;
    findAll(): Promise<User[]>|Promise<Pair[]>|Promise<Team[]>;
    findUserAll(): Promise<object[]>;
    findById(id: number): Promise<User>|Promise<Pair>|Promise<Team>;
    create(data: object): Promise<void>;
    update(data: object): Promise<void>;
    delete(id: number): Promise<void>;
}