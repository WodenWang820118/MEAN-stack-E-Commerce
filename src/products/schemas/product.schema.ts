import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CategorySchema } from '../../categories/schemas/category.schema';
import { Category } from '../../categories/schemas/category.schema';

@Schema()
export class Product {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  richDescription: string;

  @Prop()
  imageUrl: string;

  @Prop()
  imageUrls: string[];

  @Prop()
  brand: string;

  @Prop()
  price: number;

  @Prop({ type: [CategorySchema] })
  category: Category;

  @Prop()
  countInStock: number;

  @Prop()
  rating: number;

  @Prop()
  numReviews: number;

  @Prop()
  isFeatured: boolean;

  @Prop()
  dateCreated: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
