import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import "./SideBar.css";

export default function SideBar({ onEditProfile, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <aside className="sideBar">
      <div className="sideBar__user-container">
        <div className="sideBar__user-info">
          <p className="sideBar__user-name">
            {currentUser ? currentUser.name : "User"}
          </p>
          <button
            type="button"
            className="sideBar__edit-button"
            onClick={onEditProfile}
          >
            Edit profile
          </button>
          <button
            type="button"
            className="sideBar__sign-out-button"
            onClick={onSignOut}
          >
            Sign out
          </button>
        </div>
        {currentUser?.avatar ? (
          <img
            className="sideBar__user-avatar"
            src={currentUser.avatar}
            alt={`${currentUser.name}'s avatar`}
          />
        ) : (
          <div className="sideBar__user-avatar-placeholder" aria-hidden="true">
            {currentUser?.name?.charAt(0).toUpperCase() || "U"}
          </div>
        )}
      </div>
    </aside>
  );
}
