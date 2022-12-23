import { CreateOrderItemDto } from './../order-item/dto/create-order-item.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { CreateProductDto } from '../products/dto/create-product.dto';
import { UserDto } from '../users/dto/create-user.dto';
import { User } from '../users/interfaces/user.interface';
import { OrderItem } from '../order-item/interfaces/order-item-interface';
import { Product } from '../products/interfaces/product.interface';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';
import { Order } from './interfaces/orders.interface';

const productDto: Product = new CreateProductDto(
  'product 1',
  'hello',
  'more hello',
  'assets/sample.png',
  ['assets/sample.png'],
  'benz',
  200000,
  {
    name: 'category 1',
    color: 'red',
    icon: 'icon1',
  },
  2,
  3,
  4512,
  true,
  new Date(),
);

const product: Product = {
  ...productDto,
  _id: '1',
};

const orderItem1: OrderItem = new CreateOrderItemDto(product, 2);

const orderItems: OrderItem[] = [
  {
    ...orderItem1,
    _id: '1',
  },
  {
    ...orderItem1,
    _id: '2',
  },
];

const user: User = new UserDto(
  'John Doe',
  'test123@gmail.com',
  'testPassword',
  'testStreet',
  'testApartment',
  'testCity',
  'testZip',
  'testCountry',
  'testPhone',
  false,
);

const user1 = {
  ...user,
  _id: '1',
};

const order1: Order = new CreateOrderDto(
  orderItems,
  'shippingAddress1',
  'shippingAddress2',
  'city',
  'zip',
  'country',
  '1234567890',
  'status',
  200000,
  user1,
  new Date(),
);

describe('OrdersController', () => {
  let controller: OrdersController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        {
          provide: OrdersService,
          useValue: {
            findAll: jest.fn().mockReturnValue(
              new Promise<Order[]>((resolve) => {
                resolve([
                  { ...order1, _id: '1' },
                  { ...order1, _id: '2' },
                ]);
              }),
            ),
            findOne: jest.fn().mockReturnValue(
              new Promise<Order>((resolve) => {
                resolve({ ...order1, _id: '1' });
              }),
            ),
            create: jest.fn().mockReturnValue(
              new Promise<Order>((resolve) => {
                resolve({ ...order1, _id: '1' });
              }),
            ),
            update: jest.fn().mockReturnValue(
              new Promise<Order>((resolve) => {
                resolve({ ...order1, _id: '1' });
              }),
            ),
            delete: jest.fn().mockReturnValue(
              new Promise<Order>((resolve) => {
                resolve({ ...order1, _id: '1' });
              }),
            ),
          },
        },
      ],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of orders', async () => {
      const result = await controller.findAll();
      expect(result).toEqual([
        { ...order1, _id: '1' },
        { ...order1, _id: '2' },
      ]);
    });
  });

  describe('create', () => {
    it('should return an order', async () => {
      const result = await controller.create(order1);
      expect(result).toEqual({ ...order1, _id: '1' });
    });
  });

  describe('findOne', () => {
    it('should return an order', async () => {
      const result = await controller.findOne('1');
      expect(result).toEqual({ ...order1, _id: '1' });
    });
  });

  describe('update', () => {
    it('should return an order', async () => {
      const result = await controller.update('1', order1);
      expect(result).toEqual({ ...order1, _id: '1' });
    });
  });

  describe('delete', () => {
    it('should return an order', async () => {
      const result = await controller.delete('1');
      expect(result).toEqual({ ...order1, _id: '1' });
    });
  });
});
