import { useState, useMemo } from 'react';

/**
 * usePagination Hook
 * Handle pagination logic for lists/tables
 * 
 * @param {Array} items - Array of items to paginate
 * @param {number} itemsPerPage - Number of items per page (default: 10)
 * @param {number} initialPage - Initial page number (default: 1)
 * @returns {Object} - Pagination state and controls
 * 
 * @example
 * const { currentPage, totalPages, paginatedItems, goToPage, nextPage, prevPage } = usePagination(products, 10);
 */
export const usePagination = (items = [], itemsPerPage = 10, initialPage = 1) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  // Ensure current page is within bounds
  const safePage = Math.min(Math.max(currentPage, 1), totalPages);

  const paginatedItems = useMemo(() => {
    const start = (safePage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return items.slice(start, end);
  }, [items, safePage, itemsPerPage]);

  const goToPage = (page) => {
    const newPage = Math.min(Math.max(page, 1), totalPages);
    setCurrentPage(newPage);
  };

  const nextPage = () => {
    if (safePage < totalPages) {
      setCurrentPage(safePage + 1);
    }
  };

  const prevPage = () => {
    if (safePage > 1) {
      setCurrentPage(safePage - 1);
    }
  };

  const resetPagination = () => {
    setCurrentPage(initialPage);
  };

  return {
    currentPage: safePage,
    totalPages,
    totalItems,
    itemsPerPage,
    paginatedItems,
    goToPage,
    nextPage,
    prevPage,
    resetPagination,
    hasNextPage: safePage < totalPages,
    hasPrevPage: safePage > 1,
    startIndex: (safePage - 1) * itemsPerPage,
    endIndex: Math.min(safePage * itemsPerPage, totalItems)
  };
};

export default usePagination;