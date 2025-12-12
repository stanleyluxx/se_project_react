import WeatherCard from "../weatherCard/WeatherCard";
import ItemCard from "../itemCard/ItemCard";
import "./Main.css";

function Main({ clothingItems, onCardClick }) {
  const filteredItems = clothingItems.filter(
    (item) => item.weather === weather
  );
  
  return (
    <main className="main">
      <WeatherCard />
      <p className="main__weather-message">
        Today is 75° F / You may want to wear:
      </p>
      <section className="main__item-cards">
        {clothingItems.map((item) => (
          <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
        ))}
      </section>
    </main>
  );
}

export default Main;
