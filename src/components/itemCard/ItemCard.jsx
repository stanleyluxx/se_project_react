import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  return (
    <div className="item-card" onClick={handleCardClick}>
      <img src={item.imageUrl} alt={item.name} className="item-card__image" />
      <span className="item-card__title">{item.name}</span>
    </div>
  );
}

export default ItemCard;
