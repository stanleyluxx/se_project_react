import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import "./ClothesSection.css";
import ItemCard from "../itemCard/ItemCard.jsx";

export default function ClothesSection({
  clothingItems,
  onCardClick,
  onCardLike,
  handleAddClick,
}) {
  const currentUser = useContext(CurrentUserContext);
  const userItems = clothingItems.filter(
    (item) => currentUser && item.owner === currentUser._id,
  );
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
        {userItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
          />
        ))}
      </ul>
    </div>
  );
}
