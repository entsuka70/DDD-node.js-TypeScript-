import User from 'domain/entity/users/user/index';
import BelongsValueObject from 'domain/valueobject/belongs/index';

describe('Section entity User', () => {
    it('confirm make instance User', () => {
        const newUser = new User(1, 'Test', 'test@gmail.com', new BelongsValueObject().getBelongs());
        console.log(newUser);
        expect(newUser).toBeDefined();
    });

    it('check changeUserBelongs function', () => {
        const newUser = new User(1, 'test', 'test@mail.com', new BelongsValueObject().getBelongs());
        console.log(newUser);
        newUser.changeUserBelongs(1);
        console.log(newUser);
        expect(newUser).toBeDefined();
    });
});