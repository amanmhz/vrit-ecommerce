'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import ShopHeader from '@/components/ShopHeader';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addToCart as addToCartAction } from '@/store/slices/cartSlice';
import { showToast } from '@/store/slices/toastSlice';
import { Product } from '@/types/product';
import { RootState } from '@/store/store';

interface ProductDetailContentProps {
  product: Product;
}

export default function ProductDetailContent({ product }: ProductDetailContentProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);
  const [quantity, setQuantity] = useState(1);

  const handleSearch = (searchQuery: string) => {
    router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
  };

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    dispatch(addToCartAction({ product, quantity }));
    dispatch(showToast({ message: 'Added to cart', type: 'success' }));
    setQuantity(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ShopHeader onSearch={handleSearch} />
      <main className="container mx-auto px-6 py-12">
        <div className="mb-6">
          <Link
            href="/products"
            className="text-gray-600 hover:text-gray-900 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Products
          </Link>
        </div>

        <div className="p-8">
          {/* Breadcrumb */}
          <div className="pb-4 flex items-center gap-2 text-sm text-gray-500">
            <Link href="/products" className="hover:text-gray-900 capitalize">
              Products
            </Link>
            <span className="text-gray-400">{'>'}</span>
            <div className="hover:text-gray-900 capitalize">
              {product.category}
            </div>
            <span className="text-gray-400">{'>'}</span>
            <span className="text-gray-900 line-clamp-1">{product.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="relative w-full h-auto bg-gray-200 rounded-md">
              <Image
                src={product.image}
                alt={product.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain p-8"
              />
            </div>

            <div>
              <div className="mb-4">
                <span className="text-sm text-gray-500 uppercase">{product.category}</span>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.title}</h1>

              <div className="flex items-center gap-4 mb-6">
                <p className="text-xl font-bold text-gray-900">Rs. {product.price.toFixed(2)}</p>
                <div className="flex items-center gap-1 text-yellow-500">
                  <span className="text-xl">★</span>
                  <span className="text-xl font-semibold">{product.rating.rate}</span>
                  <span className="text-gray-500 text-sm">({product.rating.count} reviews)</span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-base font-semibold text-gray-900 mb-2">Overview</h3>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-base font-semibold text-gray-900 mb-2">Product Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">SKU:</span>
                    <span className="text-gray-900">{product.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Category:</span>
                    <span className="text-gray-900 capitalize">{product.category}</span>
                  </div>
                </div>
              </div>

              <div className="mb-6 flex gap-4 justify-between">
                {/* <h3 className="text-base font-semibold text-gray-900 mb-2">Quantity</h3> */}
                <div className="text-gray-600 flex items-center gap-2 w-fit">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="cursor-pointer w-10 h-10 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="cursor-pointer w-10 h-10 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>


                </div>
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-gray-900 text-white px-6 py-2 rounded-md font-medium hover:bg-gray-800 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
