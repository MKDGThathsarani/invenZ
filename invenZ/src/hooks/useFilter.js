import { useState, useMemo } from 'react';

/**
 * useFilter Hook
 * Filter an array of items based on a filter function
 * 
 * @param {Array} items - Array of items to filter
 * @param {Function} filterFn - Filter function (item, filterValue) => boolean
 * @param {any} initialFilter - Initial filter value
 * @returns {Object} - { filterValue, setFilterValue, filteredItems, resetFilter }
 * 
 * @example
 * const { filterValue, setFilterValue, filteredItems } = useFilter(
 *   products,
 *   (product, category) => product.category === category,
 *   'all'
 * );
 */
export const useFilter = (items = [], filterFn, initialFilter = null) => {
  const [filterValue, setFilterValue] = useState(initialFilter);

  const filteredItems = useMemo(() => {
    if (!items || items.length === 0) return [];
    if (filterValue === null || filterValue === undefined || filterValue === 'all') {
      return items;
    }
    return items.filter(item => filterFn(item, filterValue));
  }, [items, filterValue, filterFn]);

  const resetFilter = () => {
    setFilterValue(initialFilter);
  };

  return {
    filterValue,
    setFilterValue,
    filteredItems,
    resetFilter
  };
};

export default useFilter;