import { BelongsValueObject } from 'domain/valueobject/belongs/index';
// import { checkRangeBelongs } from 'domain/valueobject/belongs/index';

describe('Section ValueObject', () => {
  it('confirm checkRangeBelongs function', () => {
    console.log('START');
    const status = new BelongsValueObject(1);
    console.log(status);
    console.log(typeof status);
    expect(status.checkRangeBelongs(1)).toBe(1);
  });
});
