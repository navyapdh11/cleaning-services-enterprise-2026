/**
 * Google Maps Loader with promise caching
 * Loads Google Maps JS API once per session and caches the result
 * Uses @googlemaps/js-api-loader for reliable script injection
 */
import { Loader } from '@googlemaps/js-api-loader';
import { publicConfig } from '@/lib/config/public';

let loaderPromise: Promise<void> | null = null;

export function loadGoogleMaps(): Promise<void> {
  if (!loaderPromise) {
    const loader = new Loader({
      apiKey: publicConfig.googleMapsApiKey,
      version: 'weekly',
      region: publicConfig.googleMapsRegion,
      language: publicConfig.googleMapsLanguage,
      libraries: ['places', 'geometry', 'marker'],
    });
    loaderPromise = loader.load();
  }
  return loaderPromise;
}

/**
 * Reset the cached loader (useful for testing or hot reloading)
 */
export function resetGoogleMapsLoader(): void {
  loaderPromise = null;
}
