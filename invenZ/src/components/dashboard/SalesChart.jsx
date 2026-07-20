import React, { useEffect, useRef } from 'react';
import './SalesChart.css';

const SalesChart = ({ data = [], title = 'Sales Trend', height = 300 }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const padding = { top: 20, bottom: 30, left: 40, right: 20 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Find max value
    const maxValue = Math.max(...data.map(d => d.value)) * 1.2;
    const minValue = 0;

    // Draw grid lines
    ctx.strokeStyle = '#e8f0e8';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);

    for (let i = 0; i <= 4; i++) {
      const y = padding.top + (chartHeight / 4) * i;
      const value = maxValue - (maxValue / 4) * i;
      
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();

      // Y-axis labels
      ctx.fillStyle = '#999';
      ctx.font = '11px Inter, sans-serif';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText(Math.round(value), padding.left - 10, y);
    }

    ctx.setLineDash([]);

    // Draw bars or line
    const barWidth = chartWidth / data.length * 0.6;
    const gap = chartWidth / data.length;

    data.forEach((item, index) => {
      const x = padding.left + index * gap + (gap - barWidth) / 2;
      const barHeight = (item.value / maxValue) * chartHeight;
      const y = padding.top + chartHeight - barHeight;

      // Bar
      const gradient = ctx.createLinearGradient(x, y, x, padding.top + chartHeight);
      gradient.addColorStop(0, '#4CAF50');
      gradient.addColorStop(1, '#1B5E20');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.roundRect(x, y, barWidth, barHeight, [4, 4, 0, 0]);
      ctx.fill();

      // Bar hover effect - value on top
      ctx.fillStyle = '#1a1a1a';
      ctx.font = '10px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      ctx.fillText(item.value, x + barWidth / 2, y - 4);

      // X-axis labels
      ctx.fillStyle = '#999';
      ctx.font = '10px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      ctx.fillText(item.label, x + barWidth / 2, padding.top + chartHeight + 8);
    });

  }, [data]);

  if (!data || data.length === 0) {
    return (
      <div className="sales-chart-empty">
        <p>📊 No sales data available</p>
      </div>
    );
  }

  return (
    <div className="sales-chart">
      {title && <h4 className="sales-chart-title">{title}</h4>}
      <div className="sales-chart-container">
        <canvas 
          ref={canvasRef} 
          width={800} 
          height={height}
          className="sales-chart-canvas"
        />
      </div>
    </div>
  );
};

// roundRect polyfill for older browsers
if (!CanvasRenderingContext2D.prototype.roundRect) {
  CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, radii) {
    const r = Array.isArray(radii) ? radii : [radii, radii, radii, radii];
    this.moveTo(x + r[0], y);
    this.lineTo(x + w - r[1], y);
    this.quadraticCurveTo(x + w, y, x + w, y + r[1]);
    this.lineTo(x + w, y + h - r[2]);
    this.quadraticCurveTo(x + w, y + h, x + w - r[2], y + h);
    this.lineTo(x + r[3], y + h);
    this.quadraticCurveTo(x, y + h, x, y + h - r[3]);
    this.lineTo(x, y + r[0]);
    this.quadraticCurveTo(x, y, x + r[0], y);
    this.closePath();
    return this;
  };
}

export default SalesChart;