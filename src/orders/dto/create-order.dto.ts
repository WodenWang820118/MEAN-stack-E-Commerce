import { OrderItem } from 'src/order-item/interfaces/order-item-interface';
import { User } from 'src/users/interfaces/user.interface';

export class CreateOrderDto {
  readonly _id?: string;
  readonly orderItems: OrderItem[];
  readonly shippingAddress1: string;
  readonly shippingAddress2: string;
  readonly city: string;
  readonly zip: string;
  readonly country: string;
  readonly phone: number;
  readonly status: string;
  readonly totalPrice: number;
  readonly user: User;
  readonly dateOrdered: Date;
}
