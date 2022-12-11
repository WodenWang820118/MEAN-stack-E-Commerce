import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

// customed modules
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';

// configs
import config from './config/keys';

// middlewares
import { expressjwt } from 'express-jwt';

const exposedUrls = [
  '/users/login',
  { url: /\/products\/.*/, methods: ['GET', 'OPTIONS'] },
  { url: /\/categories\/.*/, methods: ['GET', 'OPTIONS'] },
];

function authJwt() {
  const secret = process.env.JWT_SECRET;
  return expressjwt({
    secret: secret,
    algorithms: ['HS256'],
    isRevoked: isRevokedCallback,
  }).unless({
    path: [...exposedUrls],
  });
}

async function isRevokedCallback(req: any, token: any) {
  const admin = token.payload.isAdmin;
  if (admin) {
    return true;
  }
  return false;
}

@Module({
  imports: [
    CategoriesModule,
    ProductsModule,
    MongooseModule.forRoot(config.mongoURI),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
// export class AppModule {}
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(authJwt()).forRoutes('*');
  }
}
