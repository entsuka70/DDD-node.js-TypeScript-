import BelongsValueObject from "domain/valueobject/belongs";
import User from "domain/model/user/User";
import Pair from "domain/model/pair";
import Team from "domain/model/team";
import UserRepositoryInterface from "domain/model/user/UserRepositoryInterface";

export default class UserDomainService {

    private readonly userRepository: UserRepositoryInterface;

    constructor(userRepository: UserRepositoryInterface) {
        this.userRepository = userRepository;
    }

    // 重複するメールアドレスは許容しない
    public async isExist(email: string): Promise<Boolean> {
        const users = await this.userRepository.findAll();
        const duplicateEmailUser = users.filter((user) => user.getEmail() === email);
        if (duplicateEmailUser.length) {
            return false;
        }
        return true;
    }

}