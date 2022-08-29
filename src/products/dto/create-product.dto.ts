import { Category } from '../../categories/interfaces/category.interface';

export class CreateProductDto {
  readonly name: string;
  readonly description: string;
  readonly richDescription?: string;
  readonly imageUrl: string;
  readonly imageUrls: string[];
  readonly brand: string;
  readonly price: number;
  readonly category: Category;
  readonly countInStock: number;
  readonly rating: number;
  readonly numReviews: number;
  readonly isFeatured: boolean;
  readonly dateCreated: Date;
}
