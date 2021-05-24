import Team from 'domain/entity/users/team/index';
import Pair from 'domain/entity/users/pair/index';
import User from 'domain/entity/users/user/index';
import BelongsValueObject from 'domain/valueobject/belongs/index';

describe('Section entity Team', () => {
    it('confirm make instance Team', () => {
        const newTeam = new Team(1, 'team-a', [
            new Pair(1, 'pair-a', [
                new User(1, 'Test1', 'test1@gmail.com', new BelongsValueObject()),
                new User(2, 'Test2', 'test2@gmail.com', new BelongsValueObject()),
            ]),
            new Pair(2, 'pair-b', [
                new User(3, 'Test3', 'test3@gmail.com', new BelongsValueObject()),
                new User(4, 'Test4', 'test4@gmail.com', new BelongsValueObject()),
            ]),
        ]);
        console.log(newTeam);
        expect(newTeam).toBeDefined();
    });
});