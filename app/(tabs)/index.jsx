import { StyleSheet, Text, View, Image } from "react-native";
import home_image from "../../assets/img/restaurant_image.png";
import { Colors } from "../../constants/Colors";
import Spacer from "../../components/Spacer";

const Home = () => {
  return (
    <View>
      <Image source={home_image} style={styles.img} />
      <Spacer height={80} backgroundColor={Colors.red} />
      <Text style={styles.text}>Show all locations</Text>
      <Spacer height={10} backgroundColor={Colors.red} />
      <Spacer />
      <Text style={styles.news}>Newsletter</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  img: {
    width: "100%",
    height: undefined,
    aspectRatio: 1.5,
    resizeMode: "cover",
  },
  text: {
    textAlign: "center",
    color: Colors.beige,
    backgroundColor: Colors.red,
  },
  news: {
    marginLeft: 40,
    fontWeight: "bold",
    fontSize: 18,
  },
});
