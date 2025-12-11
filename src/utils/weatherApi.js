import { latitude, longitude, APIkey } from "./constants";

/* Fetch weather data */
export const getWeather = () => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  )
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Error: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      return {
        city: data.name,
        temperature: Math.round(data.main.temp),
        condition: getWeatherCondition(data.main.temp),
      };
    });
};

/* Define weather type */
export const getWeatherCondition = (temp) => {
  if (temp >= 86) return "hot";
  if (temp >= 66 && temp < 86) return "warm";
  return "cold";
};
