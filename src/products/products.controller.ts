import { Controller, Get, Param, Query, HttpException, HttpStatus } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // Optimized endpoint to fetch all products
  @Get()
  async getAllProducts() {
    return await this.productsService.getAllProducts();
  }

  // Optimized endpoint to fetch a single product by ID with basic validation
  @Get(':id')
  async getProductById(@Param('id') id: string) {
    if (!id) {
      throw new HttpException('Product ID is required', HttpStatus.BAD_REQUEST);
    }

    return await this.productsService.getProductById(id);
  }
}
