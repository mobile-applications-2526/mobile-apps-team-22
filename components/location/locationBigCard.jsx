import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

import RubaFrontImage from '../../assets/img/RubaFront.jpeg';

const LocationBigCard = ({ location, onPress }) => {

  if (!location) {
    return null;
  }

  return (
    <View style={tw`flex-row rounded-2xl overflow-hidden shadow-lg py-2`}>
      {/* Left Side: Info */}
      <View style={tw`bg-[#E1503F] flex-1 p-5 justify-between`}>
        <View>
          <Text style={tw`text-[#F5F2EC] font-bold text-xl`}>
            {location.name}
          </Text>
          <Text style={tw`text-[#F5F2EC] font-semibold text-md mt-1`}>
            {location.address}
          </Text>
          <Text style={tw`text-[#F5F2EC] font-semibold text-xs mt-1`}>
            {location.closes}
          </Text>
        </View>

        <TouchableOpacity 
          style={tw`bg-[#F5F2EC] rounded-full py-1 px-6 self-start mt-2`}
          onPress={onPress}
        >
          <Text style={tw`text-[#E1503F] font-bold text-base`}>
            Choose
          </Text>
        </TouchableOpacity>
      </View>

      {/* Right Side: Image */}
      <View style={tw`flex-1`}>
        <Image 
          source={RubaFrontImage} 
          style={tw`w-full h-40`} 
          resizeMode="c" 
        />
      </View>
    </View>
  );
};

export default LocationBigCard;