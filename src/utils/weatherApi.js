import { latitude, longitude, apiKey } from "./constants";
import { handleServerResponse } from "../utils/api";

/* Fetch weather data */
export const getWeather = () => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`
  )
    .then(handleServerResponse)
    .then((data) => {
      return {
        city: data.name,
        temp: {
          F: Math.round(data.main.temp),
          C: Math.round((data.main.temp - 32) * 5 / 9),
        },
        condition: data.weather[0].main,
      };
    });
  };

/* Define weather type */
export const getWeatherCondition = (temp) => {
  if (temp >= 86) return "hot";
  if (temp >= 66 && temp < 86) return "warm";
  return "cold";
};


