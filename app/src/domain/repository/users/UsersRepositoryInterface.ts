import Team from 'domain/entity/users/team';
import Pair from 'domain/entity/users/pair';
import User from 'domain/entity/users/user';

export default interface UsersRepositoryInterface {
    findAll(): Promise<User[]>|Promise<Pair[]>|Promise<Team[]>;
    findById(id: number): Promise<User>|Promise<Pair>|Promise<Team>;
    create(entity: User|Pair|Team): Promise<User>|Promise<Pair>|Promise<Team>;
    update(entity: User|Pair|Team): Promise<User>|Promise<Pair>|Promise<Team>;
    delete(id: number): Promise<User>|Promise<Pair>|Promise<Team>;
}