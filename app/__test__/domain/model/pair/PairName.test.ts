import PairName from 'domain/model/pair/PairName';

describe('domain/model/pair PairName', () => {
  describe('正常系テスト', () => {
    // 利用するPairName初期化
    const newPairName = new PairName('n');
    it('PairNameインスタンス呼び出し', () => {
      // 変数がundefinedでないことを検証
      expect(newPairName).toBeDefined();
      // newPairNameがstringを生成していることを検証
      expect.stringContaining(newPairName.get());
    });

    it('PairNameがフォーマットに準拠している', () => {
      // newPairNameがUserNameFormに準拠していることを検証
      expect(newPairName.get()).toMatch(PairName.PAIRNAME_MATCHER);
    });
  });

  describe('異常系テスト', () => {
    it('不正なUseNameインスタンス呼び出し', () => {
      // 引数が正しくないことを検証
      expect(
        () =>
          new PairName(
            'wrongIdwrongIdwrongIdwrongIdwrongIdwrongIdwrongIdwrongIdwrongIdwrongIdwrongIdwrongId'
          )
      ).toThrow('Do not match PairName FORMAT');
      // 引数が正しくないことを検証
      expect(() => new PairName('新規ユーザー名')).toThrow(
        'Do not match PairName FORMAT'
      );
    });
  });
});
