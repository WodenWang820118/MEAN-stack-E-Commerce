import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import config from './config/keys';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    console.log(config.mongoURI);
    return this.appService.getHello();
  }
}
