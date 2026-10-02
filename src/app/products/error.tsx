'use client';

export default function ProductsError({ reset }: { reset: () => void }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto p-6">
        <div className="bg-white rounded-md shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong.</h2>
          <p className="text-gray-600 mb-4">Please try again.</p>
          <button
            onClick={() => reset()}
            className="bg-gray-900 text-white px-4 py-2 rounded-md font-medium hover:bg-gray-800 transition-colors"
          >
            Try again
          </button>
        </div>
      </main>
    </div>
  );
}
