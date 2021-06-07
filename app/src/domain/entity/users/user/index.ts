import BelongsValueObject from 'domain/valueobject/belongs/index';

export default class User {
  private id: number;
  private pair_id: number;
  private user_name: string;
  private email: string;
  private belong_id: number;

  constructor(props: {id: number, pair_id: number|null, user_name: string, email: string, belong_id: number|null}) {
    const {id, pair_id, user_name, email, belong_id} = props;
    this.id = id;
    this.pair_id = pair_id ?? 1;
    this.user_name = user_name;
    this.email = email;
    this.belong_id = belong_id ? new BelongsValueObject(belong_id).getBelongs() : new BelongsValueObject().getBelongs();
  }

  public getAllProperties() {
      return {
          id: this.id,
          pair_id: this.pair_id,
          name: this.user_name,
          email: this.email,
          belong_id: this.belong_id
      };
  }

  public changeUserBelongs(belongs: number) {
    this.belong_id = new BelongsValueObject(belongs).getBelongs();
    return this;
  }
}
