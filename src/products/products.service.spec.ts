import { CreateProductDto } from './dto/create-product.dto';
import { CategoriesService } from './../categories/categories.service';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { Product } from './interfaces/product.interface';
import { Model } from 'mongoose';
import { Category } from 'src/categories/interfaces/category.interface';

const productDoc1 = new CreateProductDto(
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
  '1',
);

const productDoc2 = new CreateProductDto(
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
  '2',
);

const productDocArray = [productDoc1, productDoc2];

describe('ProductsService', () => {
  let service: ProductsService;
  let productModel: Model<Product>;
  let categoryModel: Model<Category>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // getModelToken to mock the MongoDB connection
      providers: [
        ProductsService,
        CategoriesService,
        {
          provide: getModelToken('Product'),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndRemove: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: getModelToken('Category'),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndRemove: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    productModel = module.get<Model<Product>>(getModelToken('Product'));
    categoryModel = module.get<Model<Category>>(getModelToken('Category'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all products', async () => {
    jest.spyOn(productModel, 'find').mockResolvedValueOnce(productDocArray);
    const result = await service.findAll();
    expect(result).toEqual(productDocArray);
  });

  it('should return one product with id', async () => {
    jest.spyOn(productModel, 'findOne').mockResolvedValueOnce(productDoc1);
    const result = await service.findOne('1');
    expect(result).toEqual(productDoc1);
  });

  it('should create a proudct with existing category', async () => {
    const productDocWithId = {
      ...productDoc1,
      _id: '1',
    };

    jest.spyOn(service, 'create').mockResolvedValueOnce(productDocWithId);

    const result = await service.create(productDoc1);
    expect(result).toEqual(productDocWithId);
  });

  it('should update a proudct with a new name', async () => {
    const updateName = 'updated product';
    const id = '1';
    const updatedProduct = {
      ...productDoc1,
      name: updateName,
      _id: id,
    };

    const productDocWithId = {
      ...productDoc1,
      _id: id,
    };

    jest.spyOn(service, 'update').mockResolvedValueOnce(updatedProduct);

    const result = await service.update(id, productDocWithId);
    expect(result).toEqual(updatedProduct);
  });

  it('should delete a proudct with id', async () => {
    const id = '1';
    const deletedProduct = {
      ...productDoc1,
      _id: id,
    };

    jest.spyOn(service, 'delete').mockResolvedValueOnce(deletedProduct);

    const result = await service.delete(id);
    expect(result).toEqual(deletedProduct);
  });
});
