import { Test, TestingModule } from '@nestjs/testing';
import { Product } from './interfaces/product.interface';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CategoriesService } from '../categories/categories.service';
import { CreateProductDto } from './dto/create-product.dto';

const productDto = new CreateProductDto(
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

const updatedProductDto = new CreateProductDto(
  'updated product',
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

describe('Controller', () => {
  let controller: ProductsController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: {
            findAll: jest.fn().mockReturnValue(
              new Promise<Product[]>((resolve) => {
                resolve([
                  { ...productDto, _id: '1' },
                  { ...productDto, _id: '2' },
                ]);
              }),
            ),
            findOne: jest.fn().mockReturnValue(
              // mongodb returns an object with an _id property
              // the original property name _id (undefined) will be overwritten by the new _id property
              new Promise<Product>((resolve) => {
                resolve({
                  ...productDto,
                  _id: '1',
                });
              }),
            ),
            // create a product and return the product with the _id property
            create: jest.fn().mockReturnValue(
              new Promise<Product>((resolve) => {
                resolve({
                  ...productDto,
                  _id: '1',
                });
              }),
            ),
            update: jest.fn().mockReturnValue(
              new Promise<Product>((resolve) => {
                resolve({
                  ...updatedProductDto,
                  _id: '1',
                });
              }),
            ),
            delete: jest.fn().mockReturnValue(
              new Promise<Product>((resolve) => {
                resolve({
                  ...productDto,
                  _id: '1',
                });
              }),
            ),
          },
        },
        {
          provide: CategoriesService,
          useValue: {
            findByName: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });
  /**
   * The tests are simple since the controller is just a wrapper around the service.
   * It acts as a facade to execute service commands and return the correct data to the client,
   * so essentially tests here are ensuring the right data with the correct type is returned.
   * For example, finding a product with the _id 1 should return a product with the _id 1, etc.
   */
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of products', () => {
    // the controller expects to return the type of Promise<Product[]>
    const result = controller.findAll();
    expect(result).resolves.toEqual([
      {
        ...productDto,
        _id: '1',
      },
      {
        ...productDto,
        _id: '2',
      },
    ]);
  });

  it('should find a product with the _id equals 1', () => {
    const resultPromise = controller.findOne('1');
    // console.log(resultPromise);
    expect(resultPromise).resolves.toEqual({
      ...productDto,
      _id: '1',
    });
  });

  it('should create a product with _id equals 1', () => {
    const productPromise = controller.create(productDto);
    expect(productPromise).resolves.toEqual({
      ...productDto,
      _id: '1',
    });
  });

  it('should update a product', () => {
    const updateProductPromise = controller.update('1', updatedProductDto);
    expect(updateProductPromise).resolves.toEqual({
      ...updatedProductDto,
      _id: '1',
    });
  });

  it('should delete a product', () => {
    const deletedProdcutPromise = controller.delete('1');
    expect(deletedProdcutPromise).resolves.toEqual({
      ...productDto,
      _id: '1',
    });
  });
});
