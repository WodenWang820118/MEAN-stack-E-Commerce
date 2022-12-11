import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderItem } from './interfaces/order-item-interface';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectModel('OrderItem') private readonly orderItemModel: Model<OrderItem>,
  ) {}

  async findAll(): Promise<OrderItem[]> {
    return await this.orderItemModel.find();
  }

  async create(orderItem: OrderItem): Promise<OrderItem> {
    const newOrderItem = new this.orderItemModel(orderItem);
    return await newOrderItem.save();
  }
}
