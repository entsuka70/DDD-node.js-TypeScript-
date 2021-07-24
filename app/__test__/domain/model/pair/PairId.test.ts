import PairId from 'domain/model/pair/PairId';

describe('domain/model/pair Section PairId', () => {
    it('PairIdインスタンス呼び出し', () => {
        const newPairId = new PairId();
        const nnewPairId = new PairId('06b5ea23-5029-4906-89c4-979f833715c4');
        const nnnewPairId = new PairId('8392ec7e-da7c-46d4-9178-bfef97416400');
        // 変数がundefinedでないことを検証
        expect(newPairId).toBeDefined();
        // newUserIdがstringを生成していることを検証
        expect.stringContaining(newPairId.get());
        // newUserIdがUUIDに準拠していることを検証
        expect(newPairId.get()).toMatch(PairId.UUID_MATCHER);
        expect(nnewPairId.get()).toMatch(PairId.UUID_MATCHER);
        expect(nnnewPairId.get()).toMatch(PairId.UUID_MATCHER);

    });
    it('不正なUseIdインスタンス呼び出し', () => {
        // 変数がundefinedでないことを検証
        expect(() => new PairId('wrongId')).toThrow('Do not match UUID FORMAT');
    })

});