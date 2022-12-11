import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderItem } from './interfaces/order-item-interface';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectModel('Order') private readonly orderModel: Model<OrderItem>,
  ) {}

  async findAll(): Promise<OrderItem[]> {
    return await this.orderModel.find();
  }

  async create(orderItem: OrderItem): Promise<OrderItem> {
    const newOrderItem = new this.orderModel(orderItem);
    return await newOrderItem.save();
  }
}
