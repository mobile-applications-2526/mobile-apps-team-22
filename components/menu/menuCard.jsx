import React from "react";
import { View, Text } from "react-native";
import tw from "twrnc";
import { Image } from "expo-image";

const CARD_WIDTH = 160;
const CARD_HEIGHT = 180;

const MenuCard = ({ menuItem }) => {
  return (
    <View
      style={[
        tw`bg-[#E1503F] rounded-lg overflow-hidden border-[1px] border-gray-200 shadow-lg`,
        { width: CARD_WIDTH, height: CARD_HEIGHT },
      ]}
    >
      <View
        style={tw`h-3/5 bg-[#EEDAB5] items-center justify-center`}
      >
        <Image
          source={menuItem.image}
          style={tw`w-full h-full`}
          contentFit="cover"
        />
      </View>

      <View style={tw`p-3 flex-1 justify-center items-center`}>
        <Text style={tw`text-[#F5F2EC] font-semibold text-center`}>
          {menuItem.name}
        </Text>
      </View>
    </View>
  );
};

export default MenuCard;