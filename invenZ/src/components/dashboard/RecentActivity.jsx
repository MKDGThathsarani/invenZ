import React from 'react';
import './RecentActivity.css';

const RecentActivity = ({ activities = [] }) => {
  const getActivityIcon = (type) => {
    const icons = {
      'product_added': '➕',
      'product_updated': '✏️',
      'product_deleted': '🗑️',
      'stock_in': '📥',
      'stock_out': '📤',
      'stock_adjustment': '⚖️',
      'order_created': '🛒',
      'order_updated': '📝',
      'order_completed': '✅',
      'supplier_added': '🏢',
      'supplier_updated': '📋',
      'user_login': '🔑',
      'report_generated': '📄'
    };
    return icons[type] || '📌';
  };

  const getActivityColor = (type) => {
    const colors = {
      'product_added': 'success',
      'product_updated': 'info',
      'product_deleted': 'danger',
      'stock_in': 'success',
      'stock_out': 'warning',
      'stock_adjustment': 'info',
      'order_created': 'primary',
      'order_updated': 'info',
      'order_completed': 'success',
      'supplier_added': 'success',
      'supplier_updated': 'info',
      'user_login': 'primary',
      'report_generated': 'info'
    };
    return colors[type] || 'default';
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const date = new Date(timestamp);
    const diff = Math.floor((now - date) / 1000);

    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
    return date.toLocaleDateString('en-LK', {
      month: 'short',
      day: 'numeric'
    });
  };

  if (!activities || activities.length === 0) {
    return (
      <div className="recent-activity-empty">
        <p>📋 No recent activity</p>
      </div>
    );
  }

  return (
    <div className="recent-activity">
      <h4 className="recent-activity-title">Recent Activity</h4>
      <div className="activity-list">
        {activities.slice(0, 10).map((activity, index) => (
          <div key={index} className={`activity-item ${getActivityColor(activity.type)}`}>
            <div className="activity-icon">
              {getActivityIcon(activity.type)}
            </div>
            <div className="activity-content">
              <div className="activity-text">{activity.text}</div>
              <div className="activity-time">
                {formatTime(activity.timestamp)}
                {activity.user && <span className="activity-user"> · {activity.user}</span>}
              </div>
            </div>
            {activity.amount && (
              <div className="activity-amount">{activity.amount}</div>
            )}
          </div>
        ))}
      </div>
      {activities.length > 10 && (
        <div className="activity-view-all">
          <a href="/activities">View all activities →</a>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;