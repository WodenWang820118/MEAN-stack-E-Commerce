import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

// customed modules
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';

// configs
import config from './config/keys';

@Module({
  imports: [
    CategoriesModule,
    ProductsModule,
    MongooseModule.forRoot(config.mongoURI),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
