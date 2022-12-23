import { Category } from '../../categories/interfaces/category.interface';

// make sure properties are in the same order as in the DTO class for testing purposes
export interface Product {
  name: string;
  description: string;
  richDescription?: string;
  imageUrl: string;
  imageUrls?: string[];
  brand: string;
  price: number;
  category: Category;
  countInStock: number;
  rating: number;
  numReviews: number;
  isFeatured: boolean;
  dateCreated: Date;
  _id?: string;
}
