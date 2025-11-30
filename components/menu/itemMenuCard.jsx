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
      // SCENARIO A: Location is already chosen. Go straight to details.
      router.push({
        pathname: "/itemDetailsPage",
        params: { itemId: item.id }
      });
    } else {
      // SCENARIO B: No location yet. Go to Location page, but PASS the item ID.
      router.push({
        pathname: "/locationSelectionPage", // Ensure this matches your file path
        params: { 
          pendingItemId: item.id // We call it 'pending' because we are holding onto it
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
      
      {/* Name Text */}
      <Text style={tw` text-md font-bold text-black text-center max-w-[150px]`}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
};

export default ItemMenuCard;