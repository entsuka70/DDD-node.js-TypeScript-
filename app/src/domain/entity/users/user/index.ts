import BelongsValueObject from 'domain/valueobject/belongs/index';

export default class User {
  private id: number;
  private name: string;
  private email: string;
  private belongs: number;

  constructor(id: number, name: string, email: string, belongs: number) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.belongs = new BelongsValueObject(belongs).getBelongs();
  }

  public getAllProperties() {
      return {
          id: this.id,
          name: this.name,
          email: this.email,
          belongs: this.belongs
      };
  }

  public changeUserBelongs(belongs: number) {
    this.belongs = new BelongsValueObject(belongs).getBelongs();
    return this;
  }
}
