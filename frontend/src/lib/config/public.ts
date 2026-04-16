/**
 * Public configuration - safe for client bundles
 * Only includes NEXT_PUBLIC_* environment variables
 */
export const publicConfig = {
  googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
  googleMapsMapId: process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID ?? '',
  googleMapsRegion: process.env.NEXT_PUBLIC_GOOGLE_MAPS_REGION ?? 'AU',
  googleMapsLanguage: process.env.NEXT_PUBLIC_GOOGLE_MAPS_LANGUAGE ?? 'en-AU',
  apiUrl: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api/v1',
} as const;
