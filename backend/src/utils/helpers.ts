export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const paginate = (page: number = 1, limit: number = 10) => {
  const skip = (Math.max(1, page) - 1) * limit;
  return { skip, take: limit };
};

export const formatDate = (date: Date, locale: string = 'en-US'): string => {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
};

export const generateEmployeeId = (prefix: string = 'EMP'): string => {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}${random}`;
};

export const calculateEndTime = (startTime: Date, durationMinutes: number): Date => {
  return new Date(startTime.getTime() + durationMinutes * 60000);
};
