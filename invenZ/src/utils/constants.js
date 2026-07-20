// ============================================
// APP CONSTANTS
// ============================================

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    PROFILE: '/auth/profile',
    CHANGE_PASSWORD: '/auth/change-password'
  },
  PRODUCTS: {
    BASE: '/products',
    LOW_STOCK: '/products/low-stock',
    SEARCH: '/products/search',
    CATEGORY: '/products/category'
  },
  SUPPLIERS: {
    BASE: '/suppliers',
    SEARCH: '/suppliers/search',
    TOP_RATED: '/suppliers/top-rated',
    PRODUCTS: '/suppliers/:id/products'
  },
  STOCK: {
    BASE: '/stock',
    MOVEMENTS: '/stock/movements',
    ADD: '/stock/add',
    REMOVE: '/stock/remove',
    ADJUST: '/stock/adjust',
    LOW_STOCK: '/stock/low-stock',
    OUT_OF_STOCK: '/stock/out-of-stock',
    ALERTS: '/stock/alerts'
  },
  ORDERS: {
    PURCHASE: '/orders/purchase',
    SALES: '/orders/sales',
    STATS: '/orders/stats',
    RECENT: '/orders/recent'
  },
  REPORTS: {
    SALES: '/reports/sales',
    STOCK: '/reports/stock',
    SUPPLIERS: '/reports/suppliers',
    PROFIT: '/reports/profit',
    DASHBOARD: '/reports/dashboard'
  }
};

// Order Status
export const ORDER_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  RECEIVED: 'received',
  CANCELLED: 'cancelled'
};

export const ORDER_STATUS_LABELS = {
  [ORDER_STATUS.PENDING]: '⏳ Pending',
  [ORDER_STATUS.APPROVED]: '✅ Approved',
  [ORDER_STATUS.PROCESSING]: '⚙️ Processing',
  [ORDER_STATUS.SHIPPED]: '🚚 Shipped',
  [ORDER_STATUS.DELIVERED]: '📦 Delivered',
  [ORDER_STATUS.RECEIVED]: '📥 Received',
  [ORDER_STATUS.CANCELLED]: '❌ Cancelled'
};

export const ORDER_STATUS_COLORS = {
  [ORDER_STATUS.PENDING]: 'warning',
  [ORDER_STATUS.APPROVED]: 'info',
  [ORDER_STATUS.PROCESSING]: 'primary',
  [ORDER_STATUS.SHIPPED]: 'primary',
  [ORDER_STATUS.DELIVERED]: 'success',
  [ORDER_STATUS.RECEIVED]: 'success',
  [ORDER_STATUS.CANCELLED]: 'danger'
};

// Stock Movement Types
export const MOVEMENT_TYPES = {
  IN: 'in',
  OUT: 'out',
  ADJUSTMENT: 'adjustment'
};

export const MOVEMENT_TYPE_LABELS = {
  [MOVEMENT_TYPES.IN]: '📥 Stock In',
  [MOVEMENT_TYPES.OUT]: '📤 Stock Out',
  [MOVEMENT_TYPES.ADJUSTMENT]: '⚖️ Adjustment'
};

// User Roles
export const USER_ROLES = {
  ADMIN: 'admin',
  MANAGER: 'manager',
  STAFF: 'staff'
};

export const USER_ROLE_LABELS = {
  [USER_ROLES.ADMIN]: '👑 Admin',
  [USER_ROLES.MANAGER]: '📋 Manager',
  [USER_ROLES.STAFF]: '👤 Staff'
};

// Stock Status
export const STOCK_STATUS = {
  CRITICAL: 'critical',
  LOW: 'low',
  MEDIUM: 'medium',
  GOOD: 'good'
};

export const STOCK_STATUS_LABELS = {
  [STOCK_STATUS.CRITICAL]: '🔴 Critical',
  [STOCK_STATUS.LOW]: '🟡 Low',
  [STOCK_STATUS.MEDIUM]: '🟠 Medium',
  [STOCK_STATUS.GOOD]: '🟢 Good'
};

// Pagination
export const DEFAULT_PAGE_SIZE = 10;
export const PAGE_SIZE_OPTIONS = [5, 10, 20, 50, 100];

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM DD, YYYY',
  DISPLAY_TIME: 'MMM DD, YYYY HH:mm',
  INPUT: 'YYYY-MM-DD',
  API: 'YYYY-MM-DDTHH:mm:ss.SSSZ'
};

// Currency
export const CURRENCY = {
  CODE: 'LKR',
  SYMBOL: 'Rs.',
  LOCALE: 'en-LK'
};

// File Upload
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
export const ALLOWED_FILE_TYPES = ['.csv', '.xlsx', '.xls', '.pdf'];

// Validation Patterns
export const PATTERNS = {
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PHONE: /^[0-9+\-\s()]{10,15}$/,
  URL: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
  SKU: /^[A-Z0-9\-_]{3,20}$/,
  TAX_NUMBER: /^[A-Z0-9\-]{5,20}$/
};

// Local Storage Keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  THEME: 'theme',
  SETTINGS: 'settings'
};

// API Response Status
export const API_STATUS = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE: 422,
  INTERNAL_ERROR: 500
};

// Chart Colors (Forest & Gold Theme)
export const CHART_COLORS = {
  primary: '#1B5E20',
  secondary: '#2E7D32',
  accent: '#4CAF50',
  warning: '#FF9800',
  danger: '#F44336',
  success: '#43A047',
  info: '#2196F3',
  purple: '#9C27B0',
  cyan: '#00BCD4',
  pink: '#E91E63'
};

export const CHART_COLOR_PALETTE = [
  CHART_COLORS.primary,
  CHART_COLORS.accent,
  CHART_COLORS.warning,
  CHART_COLORS.danger,
  CHART_COLORS.info,
  CHART_COLORS.purple,
  CHART_COLORS.cyan,
  CHART_COLORS.pink
];

// Toast/Notification Types
export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info'
};

export const TOAST_DURATION = {
  SHORT: 3000,
  MEDIUM: 5000,
  LONG: 8000
};

// Menu Items
export const MENU_ITEMS = [
  { icon: '📊', label: 'Dashboard', path: '/' },
  { icon: '📦', label: 'Products', path: '/products' },
  { icon: '🏷️', label: 'Categories', path: '/categories' },
  { icon: '🏢', label: 'Suppliers', path: '/suppliers' },
  { icon: '📈', label: 'Stock', path: '/stock' },
  { icon: '🛒', label: 'Orders', path: '/orders' },
  { icon: '📋', label: 'Reports', path: '/reports' },
  { icon: '⚙️', label: 'Settings', path: '/settings' }
];