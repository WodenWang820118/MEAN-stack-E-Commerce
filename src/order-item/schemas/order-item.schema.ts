import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Product } from '../../products/interfaces/product.interface';
import { ProductSchema } from '../../products/schemas/product.schema';

@Schema()
export class OrderItem {
  @Prop({ type: [ProductSchema] })
  product: Product;

  @Prop()
  quantity: number;
}

export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);
