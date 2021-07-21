import Team from 'domain/model/team';
import Pair from 'domain/model/pair';
import User from 'domain/model/user/User';

export default interface PairRepositoryInterface {
    findById(id: number): Promise<Pair>;
    findNoUserPairByUserId(): Promise<Pair>
    findAll(): Promise<Pair[]>;

    update(pair: Pair): Promise<void>;
}