import { useState, useMemo, useCallback } from 'react';

/**
 * useSearch Hook
 * Search through an array of items
 * 
 * @param {Array} items - Array of items to search
 * @param {Array} searchFields - Fields to search in (default: all string fields)
 * @param {number} debounceDelay - Debounce delay in milliseconds (default: 300)
 * @returns {Object} - { searchTerm, setSearchTerm, searchResults, isSearching }
 * 
 * @example
 * const { searchTerm, setSearchTerm, searchResults } = useSearch(products, ['name', 'sku', 'category']);
 */
export const useSearch = (items = [], searchFields = [], debounceDelay = 300) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Search function
  const performSearch = useCallback((term, data) => {
    if (!term || term.trim() === '') {
      return data;
    }

    const searchLower = term.toLowerCase().trim();

    return data.filter(item => {
      // If searchFields is empty, search all string fields
      if (searchFields.length === 0) {
        return Object.values(item).some(value => {
          if (value === null || value === undefined) return false;
          return String(value).toLowerCase().includes(searchLower);
        });
      }

      // Search only specified fields
      return searchFields.some(field => {
        const value = item[field];
        if (value === null || value === undefined) return false;
        return String(value).toLowerCase().includes(searchLower);
      });
    });
  }, [searchFields]);

  const searchResults = useMemo(() => {
    setIsSearching(true);
    const results = performSearch(searchTerm, items);
    setIsSearching(false);
    return results;
  }, [items, searchTerm, performSearch]);

  const resetSearch = useCallback(() => {
    setSearchTerm('');
  }, []);

  return {
    searchTerm,
    setSearchTerm,
    searchResults,
    isSearching,
    resetSearch,
    hasResults: searchResults.length > 0,
    resultCount: searchResults.length
  };
};

export default useSearch;