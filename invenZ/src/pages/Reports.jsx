import React, { useState } from 'react';
import { useReport } from '../services/reportService';
import Card from '../components/common/Card';
import './Reports.css';

const Reports = () => {
  const [reportType, setReportType] = useState('sales');
  const [dateRange, setDateRange] = useState({
    start: '',
    end: ''
  });
  const [loading, setLoading] = useState(false);
  const [reportData, setReportData] = useState(null);

  const reportTypes = [
    { id: 'sales', label: '📊 Sales Report', icon: '📊' },
    { id: 'stock', label: '📦 Stock Report', icon: '📦' },
    { id: 'suppliers', label: '🏢 Supplier Report', icon: '🏢' },
    { id: 'profit', label: '💰 Profit Report', icon: '💰' }
  ];

  const handleGenerate = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setReportData({
        title: `${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report`,
        generated: new Date().toLocaleString(),
        data: [
          { id: 1, name: 'Item 1', value: 100 },
          { id: 2, name: 'Item 2', value: 200 },
          { id: 3, name: 'Item 3', value: 300 }
        ]
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="reports-page">
      <div className="page-header">
        <h1>📋 Reports</h1>
        <p>Generate and view reports for your business</p>
      </div>

      <div className="report-controls">
        <div className="report-types">
          {reportTypes.map((type) => (
            <button
              key={type.id}
              className={`report-type-btn ${reportType === type.id ? 'active' : ''}`}
              onClick={() => setReportType(type.id)}
            >
              {type.icon} {type.label}
            </button>
          ))}
        </div>

        <div className="date-range">
          <div className="form-group">
            <label>Start Date</label>
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>End Date</label>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
            />
          </div>
          <button className="btn-primary" onClick={handleGenerate} disabled={loading}>
            {loading ? 'Generating...' : 'Generate Report'}
          </button>
        </div>
      </div>

      {reportData && (
        <Card title={`📄 ${reportData.title}`}>
          <div className="report-meta">
            <span>Generated: {reportData.generated}</span>
            <div className="report-actions">
              <button className="btn-sm btn-primary">📥 Export PDF</button>
              <button className="btn-sm btn-success">📤 Export Excel</button>
            </div>
          </div>
          <div className="report-table">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {reportData.data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>Rs. {item.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Reports;