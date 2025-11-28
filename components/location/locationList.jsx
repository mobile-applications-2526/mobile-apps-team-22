import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Linking } from 'react-native';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';

import { locations } from '../../assets/mockData/mockData.js';

const LocationCard = ({ item }) => {
  
  const handleGetDirections = () => {
    Linking.openURL(`https://maps.google.com/?q=${item.address}`);
  };

  return (
    <View style={tw`flex-row justify-between items-center py-5 border-b border-gray-200`}>
      {/* Left Side: Info */}
      <View style={tw`flex-1 mr-4`}>
        <View style={tw`flex-row items-center mb-1`}>
          <Text style={tw`text-lg font-semibold uppercase`}>{item.name}📍</Text>
          
        </View>
        <Text style={tw`text-base text-gray-700 mb-1`}>{item.address}</Text>
        <View style={tw`flex-row items-center`}>
          <Ionicons name="time-outline" size={16} color="gray" style={tw`mr-1`} />
          <Text style={tw`text-sm text-gray-500`}>Every Day: {item.opening} - {item.closing}</Text>
        </View>
      </View>

      {/* Right Side: Button */}
      <TouchableOpacity
        style={tw`bg-[#E1503F] rounded-full py-3 px-4`}
        onPress={handleGetDirections}
      >
        <Text style={tw`text-[#EEDAB5] font-semibold`}>Get Directions</Text>
      </TouchableOpacity>
    </View>
  );
};

const LocationList = () => {
  return (
    <FlatList
      data={locations}
      renderItem={({ item }) => <LocationCard item={item} />}
      keyExtractor={(item) => item.id}
      style={tw`px-5`}
    />
  );
};

export default LocationList;