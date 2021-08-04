import UserId from 'domain/model/user/UserId';

describe('domain/model/user UserId', () => {
    describe('正常系テスト', () => {
        // 利用するUserId初期化
        const newUserId = new UserId();
        const nnewUserId = new UserId('06b5ea23-5029-4906-89c4-979f833715c4');
        const nnnewUserId = new UserId('8392ec7e-da7c-46d4-9178-bfef97416400');

        it('UUID生成がフォーマットに沿って出力する', () => {
            const UUID = UserId.generateUuid();
            expect(UUID).toMatch(UserId.UUID_MATCHER);
        });

        it('UserIdインスタンス呼び出せる', () => {
            // 変数がundefinedでないことを検証
            expect(newUserId).toBeDefined();
            // newUserIdがstringを生成していることを検証
            expect.stringContaining(newUserId.get());
        });

        it('UserIdインスタンスからUUIDに沿った文字列を出力できる', () => {
            // newUserIdがUUIDに準拠していることを検証
            expect(newUserId.get()).toMatch(UserId.UUID_MATCHER);
            expect(nnewUserId.get()).toMatch(UserId.UUID_MATCHER);
            expect(nnnewUserId.get()).toMatch(UserId.UUID_MATCHER);
        });
    });

    describe('異常系テスト', () => {
        it('不正なUseIdインスタンスでエラーを吐く', () => {
            // 変数がundefinedでないことを検証
            expect(() => new UserId('wrongId')).toThrow('Do not match UUID FORMAT');
        });
    });
});