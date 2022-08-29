import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './interfaces/category.interface';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return await this.categoryModel.find();
  }

  async findOne(id: string): Promise<Category> {
    return await this.categoryModel.findOne({ _id: id });
  }

  async findByName(name: string): Promise<Category> {
    return await this.categoryModel.findOne({ name });
  }

  async create(category: Category): Promise<Category> {
    const newCategory = new this.categoryModel(category);
    return await newCategory.save();
  }

  async update(id: string, category: Category): Promise<Category> {
    return await this.categoryModel.findByIdAndUpdate(id, category, {
      new: true,
    });
  }

  async delete(id: string): Promise<Category> {
    return await this.categoryModel.findByIdAndRemove(id);
  }
}
