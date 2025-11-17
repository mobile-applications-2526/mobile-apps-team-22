import { View, Text } from "react-native";
import { menuItems } from "../../assets/mockData/mockData";
import MenuCard from "../../components/menu/menuCard";
import tw from 'twrnc';

const Menu = () => {
  return (
    <View className={tw`flex-1 p-4 bg-white`}>
      <Text className={tw`text-lg font-semibold mb-2`}>menu</Text>
      <MenuCard menuItem={menuItems[0]} />
    </View>
  );
};

export default Menu;
