import { OrderItem } from 'src/order-item/interfaces/order-item-interface';
import { User } from 'src/users/interfaces/user.interface';
import { Order } from '../interfaces/orders.interface';

export class CreateOrderDto implements Order {
  readonly orderItems: OrderItem[];
  readonly shippingAddress1: string;
  readonly shippingAddress2: string;
  readonly city: string;
  readonly zip: string;
  readonly country: string;
  readonly phone: string;
  readonly status: string;
  readonly totalPrice: number;
  readonly user: User;
  readonly dateOrdered: Date;
  readonly _id?: string;

  constructor(
    orderItems: OrderItem[],
    shippingAddress1: string,
    shippingAddress2: string,
    city: string,
    zip: string,
    country: string,
    phone: string,
    status: string,
    totalPrice: number,
    user: User,
    dateOrdered: Date,
    _id?: string,
  ) {
    this.orderItems = orderItems;
    this.shippingAddress1 = shippingAddress1;
    this.shippingAddress2 = shippingAddress2;
    this.city = city;
    this.zip = zip;
    this.country = country;
    this.phone = phone;
    this.status = status;
    this.totalPrice = totalPrice;
    this.user = user;
    this.dateOrdered = dateOrdered;
    this._id = _id;
  }
}
