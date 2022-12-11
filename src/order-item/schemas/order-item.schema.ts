import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Product } from 'src/products/interfaces/product.interface';

@Schema()
export class OrderItem {
  @Prop()
  product: Product;

  @Prop()
  quantity: number;
}

export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);
