import BelongsValueObject from 'domain/valueobject/belongs/index';

export default class User {
  private id: number;
  private user_name: string;
  private email: string;
  private belongs: number;

  constructor(props: {id: number, user_name: string, email: string, belongs: number}) {
    const {id, user_name, email, belongs} = props;
    this.id = id;
    this.user_name = user_name;
    this.email = email;
    this.belongs = new BelongsValueObject(belongs).getBelongs();
  }

  public getAllProperties() {
      return {
          id: this.id,
          name: this.user_name,
          email: this.email,
          belongs: this.belongs
      };
  }

  public changeUserBelongs(belongs: number) {
    this.belongs = new BelongsValueObject(belongs).getBelongs();
    return this;
  }
}
