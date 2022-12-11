import { Product } from 'src/products/interfaces/product.interface';
import { OrderItem } from '../interfaces/order-item-interface';

export class CreateOrderItemDto implements OrderItem {
  readonly product: Product;
  readonly quantity: number;
}
