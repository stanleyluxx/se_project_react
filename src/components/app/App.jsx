import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../header/Header.jsx";
import Main from "../main/Main.jsx";
import Footer from "../footer/Footer.jsx";
import ModalWithForm from "../modalWithForm/ModalWithForm.jsx";
import AddItemModal from "../addItemModal/AddItemModal.jsx";
import "./App.css";
import ItemModal from "../itemModal/ItemModal.jsx";
import { getWeather } from "../../utils/weatherApi.js";
import { getWeatherCondition } from "../../utils/weatherApi.js";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";
import Profile from "../profile/Profile.jsx";
import DeleteConfirmationModal from "../deleteConfirmationModal/DeleteConfirmationModal.jsx";
import {
  getClothingItems,
  addClothingItem,
  deleteClothingItem,
} from "../../utils/api.js";

function App() {
  const [count, setCount] = useState(0);
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [itemToDelete, setItemToDelete] = useState(null);

  const [weather, setWeather] = useState({
    city: "",
    temp: null,
    condition: "",
  });
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  useEffect(() => {
    getClothingItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch((err) => {
        console.error("Error fetching items:", err);
      });
  }, []);

  useEffect(() => {
    getWeather()
      .then((data) => {
        setWeather(data);
      })
      .catch((err) => {
        console.error("Error fetching weather:", err);
      });
  }, []);

  const weatherType = weather.temp ? getWeatherCondition(weather.temp.F) : "";

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

  const handleConfirmDelete = () => {
    deleteClothingItem(itemToDelete._id)
      .then(() => {
        setClothingItems((prev) =>
          prev.filter((item) => item.id !== itemToDelete._id),
        );
        setItemToDelete(null);
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Error deleting item:", err);
      });
  };

  const handleAddItem = (newItem) => {
    addClothingItem(newItem)
      .then((createdItem) => {
        setClothingItems((prev) => [createdItem, ...prev]);
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Error adding item:", err);
      });
  };

  const handleDeleteClick = (card) => {
    setItemToDelete(card);
    setActiveModal("confirm-delete");
  };

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{ currentTemperatureUnit, handleToggleSwitchChange }}
    >
      <div className="page">
        <div className="page__content">
          <Header handleAddClick={handleAddClick} city={weather.city} />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  clothingItems={clothingItems}
                  weatherType={weatherType}
                  temperature={weather.temp}
                  onCardClick={handleCardClick}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  onCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  handleAddClick={handleAddClick}
                />
              }
            />
          </Routes>
          <Footer />
        </div>
        <AddItemModal
          isOpen={activeModal === "add-garment"}
          onCloseModal={closeActiveModal}
          onAddItem={handleAddItem}
        />
        <ItemModal
          activeModal={activeModal}
          card={selectedCard}
          onClose={closeActiveModal}
          onDelete={handleConfirmDelete}
          onDeleteClick={handleDeleteClick}
        />
        <DeleteConfirmationModal
          isOpen={activeModal === "confirm-delete"}
          onClose={closeActiveModal}
          onConfirm={handleConfirmDelete}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
