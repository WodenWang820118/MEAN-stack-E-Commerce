import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ProductsModule } from '../products/products.module';
import { OrderItemController } from './order-item.controller';
import { OrderItemService } from './order-item.service';
import { OrderItemSchema } from './schemas/order-item.schema';

@Module({
  imports: [
    ProductsModule,
    MongooseModule.forFeature([{ name: 'OrderItem', schema: OrderItemSchema }]),
  ],
  controllers: [OrderItemController],
  providers: [OrderItemService],
})
export class OrderItemModule {}
