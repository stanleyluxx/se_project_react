import sunny from "../../assets/sunny.png";
import './WeatherCard.css';

function WeatherCard({temperature}) {

    return (
      <div className="weather-card">
        <img
          className="weather-card__image"
          src={sunny}
          alt="sunny card image"
        />
        <p className="weather-card__temp">{Math.round(temperature)}°F</p>
      </div>
    );
}

export default WeatherCard;