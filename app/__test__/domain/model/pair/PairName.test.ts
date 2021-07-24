import PairName from 'domain/model/pair/PairName';

describe('domain/model/pair Section PairId', () => {
    it('PairNameインスタンス呼び出し', () => {
        const newPairName = new PairName("n");
        // 変数がundefinedでないことを検証
        expect(newPairName).toBeDefined();
        // newUserNameがstringを生成していることを検証
        expect.stringContaining(newPairName.get());
        // newUserNameがUserNameFormに準拠していることを検証
        expect(newPairName.get()).toMatch(PairName.PAIRNAME_MATCHER);
    });
    it('不正なUseNameインスタンス呼び出し', () => {
        // 引数が正しくないことを検証
        expect(() => new PairName('wrongIdwrongIdwrongIdwrongIdwrongIdwrongIdwrongIdwrongIdwrongIdwrongIdwrongIdwrongId')).toThrow('Do not match PairName FORMAT');
        // 引数が正しくないことを検証
        expect(() => new PairName('新規ユーザー名')).toThrow('Do not match PairName FORMAT');
    })

});