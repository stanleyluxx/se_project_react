// Default coordinates; these will be mutated when the app learns the
// user's actual position. We export them as `let` bindings so imports see
// the updated values automatically.
let latitude = 40.7128; // NYC
let longitude = -74.006;

export function setLocation(lat, lon) {
  latitude = lat;
  longitude = lon;
}

export { latitude, longitude };

export const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
