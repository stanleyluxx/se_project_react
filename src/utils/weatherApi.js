import { latitude, longitude, apiKey } from "./constants";

/* Fetch weather data */
export const getWeather = () => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`
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
        temp: Number(data.main.temp),
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


