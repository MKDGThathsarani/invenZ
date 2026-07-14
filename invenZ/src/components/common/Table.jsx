import React from 'react';
import './Table.css';

const Table = ({
  columns,
  data,
  loading = false,
  emptyMessage = 'No data available',
  className = '',
  ...props
}) => {
  if (loading) {
    return (
      <div className="table-loading">
        <div className="loader loader-md" />
        <p>Loading...</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="table-empty">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={`table-container ${className}`}>
      <table className="table" {...props}>
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th 
                key={index}
                style={{ width: col.width || 'auto', textAlign: col.align || 'left' }}
              >
                {col.icon && <span className="th-icon">{col.icon}</span>}
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => (
                <td 
                  key={colIndex}
                  style={{ textAlign: col.align || 'left' }}
                >
                  {col.render ? col.render(row[col.accessor], row) : row[col.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;