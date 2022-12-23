import { Product } from './interfaces/product.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
    private categoriesService: CategoriesService,
  ) {}

  async findAll(): Promise<Product[]> {
    return await this.productModel.find();
  }

  async findOne(id: string): Promise<Product> {
    return await this.productModel.findOne({ _id: id });
  }

  // TODO: save the file as a blob in the database
  async create(product: Product): Promise<Product> {
    if (Object.keys(product).length === 0) return;
    const category = await this.categoriesService.findOne(product.category._id);

    if (!category) {
      throw new Error(`Category ${product.category._id} not found`);
    }

    const newProduct = new this.productModel(product);
    return await newProduct.save();
  }

  async update(id: string, product: Product): Promise<Product> {
    return await this.productModel.findByIdAndUpdate(id, product, {
      new: true,
    });
  }

  async delete(id: string): Promise<Product> {
    return await this.productModel.findByIdAndRemove(id);
  }
}
