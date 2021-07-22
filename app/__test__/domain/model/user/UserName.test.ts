import UserName from 'domain/model/user/UserName';

describe('domain/model/user Section UserId', () => {
    it('UserNameインスタンス呼び出し', () => {
        const newUserName = new UserName("newName");
        // 変数がundefinedでないことを検証
        expect(newUserName).toBeDefined();
        // newUserNameがstringを生成していることを検証
        expect.stringContaining(newUserName.get());
        // newUserNameがUserNameFormに準拠していることを検証
        expect(newUserName.get()).toMatch(UserName.USERNAME_MATCHER);
    });
    it('不正なUseNameインスタンス呼び出し', () => {
        // 引数が正しくないことを検証
        expect(() => new UserName('wrongIdwrongIdwrongIdwrongIdwrongIdwrongIdwrongIdwrongIdwrongIdwrongIdwrongIdwrongId')).toThrow('Do not match UserName FORMAT');
        // 引数が正しくないことを検証
        expect(() => new UserName('新規ユーザー名')).toThrow('Do not match UserName FORMAT');
    })

});