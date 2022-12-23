import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { OrderItem } from '../../order-item/interfaces/order-item-interface';
import { OrderItemSchema } from '../../order-item/schemas/order-item.schema';
import { User } from '../../users/interfaces/user.interface';
import { UserSchema } from '../../users/schemas/user.schema';

@Schema()
export class Order {
  @Prop({ type: [OrderItemSchema] })
  orderItems: OrderItem[];

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

  @Prop({ type: [UserSchema] })
  user: User;

  @Prop()
  dateOrdered: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
