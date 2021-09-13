import TeamName from '../../../../src/domain/model/team/TeamName';

describe('domain/model/team TeamName', () => {
  describe('正常系テスト', () => {
    const newTeamName = new TeamName(12);
    it('TeamNameインスタンス呼び出しができる', () => {
      // 変数がundefinedでないことを検証
      expect(newTeamName).toBeDefined();
      // newTeamNameがstringを生成していることを検証
      expect.stringContaining(String(newTeamName.get()));
      expect(newTeamName.get()).toBe(12);
    });

    it('TeamNameが指定のルールに準拠している', () => {
      // newTeamNameがTeamNameFormに準拠していることを検証
      expect(String(newTeamName.get())).toMatch(TeamName.TEAMNAME_MATCHER);
    });
  });

  describe('異常系テスト', () => {
    it('不正なUseNameインスタンス呼び出しでエラーを吐く', () => {
      // 引数が正しくないことを検証
      expect(() => new TeamName(10000)).toThrow('Do not match TeamName FORMAT');
      // 引数が正しくないことを検証
      expect(() => new TeamName(1111)).toThrow('Do not match TeamName FORMAT');
    });
  });
});
