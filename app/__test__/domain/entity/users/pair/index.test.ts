import Pair from 'domain/entity/users/pair/index';
import User from 'domain/entity/users/user/user';
import BelongsValueObject from 'domain/valueobject/belongs/index';

describe('Section entity Pair', () => {
    it('confirm make instance Pair', () => {
        const newPair = new Pair(1, 'pair-a', [
            new User(1, 'Test1', 'test1@gmail.com', new BelongsValueObject()),
            new User(2, 'Test2', 'test2@gmail.com', new BelongsValueObject()),
        ]);
        console.log(newPair);
        expect(newPair).toBeDefined();
    });
});