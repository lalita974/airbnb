import { AntDesign } from "@expo/vector-icons";

const displayRating = (number) => {
  const tab = [];

  for (i = 0; i < 5; i++) {
    if (i < number) {
      tab.push(<AntDesign name="star" size={14} color="orange" key={i} />);
    } else {
      tab.push(<AntDesign name="star" size={14} color="grey" key={i} />);
    }
  }
  return tab;
};

export default displayRating;
