// ============================================
// EXPORT HELPERS
// ============================================

import { formatDate } from './formatter';

/**
 * Convert data to CSV
 */
export const toCSV = (data, headers = null) => {
  if (!data || data.length === 0) return '';

  const keys = headers || Object.keys(data[0]);
  const headerRow = keys.join(',');
  
  const rows = data.map(item => {
    return keys.map(key => {
      let value = item[key];
      if (value === null || value === undefined) return '';
      if (typeof value === 'string' && value.includes(',')) {
        return `"${value}"`;
      }
      if (typeof value === 'object') {
        return JSON.stringify(value);
      }
      return value;
    }).join(',');
  });

  return [headerRow, ...rows].join('\n');
};

/**
 * Download CSV file
 */
export const downloadCSV = (data, filename, headers = null) => {
  const csv = toCSV(data, headers);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${formatDate(new Date())}.csv`);
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Convert data to Excel (XLSX)
 */
export const toExcel = (data) => {
  if (!data || data.length === 0) return null;
  
  // Simple Excel XML format (can be opened in Excel)
  const rows = data.map(row => {
    return Object.values(row).map(value => {
      if (value === null || value === undefined) return '';
      return value;
    }).join('\t');
  });

  const header = Object.keys(data[0]).join('\t');
  return [header, ...rows].join('\n');
};

/**
 * Download Excel file
 */
export const downloadExcel = (data, filename) => {
  const excelData = toExcel(data);
  const blob = new Blob([excelData], { 
    type: 'application/vnd.ms-excel;charset=utf-8;' 
  });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${formatDate(new Date())}.xls`);
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Convert data to JSON
 */
export const toJSON = (data) => {
  return JSON.stringify(data, null, 2);
};

/**
 * Download JSON file
 */
export const downloadJSON = (data, filename) => {
  const json = toJSON(data);
  const blob = new Blob([json], { type: 'application/json;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${formatDate(new Date())}.json`);
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * Download PDF (using window.print)
 */
export const downloadPDF = (content, filename) => {
  const printWindow = window.open('', '_blank', 'width=800,height=600');
  printWindow.document.write(`
    <html>
      <head>
        <title>${filename}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          th { background: #1B5E20; color: white; }
        </style>
      </head>
      <body>
        ${content}
        <script>
          window.onload = function() {
            window.print();
            window.close();
          }
        <\/script>
      </body>
    </html>
  `);
  printWindow.document.close();
};

/**
 * Export table data to PDF
 */
export const exportTableToPDF = (data, columns, title) => {
  let html = `
    <h1>${title}</h1>
    <p>Generated on: ${formatDate(new Date())}</p>
    <table>
      <thead>
        <tr>
          ${columns.map(col => `<th>${col.header}</th>`).join('')}
        </tr>
      </thead>
      <tbody>
        ${data.map(row => `
          <tr>
            ${columns.map(col => `<td>${row[col.accessor] || ''}</td>`).join('')}
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;

  downloadPDF(html, title);
};

/**
 * Get file extension
 */
export const getFileExtension = (filename) => {
  return filename.split('.').pop().toLowerCase();
};

/**
 * Get mime type from extension
 */
export const getMimeType = (extension) => {
  const mimeTypes = {
    'csv': 'text/csv',
    'xls': 'application/vnd.ms-excel',
    'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'pdf': 'application/pdf',
    'json': 'application/json',
    'txt': 'text/plain',
    'png': 'image/png',
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'gif': 'image/gif',
    'svg': 'image/svg+xml'
  };
  return mimeTypes[extension] || 'application/octet-stream';
};

export default {
  toCSV,
  downloadCSV,
  toExcel,
  downloadExcel,
  toJSON,
  downloadJSON,
  downloadPDF,
  exportTableToPDF,
  getFileExtension,
  getMimeType
};