import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';

import { useCart } from '../../context/CartContext';

const CartSummaryButton = () => {
  const router = useRouter();
  const { cartItems, total } = useCart();

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (totalQuantity === 0) {
    return null;
  }

  return (
    <View style={tw`absolute bottom-5 left-0 right-0 px-4 z-50`}>
      <TouchableOpacity 
        onPress={() => router.push('/cartPage')} 
        style={tw`bg-[#E1503F] rounded-full p-4 flex-row justify-between items-center shadow-lg`}
      >
        
        <View style={tw`flex-row items-center`}>
          <Ionicons name="cart-outline" size={24} color="white" />
          <Text style={tw`text-white font-bold text-lg ml-2 mr-3`}>Cart</Text>
          
          <View style={tw`bg-[#EEDAB5] w-8 h-8 rounded-full items-center justify-center`}>
            <Text style={tw`text-[#E1503F] font-bold text-sm`}>
              {totalQuantity}
            </Text>
          </View>
        </View>

        <Text style={tw`text-white font-bold text-lg`}>
          ${total.toFixed(2)}
        </Text>

      </TouchableOpacity>
    </View>
  );
};

export default CartSummaryButton;