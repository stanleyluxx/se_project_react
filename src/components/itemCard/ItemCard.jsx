import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const isLiked =
    !!currentUser && Array.isArray(item.likes)
      ? item.likes.some((like) =>
          typeof like === "string"
            ? like === currentUser._id
            : like._id
              ? like._id === currentUser._id
              : false,
        )
      : false;

  const handleLike = (evt) => {
    evt.stopPropagation();
    if (onCardLike) {
      onCardLike({ id: item._id, isLiked: !isLiked });
    }
  };

  const likeButtonClassName = `item-card__like-button ${
    isLiked ? "item-card__like-button--active" : ""
  }`;

  return (
    <div className="item-card" onClick={handleCardClick}>
      <img src={item.imageUrl} alt={item.name} className="item-card__image" />
      <span className="item-card__title">{item.name}</span>
      <button
        type="button"
        className={likeButtonClassName}
        aria-label={isLiked ? "Unlike item" : "Like item"}
        onClick={handleLike}
      >
        <svg viewBox="0 0 20 18" aria-hidden="true">
          <path d="M10.0009 16L2.36492 8.66936C1.75583 8.08462 1.34976 7.4048 1.14673 6.6299C0.948646 5.855 0.951122 5.08486 1.15415 4.31947C1.35719 3.54932 1.76078 2.87901 2.36492 2.30853C2.98393 1.72379 3.68959 1.33634 4.48191 1.14619C5.27919 0.951272 6.07399 0.951272 6.86631 1.14619C7.66359 1.3411 8.37173 1.72855 8.99073 2.30853L10.0009 3.24982L11.0112 2.30853C11.6351 1.72855 12.3432 1.3411 13.1356 1.14619C13.9279 0.951272 14.7202 0.951272 15.5125 1.14619C16.3098 1.33634 17.018 1.72379 17.637 2.30853C18.2411 2.87901 18.6447 3.54932 18.8477 4.31947C19.0508 5.08486 19.0508 5.855 18.8477 6.6299C18.6496 7.4048 18.2461 8.08462 17.637 8.66936L10.0009 16Z" />
        </svg>
      </button>
    </div>
  );
}

export default ItemCard;
