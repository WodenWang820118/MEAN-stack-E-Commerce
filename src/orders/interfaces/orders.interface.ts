import { OrderItem } from 'src/order-item/interfaces/order-item-interface';
import { User } from 'src/users/interfaces/user.interface';

export interface Order {
  orderItems: OrderItem[];
  shippingAddress1: string;
  shippingAddress2: string;
  city: string;
  zip: string;
  country: string;
  phone: string;
  status: string;
  totalPrice: number;
  user: User;
  dateOrdered: Date;
  _id?: string;
}
