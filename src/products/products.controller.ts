import { Controller, Get, Param, Query, HttpException, HttpStatus, Delete, Post, Body, UsePipes, ValidationPipe  } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';

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

  @Delete(':id')
  async deleteProductById(id: string) {
    if (!id) {
        throw new HttpException('Product ID is required', HttpStatus.BAD_REQUEST);
      }
  
      return await this.productsService.deleteProductById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async addProduct(@Body() product: CreateProductDto) {
    return await this.productsService.addProduct(product);
  }

}
