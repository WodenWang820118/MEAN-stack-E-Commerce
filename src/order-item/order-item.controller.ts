import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { OrderItem } from './interfaces/order-item-interface';
import { CreateOrderItemDto } from './dto/create-order-item.dto';

@Controller('order-item')
export class OrderItemController {
  constructor(readonly orderItemService: OrderItemService) {}

  @Get()
  findAll(): Promise<OrderItem[]> {
    return this.orderItemService.findAll();
  }

  @Post()
  create(@Body() createOrderItemDto: CreateOrderItemDto): Promise<OrderItem> {
    return this.orderItemService.create(createOrderItemDto);
  }

  // TODO: update order item quantity (plus and minus)
  // TODO: remove order item
}
