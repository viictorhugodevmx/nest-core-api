import { Module } from '@nestjs/common';

import { StatusModule } from './modules/status/status.module';
import { ProductsModule } from './modules/products/products.module';

@Module({
  imports: [
    StatusModule,
    ProductsModule
  ]
})
export class AppModule {}
