export class UserDto {
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
}
