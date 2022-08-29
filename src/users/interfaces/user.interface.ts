export interface User {
  id?: string;
  name: string;
  email: string;
  passwordHash: string;
  street: string;
  apartment: string;
  city: string;
  zipCode: string;
  country: string;
  phone: string;
  isAdmin: boolean;
}
