'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import ShopHeader from '@/components/ShopHeader';
import FilterSidebar from '@/components/FilterSidebar';
import { Product } from '@/types/product';
import Pagination from '@/components/Pagination';

interface ProductsContentProps {
  initialProducts: Product[];
  categories: string[];
  // onChangeSort?: (sort: 'asc' | 'desc') => string;
}

export default function ProductsContent({ initialProducts, categories }: ProductsContentProps) {

  const searchParams = useSearchParams();
  const sort = searchParams.get('sort') || 'asc';
  const searchQuery = searchParams.get('search') || '';
  const limit = 8;

  const router = useRouter();

  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [category, setCategory] = useState<string>('');
  const [productQuery, setProductQuery] = useState<string>(searchQuery);
  const [page, setPage] = useState<number>(1);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts);

  useEffect(() => {
    setProductQuery(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    handleFilterProducts()
  }, [category, priceRange, initialProducts, productQuery]);

  const handleFilterProducts = () => {
    const newFilteredProducts = initialProducts.filter(
      (product) => {
        const priceCondition = product.price >= priceRange[0] && product.price <= priceRange[1];
        const categoryCondition = category && category.length > 0 ? (product.category === category) : true;
        const searchCondition = productQuery && productQuery.length > 0 ? (product.title.toLowerCase().includes(productQuery.toLowerCase())) : true;
        return priceCondition && categoryCondition && searchCondition;
      }
    );
    setFilteredProducts(newFilteredProducts);
  };

  const paginatedProducts = filteredProducts.slice((page - 1) * limit, page * limit);

  const handleSortChange = (newSort: 'asc' | 'desc') => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', newSort);
    setPage(1)
    router.push(`?${params.toString()}`);
  };

  const handleCategoryChange = (category: string) => setCategory(category);

  const handlePageChange = (newPage: number) => setPage(newPage);

  const handleClearFilters = () => {
    setPriceRange([0, 1000]);
    handleCategoryChange('');
  }

  const handleSearch = (search: string) => {
    handleClearFilters();
    setProductQuery(search);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ShopHeader onSearch={handleSearch}/>
      <main className="px-4 sm:px-6 py-8 sm:py-12 max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">Best Products of the week</h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            Discover our most popular products for you.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">

          {/* Left Sidebar - Filters */}
          <FilterSidebar
            category={category}
            onCategoryChange={handleCategoryChange}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
            onClearFilters={handleClearFilters}
            sort={sort as 'asc' | 'desc'}
            onSortChange={handleSortChange}
            layout={layout}
            onLayoutChange={setLayout}
            categories={categories}
          />

          {/* Right Side - Products */}


          <div className="flex-1 min-w-0">

          {
            productQuery && (
              <div className="mb-4">
                <p className="text-base font-semibold text-gray-700"> {productQuery}</p>
                <p className="text-sm text-gray-600"> {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found for "{productQuery}"</p>
              </div>
            )
          }
            {layout === 'grid' ? (
              <div
              className="flex gap-4 justify-center flex-wrap">
              {/* className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3  lg:grid-cols-3 xl:grid-cols-4 gap-4"> */}
                {paginatedProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} layout="grid" priority={index < 4} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} layout="list" />
                ))}
              </div>
            )}

            <Pagination totalFilteredPages={Math.ceil(filteredProducts.length / limit)} page={page} handlePageChange={handlePageChange} />

          </div>
        </div>
      </main>
    </div>
  );
}
