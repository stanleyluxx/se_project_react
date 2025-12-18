import WeatherCard from "../weatherCard/WeatherCard";
import ItemCard from "../itemCard/ItemCard";
import "./Main.css";

function Main({ clothingItems, onCardClick, weatherType, temperature, }) {
  const filteredItems = clothingItems.filter(
    (item) => item.weather === weatherType
  );

  const weatherMessages = {
    hot: "It’s hot — stay cool!",
    warm: "Nice weather — dress light.",
    cold: "It’s cold — bundle up!",
  };
  
  return (
    <main className="main">
      <WeatherCard temperature={temperature} />
      <p className="main__weather-message">
        Today is {Math.round(temperature)}°F / {weatherMessages[weatherType]}
      </p>
      <section className="main__item-cards">
        {filteredItems.map((item) => (
          <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
        ))}
      </section>
    </main>
  );
  
}

export default Main;
