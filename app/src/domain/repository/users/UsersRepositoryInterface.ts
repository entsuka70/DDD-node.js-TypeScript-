import Team from 'domain/entity/users/team';
import Pair from 'domain/entity/users/pair';
import User from 'domain/entity/users/user';
import { NodeWorker } from 'inspector';

export default interface UsersRepositoryInterface {
    find(id: number): Promise<object>;
    findAll(): Promise<User[]>|Promise<Pair[]>|Promise<Team[]>;
    findById(id: number): Promise<User>|Promise<Pair>|Promise<Team>;
    create(data: {pair_id: number|null, user_name: string, email: string, belong_id: number|null} ): Promise<void>;
    update(data: {id: number, pair_id: number, user_name: string, email: string, belong_id: number}): Promise<void>;
    delete(id: number): Promise<void>;
}