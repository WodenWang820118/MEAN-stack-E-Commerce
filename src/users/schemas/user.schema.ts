import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  passwordHash: string;

  @Prop()
  street: string;

  @Prop()
  apartment: string;

  @Prop()
  city: string;

  @Prop()
  zipCode: string;

  @Prop()
  country: string;

  @Prop()
  phone: string;

  @Prop()
  isAdmin: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
