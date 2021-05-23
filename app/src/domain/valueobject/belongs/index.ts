export class BelongsValueObject {
  protected belongs: number;
  protected readonly BELONGS: number = 0; // 0: 在籍中
  protected readonly BELONGS_BREAKING: number = 1; // 1: 休会中
  protected readonly BELONGS_WITHDRAWAL: number = 2; // 2: 退会済み

  constructor(belongs: number) {
    this.checkRangeBelongs(belongs);
    this.belongs = Object.freeze(belongs);
  }

  private checkRangeBelongs(belongs: number): number {
    if (!belongs) {
      return this.BELONGS;
    }
    if (this.BELONGS >= belongs && belongs >= this.BELONGS_WITHDRAWAL) {
      throw new Error('belongs is invalid.');
    }
    return belongs;
  }
}
