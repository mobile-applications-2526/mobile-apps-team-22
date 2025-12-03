import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native'; 
import tw from 'twrnc';
import { Image } from 'expo-image';
import { useNavigation } from '@react-navigation/native'; 
import { useLocation } from '../../context/LocationContext';
import { router } from 'expo-router';

const ItemMenuCard = ({ item }) => {

  const navigation = useNavigation(); 
  const { selectedLocation } = useLocation();

  const handlePress = () => {
    if (selectedLocation) {
      router.push({
        pathname: "/itemDetailsPage",
        params: { itemId: item.id }
      });
    } else {
      router.push({
        pathname: "/locationSelectionPage", 
        params: { 
          pendingItemId: item.id
        }
      });
    }
  };

  return (
    <TouchableOpacity 
      onPress={handlePress} 
      style={tw`flex-col items-center`}
    >
      <View 
        style={tw`w-[170px] h-[170px] items-center justify-center shadow-sm`}
      >
        <Image 
          source={item.image} 
          style={{ width: 160, height: 160, borderRadius: 16}}
          contentFit="cover"
        />
      </View>
      
      <Text style={tw` text-md font-bold text-black text-center max-w-[150px]`}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

export default ItemMenuCard;