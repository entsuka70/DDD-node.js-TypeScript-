import UserEmail from 'src/domain/model/user/UserEmail';

describe('domain/model/user UserEmail', () => {
  describe('正常系テスト', () => {
    // 利用するUserEmail初期化
    const newUserEmail = new UserEmail('newName@example.com');

    it('UserEmailインスタンス呼び出せる', () => {
      // 変数がundefinedでないことを検証
      expect(newUserEmail).toBeDefined();
      // newUserEmailがstringを生成していることを検証
      expect.stringContaining(newUserEmail.get());
    });

    it('UserEmailがフォーマットに沿ったemail文字列を取得できる', () => {
      // newUserEmailがUserEmailFormに準拠していることを検証
      expect(newUserEmail.get()).toMatch(UserEmail.USEREMAIL_MATCHER);
    });
  });

  describe('異常系テスト', () => {
    it('不正なUseNameインスタンス生成時にエラー出力', () => {
      // 引数が正しくないことを検証
      expect(() => new UserEmail('wrongmail@mail')).toThrow(
        'Do not match UserEmail FORMAT'
      );
      // 引数が正しくないことを検証
      expect(() => new UserEmail('新規ユーザー名@hoho.com')).toThrow(
        'Do not match UserEmail FORMAT'
      );
    });
  });
});
