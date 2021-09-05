import PairId from 'src/domain/model/pair/PairId';

describe('domain/model/pair PairId', () => {
  describe('正常系テスト', () => {
    // 利用するPairId初期化
    const newPairId = new PairId();
    const nnewPairId = new PairId('06b5ea23-5029-4906-89c4-979f833715c4');
    const nnnewPairId = new PairId('8392ec7e-da7c-46d4-9178-bfef97416400');

    it('生成されるUUIDが指定のフォーマットに準拠している', () => {
      const UUID = PairId.generateUuid();
      expect(UUID).toMatch(PairId.UUID_MATCHER);
    });
    it('PairIdインスタンス呼び出し', () => {
      // 変数がundefinedでないことを検証
      expect(newPairId).toBeDefined();
      // newPairIdがstringを生成していることを検証
      expect.stringContaining(newPairId.get());
    });
    it('PairIdが指定のフォーマットで生成される', () => {
      // newPairIdがUUIDに準拠していることを検証
      expect(newPairId.get()).toMatch(PairId.UUID_MATCHER);
      expect(nnewPairId.get()).toMatch(PairId.UUID_MATCHER);
      expect(nnnewPairId.get()).toMatch(PairId.UUID_MATCHER);
    });
  });

  describe('異常系テスト', () => {
    it('不正なUseIdインスタンス呼び出し', () => {
      // 変数がundefinedでないことを検証
      expect(() => new PairId('wrongId')).toThrow('Do not match UUID FORMAT');
    });
  });
});
