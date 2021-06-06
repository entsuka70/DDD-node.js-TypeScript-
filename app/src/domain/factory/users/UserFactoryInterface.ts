import UserDto from "app/dto/UserDto";
import User from "domain/entity/users/user"

export default interface UserFactoryInterface {
    createUserAll(users: object[]): Promise<UserDto[]>;
    createUser(user: object): Promise<object>;
}