import { Product } from 'src/products/interfaces/product.interface';
import { OrderItem } from '../interfaces/order-item-interface';

export class CreateOrderItemDto implements OrderItem {
  readonly product: Product;
  readonly quantity: number;
  readonly _id?: string;

  constructor(product: Product, quantity: number, _id?: string) {
    this.product = product;
    this.quantity = quantity;
    this._id = _id;
  }
}
