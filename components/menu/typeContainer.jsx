import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import ItemMenuCard from '../menu/itemMenuCard.jsx';
import tw from 'twrnc';

const TypeContainer = ({ title, items, onPressSeeMore }) => {
  const itemsToDisplay = items.slice(0, 2);

  return (
    <View style={tw`mb-6 w-full`}>
      <View style={tw`flex-row items-end justify-between px-5 mb-2`}>
        <Text style={tw`text-xl font-bold text-black`}>
          {title}
        </Text>
        
        <TouchableOpacity onPress={onPressSeeMore}>
          <Text style={tw`text-xs text-gray-500 font-semibold`}>See more</Text>
        </TouchableOpacity>
      </View>

      <View style={tw`h-[1px] bg-gray-300 mx-5 mb-2`} />

      <View style={tw`flex-row justify-around px-2`}>
        {itemsToDisplay.map((item) => (
          <ItemMenuCard key={item.id} item={item} />
        ))}
      </View>
    </View>
  );
};

export default TypeContainer;