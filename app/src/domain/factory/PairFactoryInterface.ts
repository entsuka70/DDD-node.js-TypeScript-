import UserDto from "app/dto/UserDto";
import PairDto from "app/dto/PairDto";
import User from "domain/model/user/User"

export default interface UserFactoryInterface {
    createPairAll(users: object[]): Promise<object[]>;
    createTeamAll(users: object[]): Promise<object[]>;
}