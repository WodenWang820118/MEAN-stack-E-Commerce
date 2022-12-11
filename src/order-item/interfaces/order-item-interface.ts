import { Product } from 'src/products/interfaces/product.interface';

export interface OrderItem {
  _id?: string;
  product: Product;
  quantity: number;
}
