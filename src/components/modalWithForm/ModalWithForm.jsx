import React, { useEffect } from "react";
import "./ModalWithForm.css";

function ModalWithForm({
  title,
  buttonText,
  children,
  isOpen,
  onClose,
  onSubmit,
}) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("modal")) {
      onClose();
    }
  };

  return (
    <div
      className={`modal ${isOpen ? "modal_opened" : ""}`}
      onClick={handleOverlayClick}
    >
      <form onSubmit={onSubmit} className="modal__form">
        <button className="modal__close" type="button" onClick={onClose} />

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
