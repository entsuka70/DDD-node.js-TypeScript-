import BelongsValueObject from 'domain/valueobject/belongs/index';

describe('Section ValueObject', () => {
  it('confirm checkRangeBelongs function', () => {
    const status = new BelongsValueObject(1);
    expect(status.checkRangeBelongs(1)).toBe(1);
  });

  it('Null BelongsValueObject', () => {
    const status = new BelongsValueObject();
    expect(status.checkRangeBelongs()).toBe(0);
  });

  it('Throw Error BelongsValueObject', () => {
    expect(() => new BelongsValueObject(4)).toThrow('belongs is invalid.');
  });
});
