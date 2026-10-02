'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { removeFromCart, updateQuantity, clearCart } from '@/store/slices/cartSlice';
import { showToast } from '@/store/slices/toastSlice';
import ShopHeader from '@/components/ShopHeader';
import { RootState } from '@/store/store';
import { Product } from '@/types/product';

export default function CartPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isMounted, setIsMounted] = useState(false);
  const { items, total } = useAppSelector((state: RootState) => state.cart);
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isMounted, router]);

  if (!isMounted || !isAuthenticated) {
    return null;
  }

  const handleSearch = (searchQuery: string) => {
    router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
  };

  const handleRemoveFromCart = (productId: number) => {
    dispatch(removeFromCart(productId));
    dispatch(showToast({ message: 'Item removed from cart', type: 'success' }));
  };

  const handleUpdateQuantity = (productId: number, quantity: number) => {
    dispatch(updateQuantity({ productId, quantity }));
    dispatch(showToast({ message: 'Quantity updated', type: 'success' }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    dispatch(showToast({ message: 'Cart cleared', type: 'success' }));
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <ShopHeader onSearch={handleSearch} />
        <div className="container mx-auto px-4 sm:px-6 py-12">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>
          <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 text-center">
            <p className="text-gray-600 mb-4">Your cart is empty</p>
            <Link
              href="/products"
              className="inline-block px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const shipping = total > 0 ? 10 : 0;
  const tax = total * 0.08;
  const orderTotal = total + shipping + tax;

  return (
    <div className="min-h-screen bg-gray-50">
      <ShopHeader onSearch={handleSearch} />
      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-7xl">
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">My Cart</h1>
          <Link
            href="/products"
            className="text-gray-900 hover:text-gray-700 font-medium transition-colors text-sm sm:text-base"
          >
            Continue Shopping
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          <div className="flex-1">
            <div className="space-y-4">
              {items.map((item: Product & { quantity: number }) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg p-4 sm:p-6 shadow-sm"
                >
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                    <Link href={`/product/${item.id}`} className="flex-shrink-0">
                      <div className="relative w-24 h-24 sm:w-32 sm:h-32 overflow-hidden bg-gray-100 rounded-md">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="128px"
                          className="object-contain p-4"
                        />
                      </div>
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link href={`/product/${item.id}`}>
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 hover:text-gray-700 transition-colors line-clamp-2">
                          {item.title}
                        </h3>
                      </Link>
                      <p className="text-sm text-gray-500 mt-1">{item.category}</p>
                      <p className="text-sm text-gray-500 mt-1 hidden sm:block">{item.description.substring(0, 60)}...</p>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4">
                        <div className="text-left sm:text-right">
                          <p className="text-base sm:text-lg font-semibold text-gray-900">Rs. {item.price.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                              className="cursor-pointer w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 transition-colors text-gray-600"
                            >
                              -
                            </button>
                            <span className="w-6 text-center text-sm text-gray-900">{item.quantity}</span>
                            <button
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                              className="cursor-pointer w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-100 transition-colors text-gray-600"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => handleRemoveFromCart(item.id)}
                            className="cursor-pointer p-2 text-gray-400 hover:text-red-600 transition-colors"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-96 flex-shrink-0">
            <div className="bg-white rounded-lg p-4 sm:p-6 shadow-sm sticky top-24 lg:top-32">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600 text-sm sm:text-base">
                  <span>Subtotal ({items.length} items)</span>
                  <span>Rs. {total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 text-sm sm:text-base">
                  <span>Shipping</span>
                  <span>Rs. {shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600 text-sm sm:text-base">
                  <span>Discount</span>
                  <span>Rs. {0}</span>
                </div>
                <div className="flex justify-between text-gray-600 text-sm sm:text-base">
                  <span>Estimated tax</span>
                  <span>Rs. {tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between">
                  <span className="text-base sm:text-lg font-bold text-gray-900">Total</span>
                  <span className="text-base sm:text-lg font-bold text-gray-900">Rs. {orderTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="space-y-3">
                <button className="w-full bg-gray-900 text-white py-3 px-4 rounded-md hover:bg-gray-800 transition-colors font-medium text-sm sm:text-base">
                  Continue to checkout
                </button>
                <Link
                  href="/products"
                  className="w-full block text-center bg-white text-gray-900 py-3 px-4 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors font-medium text-sm sm:text-base"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
