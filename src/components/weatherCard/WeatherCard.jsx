import sunny from "../../assets/sunny.png";
import './WeatherCard.css';

function WeatherCard() {
    return (
      <div className="weather-card">
        <img
          className="weather-card__image"
          src={sunny}
          alt="sunny card image"
        />
        <p className="weather-card__temp">75 &deg; F </p>
      </div>
    );
}

export default WeatherCard;