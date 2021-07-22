import UserId from 'domain/model/user/UserId';

describe('domain/model/user Section UserId', () => {
    it('UserIdインスタンス呼び出し', () => {
        const newUserId = new UserId();
        // 変数がundefinedでないことを検証
        expect(newUserId).toBeDefined();
        // newUserIdがstringを生成していることを検証
        expect.stringContaining(newUserId.get());
        // newUserIdがUUIDに準拠していることを検証
        expect(newUserId.get()).toMatch(UserId.UUID_MATCHER);
    });
    it('不正なUseIdインスタンス呼び出し', () => {
        // 変数がundefinedでないことを検証
        expect(() => new UserId('wrongId')).toThrow('Do not match UUID FORMAT');
    })

});