import User from "domain/entity/users/user/index";
import BelongsValueObject from "domain/valueobject/belongs/index";

export default class UserFactory {

    public createUserEntity(data: {id: number, name: string, email: string, belongs: BelongsValueObject}): User {
        
        return new User(data.id, data.name, data.email, new BelongsValueObject());
    }
}