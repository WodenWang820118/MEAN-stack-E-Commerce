import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { OrderItem } from 'src/order-item/interfaces/order-item-interface';
import { User } from 'src/users/interfaces/user.interface';

@Schema()
export class Order {
  @Prop()
  orderItem: OrderItem[];

  @Prop()
  shippingAddress1: string;

  @Prop()
  shippingAddress2: string;

  @Prop()
  city: string;

  @Prop()
  zip: string;

  @Prop()
  country: string;

  @Prop()
  phone: string;

  @Prop()
  status: string;

  @Prop()
  totalPrice: number;

  @Prop()
  user: User;

  @Prop()
  dateOrdered: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
