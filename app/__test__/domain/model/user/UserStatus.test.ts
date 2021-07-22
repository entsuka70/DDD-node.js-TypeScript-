import UserStatus from 'domain/model/user/UserStatus';

describe('domain/model/user Section UserBelong', () => {
    it('UserBelongインスタンス呼び出し', () => {
        const newUserBelong = new UserStatus();
        // 変数がundefinedでないことを検証
        expect(newUserBelong).toBeDefined();
        // newUserBelongが所属を生成していることを検証
        expect(newUserBelong.get()).toBe(1);
        // newUserBelongがUserBelongFormに準拠していることを検証
        expect(String(newUserBelong.get())).toMatch(UserStatus.USERSTATUS_MATCHER);
        const undefinedBelong = new UserStatus(undefined);
        expect(undefinedBelong.get()).toBe(1);
    });
    it('不正なUseBelongインスタンス呼び出し', () => {
        // 引数が正しくないことを検証
        expect(() => new UserStatus(0)).toThrow('Do not match UserBelong FORMAT');
        // 引数が正しくないことを検証
        expect(() => new UserStatus(99)).toThrow('Do not match UserBelong FORMAT');
    })

});