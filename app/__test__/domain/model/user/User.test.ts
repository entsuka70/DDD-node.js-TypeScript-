import User, { UserProps } from 'domain/model/user/User';
import UserId from 'domain/model/user/UserId';
import PairId from 'domain/model/pair/PairId';
import TeamId from 'domain/model/team/TeamId';
import UserStatus from 'domain/model/user/UserStatus';
import UserName from 'domain/model/user/UserName';
import UserEmail from 'domain/model/user/UserEmail';

describe('domain/model/user User', () => {
    describe('正常系テスト', () => {
        // 利用するUser初期化
        const userId: UserId = new UserId('8312ec7e-da7c-46d4-9178-bfef97416400');
        const pairId: PairId = new PairId('8391ec7e-da7c-46d4-9178-bfef97416400');
        const teamId: TeamId = new TeamId('8392fc7e-da7c-46d4-9178-bfef97416400');
        const userStatus: UserStatus = new UserStatus(UserStatus.STATUS_BREAKING);
        const userName: UserName = new UserName('hogeUser');
        const userEmail: UserEmail = new UserEmail('hogehoge@mail.com');
        const props: UserProps = {
            id: userId,
            pair_id: pairId,
            team_id: teamId,
            status: userStatus,
            user_name: userName,
            email: userEmail
        };
        const user: User = new User(props);

        const emptyUserId: UserId = new UserId();
        const emptyPairId: PairId = new PairId();
        const emptyTeamId: TeamId = new TeamId();
        const emptyUserStatus: UserStatus = new UserStatus();

        const emptyIdIncludeProps: UserProps = {
            id: emptyUserId,
            pair_id: emptyPairId,
            team_id: emptyTeamId,
            status: emptyUserStatus,
            user_name: userName,
            email: userEmail
        }
        const emptyPropsIncludeUser: User = new User(emptyIdIncludeProps);

        it('Userインスタンス初期化が正常に動作する', () => {
            // 変数がundefinedでないことを検証
            expect(user).toBeDefined();
            // newUserがstring型のidを生成していることを検証
            expect.stringContaining(user.getId());
            // newUserが指定のidに準拠していることを検証
            expect(user.getId()).toMatch(UserId.UUID_MATCHER);
            // newUserが指定のpair_idに準拠していることを検証
            expect(user.getPairId()).toMatch(PairId.UUID_MATCHER);
            // newUserが指定のstatusに準拠していることを検証
            expect(user.getStatus()).toBe(2);
            // newUserが指定のuser_nameに準拠していることを検証
            expect(user.getUserName()).toMatch(UserName.USERNAME_MATCHER);
            // newUserが指定のemailに準拠していることを検証
            expect(user.getEmail()).toMatch(UserEmail.USEREMAIL_MATCHER);
        });
        it('Userインスタンス初期化時に各idが空欄でも自動生成して動作する', () => {
            // 変数がundefinedでないことを検証
            expect(emptyPropsIncludeUser).toBeDefined();
            // newUserがstring型のidを生成していることを検証
            expect.stringContaining(emptyPropsIncludeUser.getId());
            // newUserが指定のidに準拠していることを検証
            expect(emptyPropsIncludeUser.getId()).toMatch(UserId.UUID_MATCHER);
            // newUserが指定のpair_idに準拠していることを検証
            expect(emptyPropsIncludeUser.getPairId()).toMatch(PairId.UUID_MATCHER);
            // newUserが指定のstatusに準拠していることを検証
            expect(emptyPropsIncludeUser.getStatus()).toBe(1);
        });
        it('初期化したUserインスタンスメソッドが意図した通りに動作する', () => {
            user.changePairId(emptyPairId);
            expect(user.getPairId()).toMatch(emptyPairId.get());
            user.changeTeamId(emptyTeamId);
            expect(user.getTeamId()).toMatch(emptyTeamId.get());
            user.changeStatus(emptyUserStatus);
            expect(user.getStatus()).toBe(UserStatus.STATUS_BELONG);
        });
    });
});