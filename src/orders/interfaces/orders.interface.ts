import { OrderItem } from 'src/order-item/interfaces/order-item-interface';
import { User } from 'src/users/interfaces/user.interface';

export interface Order {
  _id?: string;
  orderItems: OrderItem[];
  shippingAddress1: string;
  shippingAddress2: string;
  city: string;
  zip: string;
  country: string;
  phone: number;
  status: string;
  totalPrice: number;
  user: User;
  dateOrdered: Date;
}
