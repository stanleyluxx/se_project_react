import { useContext } from "react";
import WeatherCard from "../weatherCard/WeatherCard";
import ItemCard from "../itemCard/ItemCard";
import "./Main.css";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function Main({
  clothingItems,
  onCardClick,
  onCardLike,
  weatherType,
  temperature,
}) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  if (!temperature) {
    return <p>Loading weather...</p>;
  }

  const weatherMessages = {
    hot: "It’s hot — stay cool!",
    warm: "Nice weather — dress light.",
    cold: "It’s cold — bundle up!",
  };

  return (
    <main className="main">
      <WeatherCard temperature={temperature} />
      <p className="main__weather-message">
        Today is {temperature[currentTemperatureUnit]}°{currentTemperatureUnit}{" "}
        / {weatherMessages[weatherType]}
      </p>
      <section className="main__item-cards">
        {clothingItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
