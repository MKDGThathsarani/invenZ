import { useState, useMemo } from 'react';

/**
 * useSort Hook
 * Sort an array of items
 * 
 * @param {Array} items - Array of items to sort
 * @param {string} initialField - Initial field to sort by
 * @param {string} initialDirection - Initial sort direction ('asc' or 'desc')
 * @returns {Object} - { sortField, sortDirection, sortedItems, toggleSort, setSort }
 * 
 * @example
 * const { sortField, sortDirection, sortedItems, toggleSort } = useSort(products, 'name', 'asc');
 * 
 * // Toggle sort on a field
 * toggleSort('price');
 */
export const useSort = (items = [], initialField = '', initialDirection = 'asc') => {
  const [sortField, setSortField] = useState(initialField);
  const [sortDirection, setSortDirection] = useState(initialDirection);

  const sortedItems = useMemo(() => {
    if (!items || items.length === 0) return [];
    if (!sortField) return items;

    const sorted = [...items];

    sorted.sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];

      // Handle null/undefined values
      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      // Handle different data types
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      // Handle numbers and other types
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });

    return sorted;
  }, [items, sortField, sortDirection]);

  const toggleSort = (field) => {
    if (sortField === field) {
      // Toggle direction
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new field with ascending order
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const setSort = (field, direction = 'asc') => {
    setSortField(field);
    setSortDirection(direction);
  };

  const resetSort = () => {
    setSortField(initialField);
    setSortDirection(initialDirection);
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return '↕';
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  const isSortingBy = (field) => sortField === field;

  return {
    sortField,
    sortDirection,
    sortedItems,
    toggleSort,
    setSort,
    resetSort,
    getSortIcon,
    isSortingBy
  };
};

export default useSort;