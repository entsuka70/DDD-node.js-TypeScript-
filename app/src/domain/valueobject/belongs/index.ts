export default class BelongsValueObject {
  private belongs: number;

  static BELONGS = 0; // 0: 在籍中
  static BELONGS_BREAKING = 1; // 1: 休会中
  static BELONGS_WITHDRAWAL = 2; // 2: 退会済み

  constructor(belongs?: number | null) {
    const status = this.checkRangeBelongs(belongs);
    this.belongs = status;
  }

  public checkRangeBelongs(belongs?: number | null): number {
    if (!belongs) {
      return BelongsValueObject.BELONGS;
    }
    if (
      BelongsValueObject.BELONGS >= belongs &&
      belongs >= BelongsValueObject.BELONGS_WITHDRAWAL
    ) {
      throw new Error('belongs is invalid.');
    }
    return belongs;
  }
}
