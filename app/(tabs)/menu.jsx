import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MenuCard from "../../components/menu/menuCard";
import { menuItems } from "../../assets/mockData/mockData";
import tw from "twrnc";

const Menu = () => {
  const types = [...new Set(menuItems.map((item) => item.type))];

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <ScrollView contentContainerStyle={tw`px-5`}>
        <View style={tw`px-5 py-4 border-b border-gray-200 w-full`}>
          <Text style={tw`text-2xl font-bold`}>Menu</Text>
          <Text style={tw`text-base text-gray-600 mt-1`}>
            Explore our offerings.
          </Text>
        </View>

        {types.map((type) => {
          const itemsOfType = menuItems.filter((item) => item.type === type);
          return (
            <View key={type}>
              <Text style={tw`mt-10 mx-5 font-bold text-xl`}>{`${type}${
                type.endsWith("s") ? "" : "s"
              }`}</Text>
              <View style={tw`flex-row flex-wrap justify-between`}>
                {itemsOfType.map((item, idx) => (
                  <View key={item.id ?? idx} style={tw`w-1/2 p-1 my-4 `}>
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
