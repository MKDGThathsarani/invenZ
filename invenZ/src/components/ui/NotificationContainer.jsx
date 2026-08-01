import React from 'react';
import { useNotification } from '../../context';
import './NotificationContainer.css';

const NotificationContainer = () => {
  const { notifications, removeNotification } = useNotification();

  if (!notifications.length) {
    return null;
  }

  return (
    <div className="notification-container" aria-live="polite" aria-atomic="true">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`notification-toast ${notification.type || 'info'}`}
          role="alert"
        >
          <div className="notification-content">
            <strong>
              {notification.type === 'success'
                ? 'Success'
                : notification.type === 'error'
                  ? 'Error'
                  : notification.type === 'warning'
                    ? 'Warning'
                    : 'Info'}
            </strong>
            <p>{notification.message}</p>
          </div>
          <button
            type="button"
            className="notification-close"
            onClick={() => removeNotification(notification.id)}
            aria-label="Dismiss notification"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationContainer;
