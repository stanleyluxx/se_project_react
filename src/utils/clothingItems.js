import capImage from "../assets/cap.png";
import shirtImage from "../assets/shirt.png";
import shortsImage from "../assets/shorts.png";
import sneakersImage from "../assets/sneakers.png";
import pantsImage from "../assets/jeans.png";
import coatImage from "../assets/coat.png";
import hoodieImage from "../assets/hoodie.png";
import bootImage from "../assets/boot.png";
import jacketImage from "../assets/jacket.png";
import scarfImage from "../assets/scarf.png";
import loafersImage from "../assets/loafers.png";
import sunglassesImage from "../assets/sunglasses.png";
import skirtImage from "../assets/skirt.png";
import sweatshirtImage from "../assets/sweatshirt.png";
import sandalsImage from "../assets/sandals.png";
import dressImage from "../assets/dress.png";

const defaultClothingItems = [
  {
    _id: 1,
    name: "Cap",
    weather: "hot",
    imageUrl: capImage,
  },
  {
    _id: 2,
    name: "shirt",
    weather: "hot",
    imageUrl: shirtImage,
  },
  {
    _id: 3,
    name: "shorts",
    weather: "hot",
    imageUrl: shortsImage,
  },
  { _id: 4, name: "sneakers", weather: "warm", imageUrl: sneakersImage },
  { _id: 5, name: "pants", weather: "cold", imageUrl: pantsImage },
  { _id: 6, name: "coat", weather: "cold", imageUrl: coatImage },
  { _id: 7, name: "hoodie", weather: "cold", imageUrl: hoodieImage },
  { _id: 8, name: "boots", weather: "cold", imageUrl: bootImage },
  { _id: 9, name: "jacket", weather: "cold", imageUrl: jacketImage },
  { _id: 10, name: "scarf", weather: "cold", imageUrl: scarfImage },
  { _id: 11, name: "loafers", weather: "warm", imageUrl: loafersImage },
  {
    _id: 12,
    name: "sunglasses",
    weather: "hot",
    imageUrl: sunglassesImage,
  },
  { _id: 13, name: "skirt", weather: "hot", imageUrl: skirtImage },
  { _id: 14, name: "sandals", weather: "hot", imageUrl: sandalsImage },
  { _id: 15, name: "sweatshirt", weather: "warm", imageUrl: sweatshirtImage },
  { _id: 16, name: "dress", weather: "hot", imageUrl: dressImage },
];

export default defaultClothingItems;
