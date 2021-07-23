import User from "domain/model/user/User"

export default interface UserFactoryInterface {
    create(user: object): Promise<User>;
    updateUser(user: User): Promise<User>;
}