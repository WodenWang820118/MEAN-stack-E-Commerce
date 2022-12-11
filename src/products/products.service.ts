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

  async create(product: Product): Promise<Product> {
    const category = await this.categoriesService.findByName(
      product.category.name,
    );
    // console.log(`searching category ${product.category.name}`);
    // console.log(`return category: ${category}`);

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
