import { User } from '../interfaces/user.interface';

export class UserDto implements User {
  readonly name: string;
  readonly email: string;
  readonly passwordHash: string;
  readonly street: string;
  readonly apartment: string;
  readonly city: string;
  readonly zipCode: string;
  readonly country: string;
  readonly phone: string;
  readonly isAdmin: boolean;
  readonly _id?: string;

  constructor(
    name: string,
    email: string,
    passwordHash: string,
    street: string,
    apartment: string,
    city: string,
    zipCode: string,
    country: string,
    phone: string,
    isAdmin: boolean,
    _id?: string,
  ) {
    this.name = name;
    this.email = email;
    this.passwordHash = passwordHash;
    this.street = street;
    this.apartment = apartment;
    this.city = city;
    this.zipCode = zipCode;
    this.country = country;
    this.phone = phone;
    this.isAdmin = isAdmin;
    this._id = _id;
  }
}
