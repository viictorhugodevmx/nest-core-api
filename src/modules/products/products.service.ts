import { Injectable } from '@nestjs/common';

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  active: boolean;
}

@Injectable()
export class ProductsService {
  private readonly products: Product[] = [
    {
      id: 1,
      name: 'Mechanical Keyboard',
      category: 'accessories',
      price: 1899,
      active: true
    },
    {
      id: 2,
      name: 'Ultrawide Monitor',
      category: 'displays',
      price: 8999,
      active: true
    },
    {
      id: 3,
      name: 'USB-C Dock',
      category: 'accessories',
      price: 2499,
      active: false
    }
  ];

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number): Product | undefined {
    return this.products.find(
      (product) => product.id === id
    );
  }
}
