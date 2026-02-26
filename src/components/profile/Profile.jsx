import SideBar from "../sideBar/SideBar";
import ClothesSection from "../clothesSection/ClothesSection";
import "./Profile.css";

export default function Profile({
  clothingItems,
  onCardClick,
  handleAddClick,
}) {
  return (
    <section className="Profile">
      <SideBar />
      <ClothesSection
        onCardClick={onCardClick}
        clothingItems={clothingItems}
        handleAddClick={handleAddClick}
      />
    </section>
  );
}
