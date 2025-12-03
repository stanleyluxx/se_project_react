import capImage from "../assets/cap.png";
import shirtImage from "../assets/shirt.png";
import shortsImage from "../assets/shorts.png";
import sneakersImage from "../assets/sneakers.png";

const defaultClothingItems = [
  {
    _id: 1,
    name: "Cap",
    weather: "warm",
    imageUrl: capImage,
  },
  {
    _id: 2,
    name: "shirt",
    weather: "warm",
    imageUrl: shirtImage,
  },
  {
    _id: 3,
    name: "shorts",
    weather: "warm",
    imageUrl: shortsImage,
  },
  { _id: 4, name: "sneakers", weather: "warm", imageUrl: sneakersImage },
];

export default defaultClothingItems;
