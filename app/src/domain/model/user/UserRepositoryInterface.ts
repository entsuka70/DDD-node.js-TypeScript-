import User from 'domain/model/user/User';

export default interface UserRepositoryInterface {
    // userIdオブジェクトがあるので引数もなるべくuserIdオブジェクトを使ったほうが良いのかなと思いました。
    find(id: string): Promise<User>;
    findAll(): Promise<User[]>;
    findByPairIds(ids: string[]): Promise<User[]>
    save(user: User): Promise<void>;
    update(user: User): Promise<void>;
    delete(id: string): Promise<void>;
}