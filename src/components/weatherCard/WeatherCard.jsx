import { useContext } from "react";
import sunny from "../../assets/sunny.png";
import "./WeatherCard.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";


function WeatherCard({ temperature }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  if (!temperature) {
    return null;
  }


  return (
    <div className="weather-card">
      <img className="weather-card__image" src={sunny} alt="sunny card image" />
      <p className="weather-card__temp">
        {temperature[currentTemperatureUnit]}°
        {currentTemperatureUnit}
      </p>
    </div>
  );
}

export default WeatherCard;
