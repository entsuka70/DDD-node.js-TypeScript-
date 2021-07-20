import Team from 'domain/entity/users/team';
import Pair from 'domain/entity/users/pair';
import User from 'domain/entity/users/user';
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