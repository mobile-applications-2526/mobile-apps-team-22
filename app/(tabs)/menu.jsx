import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MenuCard from "../../components/menu/menuCard";
import { menuItems } from "../../assets/mockData/mockData";
import tw from "twrnc";

const Menu = () => {
  const types = [...new Set(menuItems.map((item) => item.type))];

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView contentContainerStyle={tw`px-3`}>
        <View style={tw`px-5 py-4 border-b border-gray-200 w-full`}>
          <Text style={tw`text-2xl font-bold`}>Menu</Text>
          <Text style={tw`text-base text-gray-600 mt-1`}>
            Explore our offerings.
          </Text>
        </View>

        {types.map((type) => {
          const itemsOfType = menuItems.filter((item) => item.type === type);
          return (
            <View key={type} style={tw` my-1  `}>
              <Text style={tw`my-3 mx-5 font-bold text-3xl`}>{`${type}${
                type.endsWith("S") ? "" : "S"
              }`}</Text>
              <View style={tw`flex-row flex-wrap justify-between bg-[#EEDAB5] p-3 rounded-3`}>
                {itemsOfType.map((item, idx) => (
                  <View key={item.id ?? idx} style={tw`w-1/2 px-1 my-2 `}>
                    <MenuCard menuItem={item} />
                  </View>
                ))}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Menu;
