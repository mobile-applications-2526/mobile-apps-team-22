import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';

import { useLocation } from '../../context/LocationContext';
import { useCart } from '../../context/CartContext'; 
import rubaLogoWhite from '../../assets/img/RubaTailBeige.png';

import CustomAlert from '../customAlert.jsx';

const LocationCard = ({ location }) => {
  const router = useRouter();
  const { selectedLocation, setSelectedLocation } = useLocation();
  const { cartItems, clearCart } = useCart(); 

  const [isAlertVisible, setAlertVisible] = useState(false);

  if (!location) return null;

  const handleTakeOutPress = () => {

    const isSameLocation = selectedLocation && selectedLocation.id === location.id;
    const isCartEmpty = cartItems.length === 0;

    if (isCartEmpty || isSameLocation) {
      setSelectedLocation(location);
      router.push('/(tabs)/menu');
      return;
    }

    setAlertVisible(true);
  };

  const handleConfirmSwitch = () => {
    clearCart();
    setSelectedLocation(location);
    setAlertVisible(false);
    router.push('/(tabs)/menu');
  };

  return (
    <>
      <CustomAlert 
        visible={isAlertVisible}
        title="Start a new order?"
        message={`You have items in your cart from ${selectedLocation?.name}. Switching to ${location.name} will clear your current cart.`}
        onCancel={() => setAlertVisible(false)}
        onConfirm={handleConfirmSwitch}
      />

      <View style={tw`absolute left-15 right-15 top-[-8] shadow-lg rounded-xl z-10`}>
        <View style={tw`bg-[#E1503F] flex-row items-center p-2 rounded-t-xl`}>
          <Image source={rubaLogoWhite} style={tw`w-7 h-7`} />

          <View style={tw`ml-2`}>
            <Text style={tw`text-white font-bold text-md`}>{location.name}</Text>

            <View style={tw`flex-row items-center`}>
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

        <View style={tw`bg-[#EEDAB5] flex-row rounded-b-xl h-12`}>
          <TouchableOpacity 
            onPress={handleTakeOutPress} 
            style={tw`flex-1 items-center justify-center p-2`}
          >
            <Ionicons name="bag-handle-outline" size={20} color="#333" />
            <Text style={tw`font-semibold text-gray-800 text-xs`}>Take Out</Text>
          </TouchableOpacity>

          <View style={tw`w-px bg-black my-1.5`} />

          <View style={tw`flex-1 items-center justify-center p-2`}>
            <Ionicons name="restaurant-outline" size={20} color="#333" />
            <Text style={tw`font-semibold text-gray-800 text-xs`}>Table Service</Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default LocationCard;

