import "./SideBar.css";
import userAvatar from "../../assets/avatar-image.svg";

export default function SideBar() {
         
    return (
      <aside className="sideBar">
        <div className="sideBar__user-container">
          <p className="sideBar__user-name">Terrance Tegegne</p>
          <img
            className="sideBar__user-avatar"
            src={userAvatar}
            alt="Avatar Image"
          />
        </div>
      </aside>
    );
}

