import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { Image } from 'expo-image';

const CartItemCard = ({ item, onIncrease, onDecrease, onCustomize }) => {
  return (
    <View style={tw`flex-row items-center mb-6`}>
      
      <View style={tw`bg-[#F3F0EB] rounded-2xl items-center justify-center mr-4`}>
        <Image 
          source={item.image} 
          style={{ width: 110, height: 110, borderRadius: 16 }} 
          contentFit="cover" 
        />
      </View>

      <View style={tw`flex-1`}>
        <View style={tw`flex-row justify-between items-start`}>
          
          <View style={tw`flex-1 mr-2`}>
            <Text style={tw`text-base font-bold text-black`}>{item.name}</Text>
            
            <Text style={tw`text-xs text-gray-500 font-semibold mt-1`}>
              Size: {item.selectedSize || 'Regular'}
            </Text>
          </View>
          
          <View style={tw`flex-row items-center bg-white border border-gray-200 rounded-full px-2 py-1 shadow-sm`}>
            <TouchableOpacity onPress={onDecrease} style={tw`px-2`}>
              <Text style={tw`text-lg font-bold`}>-</Text>
            </TouchableOpacity>
            
            <Text style={tw`mx-1 font-bold`}>{item.quantity}</Text>
            
            <TouchableOpacity onPress={onIncrease} style={tw`px-2`}>
              <Text style={tw`text-lg font-bold`}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={tw`flex-row justify-between items-center mt-3`}>
          <Text style={tw`text-base font-bold`}>${item.priceRegular.toFixed(2)}</Text>
          
          <TouchableOpacity 
            onPress={onCustomize}
            style={tw`bg-[#E1503F] px-4 py-1.5 rounded-full`}
          >
            <Text style={tw`text-white text-xs font-bold`}>Customize</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CartItemCard;