import { View } from "react-native";
import { Colors } from "../constants/Colors";

const Spacer = ({
  width = "100%",
  height = 20,
  backgroundColor = Colors.backgroundColor,
}) => {
  return <View style={{ width, height, backgroundColor }} />;
};

export default Spacer;
