import { getProductCategory, getProducts } from '@/services/productService';
import ProductsContent from './ProductsContent';
import { ProductFilters } from '@/types/product';

// Force dynamic rendering for search params
export const dynamic = 'force-dynamic';

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string }>;
}) {
  try {
    const params = await searchParams;
    const filters: ProductFilters = {
      sort: (params.sort as 'asc' | 'desc') || 'asc',
    };

    const products = await getProducts(filters);
    const categories = await getProductCategory();

    return <ProductsContent initialProducts={products} categories={categories} />;
  } catch (error) {
    console.error('Failed to load products:', error);

    return (
      <div className="min-h-screen bg-gray-50">
        <main className="container mx-auto p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Products</h1>
            <p className="text-gray-600 mt-1">
              Browse our collection of products
            </p>
          </div>
          <div className="bg-white rounded-md shadow-sm border border-gray-200 p-6">
            <p className="text-red-600">Products could not be loaded. Please try again later.</p>
          </div>
        </main>
      </div>
    );
  }
}
