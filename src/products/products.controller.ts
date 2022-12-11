import { CategoriesService } from './../categories/categories.service';
import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProductsService } from './products.service';

import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './interfaces/product.interface';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly categoriesService: CategoriesService,
  ) {}

  @Get()
  findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(id: string): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Post()
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productsService.create(createProductDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<Product> {
    return this.productsService.delete(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() createProductDto: CreateProductDto,
  ): Promise<Product> {
    return this.productsService.update(id, createProductDto);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  uploadFileAndPassValidation(
    @Body() body: CreateProductDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000 }),
          new FileTypeValidator({ fileType: /png|jpeg|jpg/g }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    console.log(file);
    // get the category from the product and look it up in the categories collection
    // TODO: test whether this works
    const catergory = this.categoriesService.findOne(body.category._id);
    if (!catergory) return 'Category not found'; // return status code 404
    if (!file) return 'No file uploaded'; // return status code 400
    const filename = file.filename;
    const basePath = 'http://localhost:3000/public/uploads/';
    const product: Product = {
      name: body.name,
      description: body.description,
      richDescription: body.richDescription,
      imageUrl: `${basePath}${filename}`,
      imageUrls: [`${basePath}${filename}`],
      brand: body.brand,
      price: body.price,
      category: body.category,
      countInStock: body.countInStock,
      rating: body.rating,
      numReviews: body.numReviews,
      isFeatured: body.isFeatured,
      dateCreated: body.dateCreated,
    };
    return this.productsService.create(product);
  }

  @Put('gallery-images/:id')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 10 }]))
  uploadFileAndPassValidationUpdate(
    @Param('id') id: string,
    @Body() body: CreateProductDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000 }),
          new FileTypeValidator({ fileType: /png|jpeg|jpg/g }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    console.log(file);
    // get the category from the product and look it up in the categories collection
  }
}
