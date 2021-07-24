import TeamId from 'domain/model/team/TeamId';

describe('domain/model/team Section TeamId', () => {
    it('TeamIdインスタンス呼び出し', () => {
        const newTeamId = new TeamId();
        const nnewTeamId = new TeamId('06b5ea23-5029-4906-89c4-979f833715c4');
        const nnnewTeamId = new TeamId('8392ec7e-da7c-46d4-9178-bfef97416400');
        // 変数がundefinedでないことを検証
        expect(newTeamId).toBeDefined();
        // newUserIdがstringを生成していることを検証
        expect.stringContaining(newTeamId.get());
        // newUserIdがUUIDに準拠していることを検証
        expect(newTeamId.get()).toMatch(TeamId.UUID_MATCHER);
        expect(nnewTeamId.get()).toMatch(TeamId.UUID_MATCHER);
        expect(nnnewTeamId.get()).toMatch(TeamId.UUID_MATCHER);

    });
    it('不正なUseIdインスタンス呼び出し', () => {
        // 変数がundefinedでないことを検証
        expect(() => new TeamId('wrongId')).toThrow('Do not match UUID FORMAT');
    })

});