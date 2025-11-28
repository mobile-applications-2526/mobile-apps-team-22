import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { Image } from 'expo-image';

import RubaFrontImage from '../../assets/img/RubaFront.jpeg';

const LocationBigCard = ({ location, onPress }) => {

  if (!location) {
    return null;
  }

  return (
    // CHANGED: Added 'h-40' (10rem/160px) to the CARD ITSELF.
    // This fixes the height for the entire component.
    <View style={tw`flex-row rounded-2xl overflow-hidden shadow-lg h-40`}>
      
      {/* Left Side: Info (50% width) */}
      {/* This 'flex-1' View will now be forced to 'h-40' by its parent */}
      <View style={tw`bg-[#E1503F] flex-1 p-4 justify-between`}>
        <View>
          <Text style={tw`text-[#EEDAB5] font-bold text-xl`}>
            {location.name}
          </Text>
          <Text style={tw`text-[#F5F2EC] font-light text-md mt-1`}>
            {location.address}
          </Text>
          <Text style={tw`text-[#F5F2EC] font-medium text-xs mt-1`}>
            {location.closes}
          </Text>
        </View>

        <TouchableOpacity 
          // 'mt-2' is fine again now that the container has a fixed height
          style={tw`bg-[#EEDAB5] rounded-full py-1 px-6 self-start mt-2`}
          onPress={onPress}
        >
          <Text style={tw`text-[#E1503F] font-medium text-base`}>
            Choose
          </Text>
        </TouchableOpacity>
      </View>

      {/* Right Side: Image (50% width) */}
      {/* This 'flex-1' View will also be forced to 'h-40' */}
      <View style={tw`flex-1`}>
        <Image 
          source={RubaFrontImage} 
          // CHANGED: Image fills its parent container (which is now 'h-40')
          style={tw`w-full h-full`} 
          // Corrected resizeMode
          contentFit="cover" 
        />
      </View>
    </View>
  );
};

export default LocationBigCard;