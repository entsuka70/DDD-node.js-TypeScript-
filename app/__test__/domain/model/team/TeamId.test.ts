import TeamId from 'domain/model/team/TeamId';
import UserId from 'domain/model/user/UserId';

describe('domain/model/team TeamId', () => {
    describe('正常系テスト', () => {
        // 利用するTeamId初期化
        const newTeamId = new TeamId();
        const nnewTeamId = new TeamId('06b5ea23-5029-4906-89c4-979f833715c4');
        const nnnewTeamId = new TeamId('8392ec7e-da7c-46d4-9178-bfef97416400');

        it('UUID生成がフォーマットに沿って出力する', () => {
            const UUID = UserId.generateUuid();
            expect(UUID).toMatch(UserId.UUID_MATCHER);
        });

        it('TeamIdインスタンスが呼び出せる', () => {
            // 変数がundefinedでないことを検証
            expect(newTeamId).toBeDefined();
            // newUserIdがstringを生成していることを検証
            expect.stringContaining(newTeamId.get());
        });

        it('TeamIdインスタンスからUUIDに沿った文字列を出力できる', () => {
            // newUserIdがUUIDに準拠していることを検証
            expect(newTeamId.get()).toMatch(TeamId.UUID_MATCHER);
            expect(nnewTeamId.get()).toMatch(TeamId.UUID_MATCHER);
            expect(nnnewTeamId.get()).toMatch(TeamId.UUID_MATCHER);
        });
    });
    describe('異常系テスト', () => {
        it('不正なTeamIdインスタンス呼び出しでエラーを吐く', () => {
            // 変数がundefinedでないことを検証
            expect(() => new TeamId('wrongId')).toThrow('Do not match UUID FORMAT');
        })
    });
});