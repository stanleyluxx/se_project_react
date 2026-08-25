import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../header/Header.jsx";
import Main from "../main/Main.jsx";
import Footer from "../footer/Footer.jsx";
import AddItemModal from "../addItemModal/AddItemModal.jsx";
import LoginModal from "../loginModal/LoginModal.jsx";
import RegisterModal from "../registerModal/RegisterModal.jsx";
import "./App.css";
import ItemModal from "../itemModal/ItemModal.jsx";
import { getWeather } from "../../utils/weatherApi.js";
import { getWeatherCondition } from "../../utils/weatherApi.js";
import { setLocation } from "../../utils/constants";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext.js";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import Profile from "../profile/Profile.jsx";
import ProtectedRoute from "../protectedRoute/ProtectedRoute.jsx";
import DeleteConfirmationModal from "../deleteConfirmationModal/DeleteConfirmationModal.jsx";
import EditProfileModal from "../editProfileModal/EditProfileModal.jsx";
import {
  getClothingItems,
  addClothingItem,
  deleteClothingItem,
  updateUserProfile,
  addCardLike,
  removeCardLike,
} from "../../utils/api.js";
import { authorize, register, checkToken } from "../../utils/auth.js";

function App() {
  const [clothingItems, setClothingItems] = useState([]);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

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
    const token = localStorage.getItem("jwt");
    if (!token) {
      return;
    }

    checkToken(token)
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.error("Token validation failed:", err);
        localStorage.removeItem("jwt");
        setCurrentUser(null);
        setIsLoggedIn(false);
      });
  }, []);

  useEffect(() => {
    // first try to update the coordinates using the browser API; regardless
    // of the result we then fetch the weather. the `setLocation` call also
    // updates the shared `location` object used by `weatherApi`.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation(pos.coords.latitude, pos.coords.longitude);
          getWeather()
            .then((data) => setWeather(data))
            .catch((err) => console.error("Error fetching weather:", err));
        },
        () => {
          // user denied or error, just fetch using default location
          getWeather()
            .then((data) => setWeather(data))
            .catch((err) => console.error("Error fetching weather:", err));
        },
      );
    } else {
      getWeather()
        .then((data) => {
          setWeather(data);
        })
        .catch((err) => {
          console.error("Error fetching weather:", err);
        });
    }
  }, []);

  const weatherType = weather.temp ? getWeatherCondition(weather.temp.F) : "";

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    if (!isLoggedIn) {
      return;
    }
    setActiveModal("add-garment");
  };

  const handleRegister = ({ name, avatar, email, password }) => {
    return register({ name, avatar, email, password })
      .then(() => authorize({ email, password }))
      .then((res) => {
        if (res && res.token) {
          localStorage.setItem("jwt", res.token);
          return checkToken(res.token).then((user) => {
            setCurrentUser(user);
            setIsLoggedIn(true);
            closeActiveModal();
          });
        }
      })
      .catch((err) => {
        console.error("Registration failed:", err);
      });
  };

  const handleLogin = ({ email, password }) => {
    return authorize({ email, password })
      .then((res) => {
        if (res && res.token) {
          localStorage.setItem("jwt", res.token);
          return checkToken(res.token).then((user) => {
            setCurrentUser(user);
            setIsLoggedIn(true);
            closeActiveModal();
          });
        }
      })
      .catch((err) => {
        console.error("Login failed:", err);
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    setIsLoggedIn(false);
    closeActiveModal();
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleUpdateProfile = ({ name, avatar }) => {
    const token = isLoggedIn ? localStorage.getItem("jwt") : null;

    return updateUserProfile({ name, avatar }, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Profile update failed:", err);
      });
  };

  const handleConfirmDelete = () => {
    const token = isLoggedIn ? localStorage.getItem("jwt") : null;

    deleteClothingItem(itemToDelete._id, token)
      .then(() => {
        setClothingItems((prev) =>
          prev.filter((item) => item._id !== itemToDelete._id),
        );
        setItemToDelete(null);
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Error deleting item:", err);
      });
  };

  const handleAddItem = (newItem) => {
    const token = isLoggedIn ? localStorage.getItem("jwt") : null;

    addClothingItem(newItem, token)
      .then((createdItem) => {
        setClothingItems((prev) => [createdItem, ...prev]);
        closeActiveModal();
      })
      .catch((err) => {
        console.error("Error adding item:", err);
      });
  };

  const handleDeleteClick = (card) => {
    if (!isLoggedIn) {
      return;
    }
    setItemToDelete(card);
    setActiveModal("confirm-delete");
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");

    if (isLiked) {
      addCardLike(id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? updatedCard : item)),
          );
        })
        .catch((err) => console.log(err));
    } else {
      removeCardLike(id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item._id === id ? updatedCard : item)),
          );
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              city={weather.city}
              onLoginClick={() => setActiveModal("login")}
              onRegisterClick={() => setActiveModal("register")}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    clothingItems={clothingItems}
                    weatherType={weatherType}
                    temperature={weather.temp}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isAuthorized={isLoggedIn}>
                    <Profile
                      onCardClick={handleCardClick}
                      onCardLike={handleCardLike}
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                      onEditProfile={() => setActiveModal("edit-profile")}
                      onSignOut={handleSignOut}
                    />
                  </ProtectedRoute>
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
          <LoginModal
            isOpen={activeModal === "login"}
            onLogin={handleLogin}
            onCloseModal={closeActiveModal}
          />
          <RegisterModal
            isOpen={activeModal === "register"}
            onRegister={handleRegister}
            onCloseModal={closeActiveModal}
          />
          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            onCloseModal={closeActiveModal}
            onUpdateProfile={handleUpdateProfile}
            currentUser={currentUser}
          />
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            isAuthorized={isLoggedIn}
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
    </CurrentUserContext.Provider>
  );
}

export default App;
