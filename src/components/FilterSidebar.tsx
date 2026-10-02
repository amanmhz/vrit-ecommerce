'use client';

import { useState, useCallback, useEffect } from 'react';

interface FilterSidebarProps {
  category: string;
  onCategoryChange: (category: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
  onClearFilters: () => void;
  sort: 'asc' | 'desc';
  onSortChange: (sort: 'asc' | 'desc') => void;
  layout: 'grid' | 'list';
  onLayoutChange: (layout: 'grid' | 'list') => void;
  categories: string[];
}

export default function FilterSidebar({
  category,
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  onClearFilters,
  sort,
  onSortChange,
  layout,
  onLayoutChange,
  categories,
}: FilterSidebarProps) {
  const [localPriceRange, setLocalPriceRange] = useState<[number, number]>(priceRange);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setLocalPriceRange(priceRange);
  }, [priceRange]);

  const debouncedPriceChange = useCallback(
    (range: [number, number]) => {
      onPriceRangeChange(range);
    },
    [onPriceRangeChange]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      debouncedPriceChange(localPriceRange);
    }, 700);

    return () => clearTimeout(timer);
  }, [localPriceRange, debouncedPriceChange]);

  const sidebarContent = (
    <div className="bg-white border border-gray-100 rounded-md p-6">
      {/* View & Sort */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <div className="space-y-3">
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm text-gray-600">Sort By:</span>
            <div className="w-32">
              <div className="flex border border-gray-300 rounded-md overflow-hidden flex-1">
                <button
                  onClick={() => onSortChange('asc')}
                  className={`cursor-pointer text-xs flex-1 p-1.5 ${sort === 'asc' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                  Asc
                </button>
                <button
                  onClick={() => onSortChange('desc')}
                  className={`cursor-pointer text-xs flex-1 p-1.5 ${sort === 'desc' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                  Desc
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between gap-2">
            <span className="text-sm text-gray-600">View:</span>
            <div className="w-32">
              <div className="flex border border-gray-300 rounded-md overflow-hidden flex-1">
                <button
                  onClick={() => onLayoutChange('grid')}
                  className={`cursor-pointer flex-1 p-1.5 ${layout === 'grid' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                  <svg className="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => onLayoutChange('list')}
                  className={`cursor-pointer flex-1 p-1.5 ${layout === 'list' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                  <svg className="w-4 h-4 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-base font-semibold text-gray-700 mb-3">Filters</h2>

      {/* Category Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Category</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="category"
              value=""
              checked={category === ''}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="w-4 h-4 text-gray-900 focus:ring-gray-500"
            />
            <span className="text-sm text-gray-600">All Categories</span>
          </label>
          {categories.map((categoryName) => (
            <label key={categoryName} className="flex items-center gap-2 cursor-pointer ">
              <input
                type="radio"
                name="category"
                value={categoryName}
                checked={category === categoryName}
                onChange={(e) => onCategoryChange(e.target.value)}
                className="w-4 h-4 text-gray-900 focus:ring-gray-500"
              />
              <span className="text-sm text-gray-600 capitalize">{categoryName}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">
          Price Range
          <span className="px-4 text-xs font-normal text-gray-500">
            Rs. {localPriceRange[0]} - Rs. {localPriceRange[1]}
          </span>
        </h3>
        <div className="flex items-center justify-center gap-2">
          <input
            type="number"
            min="0"
            max="1000"
            value={localPriceRange[0]}
            placeholder="Min"
            onChange={(e) => setLocalPriceRange([Number(e.target.value), localPriceRange[1]])}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-500 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
          <span className="text-sm text-gray-600"> - </span>
          <input
            type="number"
            min="0"
            max="1000"
            value={localPriceRange[1]}
            placeholder="Max"
            onChange={(e) => setLocalPriceRange([localPriceRange[0], Number(e.target.value)])}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm text-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-500 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          />
        </div>
      </div>

      <button
        onClick={() => {
          onClearFilters();
          setIsMobileMenuOpen(false);
        }}
        className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 transition-colors"
      >
        Clear Filters
      </button>
    </div>
  );

  return (
    <>
      {/* Mobile Filter Button */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="lg:hidden fixed bottom-4 right-4 z-40 bg-gray-900 text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
      </button>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
      >
        <div
          className="absolute inset-0 bg-black/50 transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          className={`absolute right-0 top-0 h-full w-80 overflow-y-auto bg-white shadow-xl transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
        >
          <div className="p-4 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-black p-2 hover:bg-gray-100 rounded-md transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="p-4">
            {sidebarContent}
          </div>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside className="w-64 flex-shrink-0 hidden lg:block">
        <div className="sticky top-24">
          {sidebarContent}
        </div>
      </aside>
    </>
  );
}
