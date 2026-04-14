import { format, formatDistanceToNow, isToday, isTomorrow, isThisWeek, parseISO, startOfWeek, addDays } from 'date-fns';

// ==================== Date Formatting ====================

export const formatTime = (dateString) => {
  if (!dateString) return '';
  const date = typeof dateString === 'string' ? parseISO(dateString) : new Date(dateString);
  return format(date, 'h:mm a');
};

export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = typeof dateString === 'string' ? parseISO(dateString) : new Date(dateString);

  if (isToday(date)) return 'Today';
  if (isTomorrow(date)) return 'Tomorrow';
  if (isThisWeek(date)) return format(date, 'EEEE');
  return format(date, 'MMM d, yyyy');
};

export const formatDateFull = (dateString) => {
  if (!dateString) return '';
  const date = typeof dateString === 'string' ? parseISO(dateString) : new Date(dateString);
  return format(date, 'EEEE, MMMM d, yyyy');
};

export const formatDateTime = (dateString) => {
  if (!dateString) return '';
  const date = typeof dateString === 'string' ? parseISO(dateString) : new Date(dateString);
  return format(date, 'MMM d, h:mm a');
};

export const formatDuration = (minutes) => {
  if (!minutes || minutes <= 0) return '0 min';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) return `${mins} min`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
};

export const formatRelativeTime = (dateString) => {
  if (!dateString) return '';
  const date = typeof dateString === 'string' ? parseISO(dateString) : new Date(dateString);
  return formatDistanceToNow(date, { addSuffix: true });
};

export const getWeekDates = (baseDate = new Date()) => {
  const start = startOfWeek(baseDate, { weekStartsOn: 1 });
  return Array.from({ length: 7 }, (_, i) => addDays(start, i));
};

export const formatWeekDay = (date) => {
  return format(date, 'EEE');
};

export const formatWeekDayNum = (date) => {
  return format(date, 'd');
};

// ==================== Distance Calculation ====================

export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  if (!lat1 || !lon1 || !lat2 || !lon2) return null;

  const R = 6371e3; // Earth's radius in meters
  const phi1 = (lat1 * Math.PI) / 180;
  const phi2 = (lat2 * Math.PI) / 180;
  const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) * Math.cos(phi2) *
    Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in meters

  return distance;
};

export const formatDistance = (meters) => {
  if (meters == null || isNaN(meters)) return '';
  if (meters < 1000) return `${Math.round(meters)} m`;
  return `${(meters / 1000).toFixed(1)} km`;
};

export const getDistanceFromLocation = (userLocation, jobLocation) => {
  if (!userLocation || !jobLocation) return null;

  const distance = calculateDistance(
    userLocation.latitude,
    userLocation.longitude,
    jobLocation.latitude || jobLocation.lat,
    jobLocation.longitude || jobLocation.lng || jobLocation.lon
  );

  return distance;
};

// ==================== Status Colors & Labels ====================

export const STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  NO_SHOW: 'no_show',
};

export const STATUS_COLORS = {
  pending: '#F59E0B',
  confirmed: '#3B82F6',
  in_progress: '#8B5CF6',
  completed: '#10B981',
  cancelled: '#EF4444',
  no_show: '#6B7280',
};

export const STATUS_LIGHT_COLORS = {
  pending: '#FEF3C7',
  confirmed: '#DBEAFE',
  in_progress: '#EDE9FE',
  completed: '#D1FAE5',
  cancelled: '#FEE2E2',
  no_show: '#F3F4F6',
};

export const STATUS_LABELS = {
  pending: 'Pending',
  confirmed: 'Confirmed',
  in_progress: 'In Progress',
  completed: 'Completed',
  cancelled: 'Cancelled',
  no_show: 'No Show',
};

export const getStatusColor = (status) => {
  return STATUS_COLORS[status?.toLowerCase()] || '#6B7280';
};

export const getStatusLightColor = (status) => {
  return STATUS_LIGHT_COLORS[status?.toLowerCase()] || '#F3F4F6';
};

export const getStatusLabel = (status) => {
  return STATUS_LABELS[status?.toLowerCase()] || status;
};

// ==================== Service Types ====================

export const SERVICE_TYPES = {
  standard: 'Standard Clean',
  deep: 'Deep Clean',
  move_in_out: 'Move In/Out',
  office: 'Office Clean',
  carpet: 'Carpet Clean',
  window: 'Window Clean',
  post_construction: 'Post-Construction',
  disinfection: 'Disinfection',
};

export const getServiceTypeLabel = (type) => {
  return SERVICE_TYPES[type?.toLowerCase()] || type;
};

// ==================== Currency Formatting ====================

export const formatCurrency = (amount, currency = 'USD') => {
  if (amount == null || isNaN(amount)) return '$0.00';

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
};

// ==================== Phone Formatting ====================

export const formatPhone = (phone) => {
  if (!phone) return '';
  const cleaned = phone.replace(/\D/g, '');

  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  return phone;
};

// ==================== Rating Display ====================

export const formatRating = (rating) => {
  if (rating == null || isNaN(rating)) return '0.0';
  return parseFloat(rating).toFixed(1);
};

// ==================== Name Formatting ====================

export const getInitials = (firstName, lastName) => {
  const first = firstName?.charAt(0)?.toUpperCase() || '';
  const last = lastName?.charAt(0)?.toUpperCase() || '';
  return `${first}${last}`;
};

export const getFullName = (firstName, lastName) => {
  return `${firstName || ''} ${lastName || ''}`.trim();
};

// ==================== Address Formatting ====================

export const formatAddress = (address) => {
  if (!address) return '';

  if (typeof address === 'string') return address;

  const parts = [
    address.street,
    address.unit && `Unit ${address.unit}`,
    address.city,
    address.state,
    address.zipCode,
  ].filter(Boolean);

  return parts.join(', ');
};
