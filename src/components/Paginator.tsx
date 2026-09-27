import React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronDown,
} from 'lucide-react';

interface PaginatorProps {
  currentPage: number;
  rowsPerPage: number;
  totalRecords: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
}

export const Paginator: React.FC<PaginatorProps> = ({
  currentPage,
  rowsPerPage,
  totalRecords,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const totalPages = Math.max(1, Math.ceil(totalRecords / rowsPerPage));
  const firstRecord = totalRecords === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;
  const lastRecord = Math.min(currentPage * rowsPerPage, totalRecords);

  const pageNumbers: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex flex-wrap items-center justify-between py-2.5 px-3 bg-white border border-[#eae8e8] border-t-0 rounded-b text-sm text-[#6b7280]">
      {/* Current page report */}
      <span className="text-[13px] text-gray-500 font-normal">
        Showing {firstRecord} to {lastRecord} of {totalRecords} records
      </span>

      {/* Page navigation controls */}
      <div className="flex items-center gap-1">
        {/* First Page button */}
        <button
          type="button"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
            currentPage === 1
              ? 'text-gray-300 cursor-not-allowed opacity-50'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
          title="First Page"
        >
          <ChevronsLeft className="w-4 h-4" />
        </button>

        {/* Previous Page button */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
            currentPage === 1
              ? 'text-gray-300 cursor-not-allowed opacity-50'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
          title="Previous Page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Page buttons */}
        <div className="flex items-center gap-1">
          {pageNumbers.map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              className={`w-8 h-8 rounded-full text-[13px] font-medium transition-all cursor-pointer ${
                currentPage === page
                  ? 'bg-[#010915a3] text-white shadow-xs'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        {/* Next Page button */}
        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages || totalRecords === 0}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
            currentPage === totalPages || totalRecords === 0
              ? 'text-gray-300 cursor-not-allowed opacity-50'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
          title="Next Page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Last Page button */}
        <button
          type="button"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages || totalRecords === 0}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
            currentPage === totalPages || totalRecords === 0
              ? 'text-gray-300 cursor-not-allowed opacity-50'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
          title="Last Page"
        >
          <ChevronsRight className="w-4 h-4" />
        </button>

        {/* Rows per page dropdown */}
        <div className="relative ml-2">
          <select
            value={rowsPerPage}
            onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
            className="h-8 pl-2 pr-6 bg-white border border-gray-300 rounded text-xs text-gray-700 focus:outline-none focus:border-[#6366F1] appearance-none cursor-pointer"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={50}>50</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1.5 text-gray-400">
            <ChevronDown className="w-3 h-3" />
          </div>
        </div>
      </div>
    </div>
  );
};
