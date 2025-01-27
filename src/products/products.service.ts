import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ProductsService {
  private readonly managementApiUrl = 'http://localhost:8080/order/products';

  // Fetch all products
  async getAllProducts() {
    try {
      const response = await axios.get(`${this.managementApiUrl}`);
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch products from the management service',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // Fetch product by ID
  async getProductById(id: string) {
    try {
      const response = await axios.get(`${this.managementApiUrl}/${id}`);
      return response.data;
    } catch (error) {
      throw new HttpException(
        `Failed to fetch product with ID ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async deleteProductById(id: string) {
    try {
      const response = await axios.delete(`${this.managementApiUrl}/${id}`);
      return response.data;
    } catch (error) {
      throw new HttpException(
        `Failed to delete product with ID ${id}`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async addProduct(product: { name: string; description: string; price: number }) {
    try {
      const response = await axios.post(`${this.managementApiUrl}`, product);
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Failed to add product to the management service',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
