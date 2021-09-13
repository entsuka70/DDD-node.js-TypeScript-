import User from './User';

export default interface UserRepositoryInterface {
  find(id: string): Promise<User>;
  findAll(): Promise<User[]>;
  findByPairIds(ids: string[]): Promise<User[]>;
  save(user: User): Promise<void>;
  update(user: User): Promise<void>;
  delete(id: string): Promise<void>;
}
