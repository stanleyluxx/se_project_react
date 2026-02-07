import headerLogo from "../../assets/wtwr-logo.svg";
import userAvatar from "../../assets/avatar-image.svg";
import ToggleSwitch from "../toggleSwitch/ToggleSwitch";
import "./Header.css";

function Header({ handleAddClick, city }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="App logo" />
      <p className="header__date-and-location">
        {currentDate}, {city}
      </p>

      <div className="header__nav">
        <ToggleSwitch />
        <button
          type="button"
          onClick={handleAddClick}
          className="header__add-clothes-button"
        >
          + Add Clothes
        </button>
        <div className="header__user-container">
          <p className="header__user-name">Terrance Tegegne</p>
          <img
            className="header__user-avatar"
            src={userAvatar}
            alt="Avatar Image"
          />
        </div>
      </div>
    </header>
  );
}
export default Header;
