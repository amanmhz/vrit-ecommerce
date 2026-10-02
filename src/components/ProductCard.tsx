'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '@/types/product';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { addToCart as addToCartAction } from '@/store/slices/cartSlice';
import { showToast } from '@/store/slices/toastSlice';
import { RootState } from '@/store/store';

interface ProductCardProps {
  product: Product;
  layout?: 'grid' | 'list';
  priority?: boolean;
}

export default function ProductCard({ product, layout = 'grid', priority = false }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    dispatch(addToCartAction({ product, quantity }));
    dispatch(showToast({ message: 'Added to cart', type: 'success' }));
    setQuantity(1);
  };

  if (layout === 'list') {
    return (
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-white border border-gray-100 rounded-md hover:shadow-sm transition-shadow w-full overflow-hidden">
        <Link href={`/product/${product.id}`} className="flex-shrink-0">
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 overflow-hidden">
            <Image
              src={product.image}
              alt={product.title}
              fill
              sizes="96px"
              priority={priority}
              className="object-contain rounded transition-transform duration-300 hover:scale-110"
            />
          </div>
        </Link>
        <div className="flex-1 min-w-0 w-full">
          <Link href={`/product/${product.id}`}>
            <h3 className="text-sm sm:text-base font-semibold text-gray-900 truncate hover:text-gray-600">
              {product.title}
            </h3>
          </Link>
          <p className="text-xs text-gray-500 uppercase">{product.category}</p>
          <div className="flex items-center gap-1 text-yellow-500 mt-1">
            <span className="text-xs">★</span>
            <span className="text-xs font-semibold">{product.rating.rate}</span>
            <span className="text-xs text-gray-400">({product.rating.count})</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto flex-shrink-0">
          <div className="text-left sm:text-right">
            <p className="font-bold text-sm sm:text-base text-gray-600">Rs. {product.price.toFixed(2)}</p>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <div className="flex items-center border border-gray-300 rounded flex-shrink-0">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="cursor-pointer px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
              >
                -
              </button>
              <span className="text-gray-600 px-2 py-1 text-sm">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className=" cursor-pointer px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="cursor-pointer px-3 py-2 bg-gray-900 text-white text-xs rounded-md hover:bg-gray-800 transition-colors whitespace-nowrap flex-shrink-0"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-52 bg-white border border-gray-100 rounded-md overflow-hidden hover:shadow-sm transition-shadow flex flex-col">
      <Link href={`/product/${product.id}`}>
        <div className="relative w-full h-64 bg-gray-100 overflow-hidden flex-shrink-0">
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority}
            className="object-contain p-4 transition-transform duration-300 hover:scale-110"
          />
        </div>
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <Link href={`/product/${product.id}`}>
          <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2 hover:text-gray-600">
            {product.title}
          </h3>
        </Link>
        <p className="text-xs text-gray-500 uppercase mb-2">{product.category}</p>
        <div className="flex items-center gap-4 justify-between items-center text-yellow-500 mb-2">
          <div className="flex items-center gap-2">
            <p className="font-bold text-sm text-gray-600">Rs. {product.price.toFixed(2)}</p>
          </div>
          <div className='flex items-center justify-center gap-1 text-yellow-500'>
            <span className="text-xs">★</span>
            <span className="text-xs font-semibold">{product.rating.rate}</span>
            <span className="text-xs text-gray-400">({product.rating.count})</span>
          </div>
        </div>
        <div className="mt-auto pt-4">
          <div className="flex justify-between gap-2">
            <div className="flex items-center border border-gray-300 rounded">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="cursor-pointer px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors text-xs"
              >
                -
              </button>
              <span className="px-3 text-gray-600 text-xs">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="cursor-pointer px-2 py-1 text-gray-600 hover:bg-gray-100 transition-colors text-xs"
              >
                +
              </button>
            </div>
            {/* <button
              onClick={handleAddToCart}
              className="px-2.5 py-1  text-gray-600 text-xs rounded-md hover:text-gray-900 transition-colors cursor-pointer"
            >
              Add to Cart
            </button> */}
             <button
              onClick={handleAddToCart}
              className="cursor-pointer px-3 py-1 bg-gray-900 text-white text-xs rounded-md hover:bg-gray-800 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
