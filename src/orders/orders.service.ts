import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './interfaces/orders.interface';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel('Order') private readonly orderModel: Model<Order>,
  ) {}

  async findAll(): Promise<Order[]> {
    return await this.orderModel.find();
  }

  async findOne(id: string): Promise<Order> {
    return await this.orderModel.findOne({ _id: id });
  }

  async create(order: Order): Promise<Order> {
    const newOrder = new this.orderModel(order);
    return await newOrder.save();
  }

  async update(id: string, order: Order): Promise<Order> {
    return await this.orderModel.findByIdAndUpdate(id, order, {
      new: true,
    });
  }

  async delete(id: string): Promise<Order> {
    return await this.orderModel.findByIdAndRemove(id);
  }

  // TODO: getTotalPrice
}
