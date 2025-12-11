import { useState, useEffect } from "react";
import Header from "../header/Header.jsx";
import Main from "../main/Main.jsx";
import Footer from "../footer/Footer.jsx";
import defaultClothingItems from "../../utils/clothingItems.js";
import ModalWithForm from "../modalWithForm/modalWithForm.jsx";
import "./App.css";
import ItemModal from "../itemModal/ItemModal.jsx";
import { getWeather } from "../../utils/weatherApi.js";

function App() {
  const [count, setCount] = useState(0);
  const [clothingItems, setClothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddClick={handleAddClick} />

        <Main clothingItems={clothingItems} onCardClick={handleCardClick} />

        <Footer />
      </div>
      <ModalWithForm
        title="New Garment"
        name="add-garment"
        buttonText="Add Garment"
        activeModal={activeModal}
        closeActiveModal={closeActiveModal}
      >
        <label className="modal__label">
          Name
          <input
            type="text"
            className="modal__input"
            placeholder="Name"
            required
          />
        </label>

        <label className="modal__label">
          Image URL
          <input
            type="url"
            className="modal__input"
            placeholder="Image URL"
            required
          />
        </label>

        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather type:</legend>

          <label className="modal__radio-label">
            <input type="radio" value="hot" className="modal__radio-input" />
            Hot
          </label>

          <label className="modal__radio-label">
            <input type="radio" value="warm" className="modal__radio-input" />
            Warm
          </label>

          <label className="modal__radio-label">
            <input type="radio" value="cold" className="modal__radio-input" />
            Cold
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        onClose={closeActiveModal}
      />
    </div>
  );
}

export default App;
