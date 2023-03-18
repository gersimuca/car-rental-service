export class Client {
  firstName: string;
  lastName: string;
  email: string;
  carModule!: string;

  constructor(firstName: string, lastName: string, email: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }
}
