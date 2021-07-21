import Team from 'domain/model/team';
import Pair from 'domain/model/pair';
import User from 'domain/model/user/User';
import BelongsValueObject from 'domain/valueobject/belongs/index';

export default interface UserRepositoryInterface {
    findByUserId(id: number): Promise<User>;
    findByUserIds(id: number[]): Promise<User[]>
    findBelongByBelongId(id: number): Promise<BelongsValueObject>;
    findByPairId(id: number): Promise<User>;
    findByTeamId(id: number): Promise<User>;
    findAll(): Promise<User[]>;
    create(data: object): Promise<void>;
    update(user: any): Promise<void>;
    delete(id: number): Promise<void>;
}