import "./ClothesSection.css";
import ItemCard from "../itemCard/ItemCard.jsx";

export default function ClothesSection({
  clothingItems,
  onCardClick,
  handleAddClick,
}) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__header">
        <p>Your items</p>
        <button
          className="clothes-section__add-button"
          onClick={handleAddClick}
        >
          + Add New
        </button>
      </div>

      <ul className="clothes-section__items">
        {clothingItems.map((filteredCard) => (
          <ItemCard
            key={filteredCard._id}
            item={filteredCard}
            onCardClick={onCardClick}
          />
        ))}
      </ul>
    </div>
  );
}
