import SideBar from "../sideBar/SideBar";
import ClothesSection from "../clothesSection/ClothesSection";
import "./Profile.css";

export default function Profile({
  clothingItems,
  onCardClick,
  onCardLike,
  handleAddClick,
  onEditProfile,
  onSignOut,
}) {
  return (
    <section className="Profile">
      <SideBar onEditProfile={onEditProfile} onSignOut={onSignOut} />
      <ClothesSection
        onCardClick={onCardClick}
        onCardLike={onCardLike}
        clothingItems={clothingItems}
        handleAddClick={handleAddClick}
      />
    </section>
  );
}
