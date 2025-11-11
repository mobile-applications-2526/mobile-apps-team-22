import React from 'react';
import { View, Text, Image } from 'react-native';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import rubaLogoWhite from '../assets/img/RubaTailBeige.png'; // Check this path!

const LocationCard = ({location}) => {

    if (!location) {
    return null;
    }

    return (
    
        <View 
        style={tw`absolute left-15 right-15 top-[-8] shadow-lg rounded-xl z-10`}
        >
            
            <View style={tw`bg-[#E1503F] flex-row items-center p-2 rounded-t-xl`}>
        <Image source={rubaLogoWhite} style={tw`w-7 h-7`} />
        <View style={tw`ml-2`}>
          {/* 2. Use the data from the prop */}
          <Text style={tw`text-white font-bold text-md`}>{location.name}</Text>
          <View style={tw`flex-row items-center`}>
            {/* 3. We can even make the dot conditional! */}
            {location.status === 'Open' && (
              <View style={tw`w-2 h-2 bg-green-500 rounded-full mr-1`} />
            )}
            {location.status === 'Closed' && (
              <View style={tw`w-2 h-2 bg-red-900 rounded-full mr-1`} />
            )}
            <Text style={tw`text-white text-xs`}>{location.status}</Text>
            <Text style={tw`text-white text-xs opacity-90`}> • {location.closes}</Text>
          </View>
        </View>
      </View>

      {/* --- CARD BOTTOM (Beige) --- */}
      <View style={tw`bg-[#EEDAB5] flex-row rounded-b-xl h-12`}>
        <View style={tw`flex-1 items-center justify-center p-2`}>
          <Ionicons name="bag-handle-outline" size={20} color="#333" />
          <Text style={tw`font-semibold text-gray-800 text-xs`}>Take Out</Text>
        </View>
        
        <View style={tw`w-px bg-gray-300 my-1.5`} />
        
        <View style={tw`flex-1 items-center justify-center p-2`}>
          <Ionicons name="restaurant-outline" size={20} color="#333" />
          <Text style={tw`font-semibold text-gray-800 text-xs`}>Table Service</Text>
        </View>
      </View>
        </View>
    );
};

export default LocationCard;