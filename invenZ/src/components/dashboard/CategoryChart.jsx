import React, { useEffect, useRef } from 'react';
import './CategoryChart.css';

const CategoryChart = ({ data = [], title = 'Stock by Category' }) => {
  const canvasRef = useRef(null);

  const colors = [
    '#1B5E20',
    '#4CAF50',
    '#FF9800',
    '#F44336',
    '#2196F3',
    '#9C27B0',
    '#00BCD4',
    '#FF5722',
    '#8BC34A',
    '#E91E63'
  ];

  useEffect(() => {
    if (!data || data.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 40;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Calculate total
    const total = data.reduce((sum, item) => sum + item.value, 0);

    if (total === 0) {
      ctx.fillStyle = '#999';
      ctx.font = '14px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('No data available', centerX, centerY);
      return;
    }

    // Draw pie chart
    let startAngle = -Math.PI / 2;

    data.forEach((item, index) => {
      const sliceAngle = (item.value / total) * 2 * Math.PI;
      const endAngle = startAngle + sliceAngle;
      const color = colors[index % colors.length];

      // Draw slice
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();

      // Draw slice border
      ctx.strokeStyle = 'white';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw label
      const midAngle = startAngle + sliceAngle / 2;
      const labelRadius = radius * 0.65;
      const labelX = centerX + Math.cos(midAngle) * labelRadius;
      const labelY = centerY + Math.sin(midAngle) * labelRadius;

      if (sliceAngle > 0.2) {
        ctx.fillStyle = 'white';
        ctx.font = 'bold 11px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${Math.round((item.value / total) * 100)}%`, labelX, labelY);
      }

      startAngle = endAngle;
    });

    // Draw center hole (donut effect)
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.4, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();

    // Center text
    ctx.fillStyle = '#1a1a1a';
    ctx.font = 'bold 14px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(total, centerX, centerY - 8);
    ctx.fillStyle = '#999';
    ctx.font = '10px Inter, sans-serif';
    ctx.fillText('Total', centerX, centerY + 14);

  }, [data]);

  if (!data || data.length === 0) {
    return (
      <div className="category-chart-empty">
        <p>📊 No category data available</p>
      </div>
    );
  }

  return (
    <div className="category-chart">
      {title && <h4 className="category-chart-title">{title}</h4>}
      <div className="category-chart-container">
        <canvas 
          ref={canvasRef} 
          width={400} 
          height={350}
          className="category-chart-canvas"
        />
        <div className="category-chart-legend">
          {data.map((item, index) => (
            <div key={index} className="legend-item">
              <span 
                className="legend-color" 
                style={{ background: colors[index % colors.length] }}
              />
              <span className="legend-label">{item.label}</span>
              <span className="legend-value">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryChart;