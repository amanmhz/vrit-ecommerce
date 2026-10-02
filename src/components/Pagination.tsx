'use client';

interface PaginationProps {
  totalFilteredPages: number;
  page: number;
  handlePageChange: (page: number) => void;
}

export default function Pagination({
  totalFilteredPages,
  page,
  handlePageChange
}: PaginationProps) {
  return (
    <>
      {totalFilteredPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-8 sm:mt-12 px-2">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="cursor-pointer text-gray-600 text-xs sm:text-sm px-3 sm:px-6 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 whitespace-nowrap"
          >
            <span className="hidden sm:inline">Previous</span>
            <span className="sm:hidden">Prev</span>
          </button>

          <span className="sm:hidden text-gray-600 text-xs px-4 py-2">
            {page} / {totalFilteredPages}
          </span>

          <div className="hidden sm:flex items-center gap-2">
            {Array.from({ length: totalFilteredPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`cursor-pointer text-gray-600 text-sm px-4 py-2 border border-gray-300 rounded-md ${page === pageNum ? 'bg-gray-900 text-white' : 'hover:bg-gray-50'
                  }`}
              >
                {pageNum}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalFilteredPages}
            className="cursor-pointer text-gray-600 text-xs sm:text-sm px-3 sm:px-6 py-2 border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 whitespace-nowrap"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
