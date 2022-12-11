import { Product } from 'src/products/interfaces/product.interface';

export class CreateOrderItemDto {
  readonly product: Product;
  readonly quantity: number;
}
