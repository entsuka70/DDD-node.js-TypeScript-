import UserDto from "app/dto/UserDto";
import PairDto from "app/dto/PairDto";
import User from "domain/entity/users/user"

export default interface UserFactoryInterface {
    createUserAll(users: object[]): Promise<object[]>;
    createPairAll(users: object[]): Promise<object[]>;
    createTeamAll(users: object[]): Promise<object[]>;
    createUser(user: object): Promise<User>;
    updateUser(data: object, userEntity: User, pairData: User, belongData: User): Promise<User>;
}