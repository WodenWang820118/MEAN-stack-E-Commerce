import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { Category } from './interfaces/category.interface';

const categoryDto: Category = {
  name: 'category 1',
  color: 'red',
  icon: 'icon1',
};

const updatedDto: Category = {
  name: 'updated category',
  color: 'red',
  icon: 'icon1',
};

describe('CategoriesController', () => {
  let controller: CategoriesController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        {
          provide: CategoriesService,
          useValue: {
            findAll: jest.fn().mockReturnValue(
              new Promise<Category[]>((resolve) => {
                resolve([
                  { ...categoryDto, _id: '1' },
                  { ...categoryDto, _id: '2' },
                ]);
              }),
            ),
            findOne: jest.fn().mockReturnValue(
              new Promise<Category>((resolve) => {
                resolve({ ...categoryDto, _id: '1' });
              }),
            ),
            create: jest.fn().mockReturnValue(
              new Promise<Category>((resolve) => {
                resolve({ ...categoryDto, _id: '1' });
              }),
            ),
            update: jest.fn().mockReturnValue(
              new Promise<Category>((resolve) => {
                resolve({ ...updatedDto, _id: '1' });
              }),
            ),
            delete: jest.fn().mockReturnValue(
              new Promise<Category>((resolve) => {
                resolve({ ...categoryDto, _id: '1' });
              }),
            ),
          },
        },
      ],
    }).compile();

    controller = module.get<CategoriesController>(CategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return an array of categories', async () => {
    const categories = await controller.findAll();
    expect(categories).toEqual([
      { ...categoryDto, _id: '1' },
      { ...categoryDto, _id: '2' },
    ]);
  });

  it('should return a category', async () => {
    const category = await controller.findOne('1');
    expect(category).toEqual({ ...categoryDto, _id: '1' });
  });

  it('should create a category', async () => {
    const category = await controller.create(categoryDto);
    expect(category).toEqual({ ...categoryDto, _id: '1' });
  });

  it('should update a category', async () => {
    const category = await controller.update('1', categoryDto);
    expect(category).toEqual({ ...updatedDto, _id: '1' });
  });

  it('should delete a category', async () => {
    const category = await controller.delete('1');
    expect(category).toEqual({ ...categoryDto, _id: '1' });
  });
});
