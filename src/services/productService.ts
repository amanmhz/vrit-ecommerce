import { apiFetch } from './api';
import { Product, ProductFilters} from '@/types/product';

export async function getProducts(filters?: ProductFilters): Promise<Product[]> {
  const params = new URLSearchParams();
  
  if (filters?.sort) {
    params.append('sort', filters.sort);
  }
  // if (filters?.category) {
  //   params.append('category', filters.category);
  // }

  const endpoint = params.toString() ? `/products?${params.toString()}` : '/products';
  return apiFetch(endpoint);
}

export async function getProductById(id: number): Promise<Product> {
  return apiFetch(`/products/${encodeURIComponent(id)}`);
}

export async function getProductCategory(): Promise<string[]> {
  return apiFetch(`/products/categories`);
}
