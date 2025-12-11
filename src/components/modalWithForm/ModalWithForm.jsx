import React, { useEffect } from "react";
import "./ModalWithForm.css";

function ModalWithForm({
  title,
  name,
  buttonText,
  children,
  activeModal,
  closeActiveModal,
}) {
  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal")) {
      closeActiveModal();
    }
  };

  return (
    <div className={`modal ${activeModal == "add-garment" && "modal_opened"}`}
      onClick={handleOverlayClick}>
      <form className="modal__form">
        <button
          className="modal__close"
          type="button"
          onClick={closeActiveModal}
        ></button>

        <h2 className="modal__title">{title}</h2>

        {/* If children exist, render them */}
        {children}

        <button className="modal__add-clothes-button" type="submit">
          {buttonText}
        </button>
      </form>
    </div>
  );
}

export default ModalWithForm;
