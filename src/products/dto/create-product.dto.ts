import { Category } from '../../categories/interfaces/category.interface';
import { Product } from '../interfaces/product.interface';

export class CreateProductDto implements Product {
  readonly name: string;
  readonly description: string;
  readonly richDescription?: string;
  readonly imageUrl: string;
  readonly imageUrls?: string[];
  readonly brand: string;
  readonly price: number;
  readonly category: Category;
  readonly countInStock: number;
  readonly rating: number;
  readonly numReviews: number;
  readonly isFeatured: boolean;
  readonly dateCreated: Date;
  readonly _id: string;

  // optional parameters are required to be last ones in the constructor
  constructor(
    name: string,
    description: string,
    richDescription: string,
    imageUrl: string,
    imageUrls: string[],
    brand: string,
    price: number,
    category: Category,
    countInStock: number,
    rating: number,
    numReviews: number,
    isFeatured: boolean,
    dateCreated: Date,
    _id?: string,
  ) {
    this.name = name;
    this.description = description;
    this.richDescription = richDescription;
    this.imageUrl = imageUrl;
    this.imageUrls = imageUrls;
    this.brand = brand;
    this.price = price;
    this.category = category;
    this.countInStock = countInStock;
    this.rating = rating;
    this.numReviews = numReviews;
    this.isFeatured = isFeatured;
    this.dateCreated = dateCreated;
    this._id = _id;
  }
}
