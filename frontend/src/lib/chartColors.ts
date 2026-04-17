/**
 * Themeable chart color palettes.
 * Exported as configurable constants so charts can be styled consistently.
 */

// Primary brand palette (matches CleanPro design system)
export const CHART_COLORS_PRIMARY = ['#0ea5e9', '#d946ef', '#10b981', '#f59e0b', '#ef4444'];

// Sequential palette for heatmaps/area charts
export const CHART_COLORS_SEQUENTIAL = ['#0ea5e9', '#0284c7', '#0369a1', '#075985', '#0c4a6e'];

// Categorical palette for pie/donut charts
export const CHART_COLORS_CATEGORICAL = ['#0ea5e9', '#d946ef', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6'];

// Status-based palette
export const CHART_COLORS_STATUS = {
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#0ea5e9',
  neutral: '#6b7280',
};

// Revenue/financial chart colors
export const CHART_COLORS_REVENUE = ['#10b981', '#0ea5e9', '#d946ef', '#f59e0b'];

// Helper to get color by index with wrap-around
export function getChartColor(index: number, palette: string[] = CHART_COLORS_PRIMARY): string {
  return palette[index % palette.length];
}
