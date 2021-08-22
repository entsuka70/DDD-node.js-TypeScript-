export default class PairName {
  private pairName: string;

  static PAIRNAME_MATCHER = /^[a-z]$/;

  constructor(pairName: string) {
    if (pairName && !PairName.PAIRNAME_MATCHER.test(pairName)) {
      throw new Error('Do not match PairName FORMAT');
    }
    this.pairName = pairName;
  }

  public get(): string {
    return this.pairName;
  }
}
