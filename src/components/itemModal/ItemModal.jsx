import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import "./ItemModal.css";

function ItemModal({
  activeModal,
  onClose,
  onDeleteClick,
  card,
  isAuthorized,
}) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = Boolean(
    currentUser && card.owner && currentUser._id === card.owner,
  );
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal")) {
      onClose();
    }
  };

  return (
    <div
      className={`modal ${activeModal === "preview" ? "modal_opened" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="modal__content modal__content_type_image">
        <button
          className="modal__close"
          type="button"
          onClick={onClose}
        ></button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <div className="modal__info">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather:{card.weather}</p>
          </div>
          {isAuthorized && isOwn && (
            <button
              className="modal__delete-button"
              type="button"
              onClick={() => onDeleteClick(card)}
            >
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
