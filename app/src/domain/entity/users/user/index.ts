import BelongsValueObject from 'domain/valueobject/belongs/index';

export default class User {
  private id: number;
  private name: string;
  private email: string;
  private belongs: BelongsValueObject;

  constructor(id: number, name: string, email: string, belongs: BelongsValueObject) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.belongs = belongs;
  }

  public changeUserBelongs(belongs: number) {
    this.belongs = new BelongsValueObject(belongs);
    return this;
  }
}
