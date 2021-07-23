import User from "domain/model/user/User"
import UserCreateCommand from "app/application/user/UserCreateCommand"

export default interface UserFactoryInterface {
    create(user: object): Promise<User>;
    update(command: UserCreateCommand, user: User): Promise<User>;
}