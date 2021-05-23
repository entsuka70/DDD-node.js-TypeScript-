import { BelongsValueObject } from 'domain/valueobject/belongs/index';

export class User {
  private id: number;
  private name: string;
  private email: string;
  private belongs: number;

  constructor(id: number, name: string, email: string, belongs = 0) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.belongs = belongs;
  }
}
