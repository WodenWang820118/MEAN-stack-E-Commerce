import { Category } from '../interfaces/category.interface';

export class CreateCategoryDto implements Category {
  readonly name: string;
  readonly color: string;
  readonly icon: string;
}
