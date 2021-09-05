import UserStatus from 'src/domain/model/user/UserStatus';

describe('domain/model/user UserStatus', () => {
  describe('正常系テスト', () => {
    // 利用するUserStatus初期化
    const newUserBelong = new UserStatus();
    it('UserStatusインスタンス呼び出せる', () => {
      // 変数がundefinedでないことを検証
      expect(newUserBelong).toBeDefined();
      // newUserBelongが所属を生成していることを検証
      expect(newUserBelong.get()).toBe(1);
      const undefinedBelong = new UserStatus(undefined);
      expect(undefinedBelong.get()).toBe(1);
    });

    it('UserStatusの値が指定のものを準拠している', () => {
      // newUserBelongがUserBelongFormに準拠していることを検証
      expect(String(newUserBelong.get())).toMatch(
        UserStatus.USERSTATUS_MATCHER
      );
    });
  });

  describe('異常系テスト', () => {
    it('不正なUseStatusインスタンス呼び出し', () => {
      // 引数が正しくないことを検証
      expect(() => new UserStatus(0)).toThrow('Do not match UserStatus FORMAT');
      // 引数が正しくないことを検証
      expect(() => new UserStatus(99)).toThrow(
        'Do not match UserStatus FORMAT'
      );
    });
  });
});
