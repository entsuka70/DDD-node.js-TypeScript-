import User from 'domain/model/user/User';
import UserId from 'domain/model/user/UserId';
import PairId from 'domain/model/pair/PairId';
import TeamId from 'domain/model/team/TeamId';
import UserStatus from 'domain/model/user/UserStatus';
import UserName from 'domain/model/user/UserName';
import UserEmail from 'domain/model/user/UserEmail';

describe('domain/model/user Section User', () => {
    it('Userインスタンス呼び出し', () => {
        const newUserId = new UserId();
        const newPairId = new PairId();
        const newTeamId = new TeamId();
        const newUserStatus = new UserStatus();
        const newUserName = new UserName('hogeUser');
        const newUserEmail = new UserEmail('hogeUser@example.com');
        const props = {
            id: newUserId,
            pair_id: newPairId,
            team_id: newTeamId,
            status: newUserStatus,
            user_name: newUserName,
            email: newUserEmail
        }

        const newUser = new User(props);
        // 変数がundefinedでないことを検証
        expect(newUser).toBeDefined();
        // newUserがstring型のidを生成していることを検証
        expect.stringContaining(newUser.getId());
        // newUserが指定のidに準拠していることを検証
        expect(newUser.getId()).toMatch(UserId.UUID_MATCHER);
        // newUserが指定のpair_idに準拠していることを検証
        expect(newUser.getPairId()).toMatch(PairId.UUID_MATCHER);
        // newUserが指定のstatusに準拠していることを検証
        expect(newUser.getStatus()).toBe(1);
        // newUserが指定のuser_nameに準拠していることを検証
        expect(newUser.getUserName()).toMatch(UserName.USERNAME_MATCHER);
        // newUserが指定のemailに準拠していることを検証
        expect(newUser.getEmail()).toMatch(UserEmail.USEREMAIL_MATCHER);

    });
});