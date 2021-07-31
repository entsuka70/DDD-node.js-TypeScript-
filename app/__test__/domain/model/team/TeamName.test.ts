import TeamName from 'domain/model/team/TeamName';

describe('domain/model/team Section TeamName', () => {
    it('TeamNameインスタンス呼び出し', () => {
        const newTeamName = new TeamName("000");
        // 変数がundefinedでないことを検証
        expect(newTeamName).toBeDefined();
        // newUserNameがstringを生成していることを検証
        expect.stringContaining(newTeamName.get());
        // newUserNameがUserNameFormに準拠していることを検証
        expect(newTeamName.get()).toMatch(TeamName.TEAMNAME_MATCHER);
    });
    it('不正なUseNameインスタンス呼び出し', () => {
        // 引数が正しくないことを検証
        expect(() => new TeamName('wrongIdwrongIdwrongIdwrongIdwrongIdwrongIdwrongIdwrongIdwrongIdwrongIdwrongIdwrongId')).toThrow('Do not match TeamName FORMAT');
        // 引数が正しくないことを検証
        expect(() => new TeamName('新規ユーザー名')).toThrow('Do not match TeamName FORMAT');
    })

});