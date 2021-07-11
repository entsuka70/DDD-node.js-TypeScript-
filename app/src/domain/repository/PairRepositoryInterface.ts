import Team from 'domain/entity/users/team';
import Pair from 'domain/entity/users/pair';
import User from 'domain/entity/users/user';

export default interface PairRepositoryInterface {
    findById(id: number): Promise<Pair>;
    findAll(): Promise<Pair[]>;
    update(pair: Pair): Promise<void>;
}