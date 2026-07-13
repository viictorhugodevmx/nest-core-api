import {
  Controller,
  Get,
  Param
} from '@nestjs/common';

import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService
  ) {}

  @Get()
  findAll() {
    return {
      data: this.productsService.findAll()
    };
  }

  @Get(':id')
  findOne(
    @Param('id') id: string
  ) {
    return {
      data: this.productsService.findOne(
        Number(id)
      )
    };
  }
}
