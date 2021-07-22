import UserEmail from 'domain/model/user/UserEmail';

describe('domain/model/user Section UserId', () => {
    it('UserEmailインスタンス呼び出し', () => {
        const newUserEmail = new UserEmail("newName@example.com");
        // 変数がundefinedでないことを検証
        expect(newUserEmail).toBeDefined();
        // newUserEmailがstringを生成していることを検証
        expect.stringContaining(newUserEmail.get());
        // newUserEmailがUserEmailFormに準拠していることを検証
        expect(newUserEmail.get()).toMatch(UserEmail.USEREMAIL_MATCHER);
    });
    it('不正なUseNameインスタンス呼び出し', () => {
        // 引数が正しくないことを検証
        expect(() => new UserEmail('wrongmail@mail')).toThrow('Do not match UserEmail FORMAT');
        // 引数が正しくないことを検証
        expect(() => new UserEmail('新規ユーザー名@hoho.com')).toThrow('Do not match UserEmail FORMAT');
    })

});