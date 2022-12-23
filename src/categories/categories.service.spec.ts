import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { CategoriesService } from './categories.service';
import { Category } from './interfaces/category.interface';

const categoryDoc1 = {
  name: 'category 1',
  color: 'red',
  icon: 'icon1',
};

const categoryDoc2 = {
  name: 'category 2',
  color: 'blue',
  icon: 'icon2',
};

const categoryDoc1WithId = {
  _id: '1',
  name: 'category 1',
  color: 'red',
  icon: 'icon1',
};

const categoryDocArray = [categoryDoc1, categoryDoc2];

describe('CategoriesService', () => {
  let service: CategoriesService;
  let categoryModel: Model<Category>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: getModelToken('Category'),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            save: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findByIdAndRemove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
    categoryModel = module.get<Model<Category>>(getModelToken('Category'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an array of categories', async () => {
    jest.spyOn(categoryModel, 'find').mockResolvedValueOnce(categoryDocArray);

    expect(await service.findAll()).toBe(categoryDocArray);
  });

  it('should return a category by id', async () => {
    jest.spyOn(categoryModel, 'findOne').mockResolvedValueOnce(categoryDoc1);

    expect(await service.findOne('1')).toBe(categoryDoc1);
  });

  it('should return a category by name', async () => {
    jest.spyOn(categoryModel, 'findOne').mockResolvedValueOnce(categoryDoc1);

    expect(await service.findByName('category 1')).toBe(categoryDoc1);
  });

  it('should create a category', async () => {
    jest.spyOn(service, 'create').mockResolvedValueOnce(categoryDoc1WithId);

    expect(await service.create(categoryDoc1)).toBe(categoryDoc1WithId);
  });

  it('should update a category', async () => {
    jest.spyOn(service, 'update').mockResolvedValueOnce(categoryDoc1WithId);

    expect(await service.update('1', categoryDoc1)).toBe(categoryDoc1WithId);
  });

  it('should delete a category', async () => {
    jest.spyOn(service, 'delete').mockResolvedValueOnce(categoryDoc1WithId);

    expect(await service.delete('1')).toBe(categoryDoc1WithId);
  });
});
