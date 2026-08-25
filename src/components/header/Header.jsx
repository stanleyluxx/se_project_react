import headerLogo from "../../assets/wtwr-logo.svg";
import { useContext } from "react";
import ToggleSwitch from "../toggleSwitch/ToggleSwitch";
import { NavLink } from "react-router-dom";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import "./Header.css";

function Header({ handleAddClick, city, onLoginClick, onRegisterClick }) {
  const currentUser = useContext(CurrentUserContext);
  const isLoggedIn = Boolean(currentUser);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <NavLink to="/" className="header__logo-link">
        <img className="header__logo" src={headerLogo} alt="App logo" />
      </NavLink>
      <p className="header__date-and-location">
        {currentDate}, {city}
      </p>

      <div className="header__nav">
        <ToggleSwitch />
        {isLoggedIn ? (
          <>
            <button
              type="button"
              onClick={handleAddClick}
              className="header__add-clothes-button"
            >
              + Add Clothes
            </button>
            <div className="header__user-container">
              <NavLink to="/profile" className="header__user-name-link">
                <p className="header__user-name">{currentUser.name}</p>
              </NavLink>
              {currentUser.avatar ? (
                <img
                  className="header__user-avatar"
                  src={currentUser.avatar}
                  alt={`${currentUser.name}'s avatar`}
                />
              ) : (
                <span
                  className="header__user-avatar-placeholder"
                  aria-hidden="true"
                >
                  {currentUser.name?.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
          </>
        ) : (
          <div className="header__auth-container">
            <button
              type="button"
              className="header__auth-button"
              onClick={onRegisterClick}
            >
              Sign Up
            </button>
            <button
              type="button"
              className="header__auth-button"
              onClick={onLoginClick}
            >
              Log In
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
export default Header;
