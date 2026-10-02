'use client';

import ShopHeader from "@/components/ShopHeader";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <ShopHeader onSearch={() => {}} />
      <main className="container mx-auto p-6">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </main>
    </div>
  );
}
