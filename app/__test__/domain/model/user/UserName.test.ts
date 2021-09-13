import UserName from '../../../../src/domain/model/user/UserName';

describe('domain/model/user UserId', () => {
  describe('正常系テスト', () => {
    // 利用するUserName初期化
    const newUserName = new UserName('newName');
    it('UserNameインスタンス初期化できる', () => {
      // 変数がundefinedでないことを検証
      expect(newUserName).toBeDefined();
      // newUserNameがstringを生成していることを検証
      expect.stringContaining(newUserName.get());
    });

    it('UserNameが意図したフォーマットで出力する', () => {
      // newUserNameがUserNameFormに準拠していることを検証
      expect(newUserName.get()).toMatch(UserName.USERNAME_MATCHER);
    });
  });

  describe('異常系テスト', () => {
    it('不正なUseNameインスタンス呼び出しでエラー出力する', () => {
      // 引数が正しくないことを検証
      expect(
        () =>
          new UserName(
            'wrongIdwrongIdwrongIdwrongIdwrongIdwrongIdwrongIdwrongIdwrongIdwrongIdwrongIdwrongId'
          )
      ).toThrow('Do not match UserName FORMAT');
      // 引数が正しくないことを検証
      expect(() => new UserName('新規ユーザー名')).toThrow(
        'Do not match UserName FORMAT'
      );
    });
  });
});
