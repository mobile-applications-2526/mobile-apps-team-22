import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Modal, FlatList, Alert, ActivityIndicator } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import tw from 'twrnc';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import CartItemCard from '../components/cart/cartItemCard.jsx';
import { useCart } from '../context/CartContext';
import { useLocation } from '../context/LocationContext';
import { useAuth } from '../context/AuthContext'; 
import { supabase } from '../utils/supabase';

const generateTimeSlots = () => {
  const slots = ["ASAP"];
  const startHour = 11;
  const endHour = 21;

  for (let h = startHour; h <= endHour; h++) {
    for (let m = 0; m < 60; m += 15) {
      if (h === endHour && m > 0) break;
      const hour = h.toString().padStart(2, '0');
      const minute = m.toString().padStart(2, '0');
      slots.push(`${hour}:${minute}`);
    }
  }
  return slots;
};

const TIME_SLOTS = generateTimeSlots();

const CartPage = () => {
  const router = useRouter();
  
  const { cartItems, updateQuantity, subtotal, vat, total, clearCart } = useCart(); 
  const { selectedLocation } = useLocation();
  const { session } = useAuth(); 

  const [pickupTime, setPickupTime] = useState("ASAP");
  const [isTimeModalVisible, setTimeModalVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSelectTime = (time) => {
    setPickupTime(time);
    setTimeModalVisible(false);
  };

  const handleChangeLocation = () => {
    router.push({
      pathname: '/locationSelectionPage', 
      params: { fromCart: 'true' } 
    });
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;

    if (!session) {
      Alert.alert(
        "Sign in required",
        "You need to sign in to place your order.",
        [
          { text: "Cancel", style: "cancel" },
          { 
            text: "Sign In / Register", 
            onPress: () => {
              router.push({
                pathname: '/login',
                params: { returnTo: 'cartPage' }  
              });
            }
          }
        ]
      );
      return;
    }

    if (!selectedLocation) {
      Alert.alert("Location Required", "Please select a pickup location.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('orders').insert({
        user_id: session.user.id,
        location_data: selectedLocation, 
        items_data: cartItems,          
        total_price: total,
        pickup_time: pickupTime,
      });

      if (error) throw error;


      Alert.alert("Success!", "Your order has been placed.", [
        {
          text: "OK",
          onPress: () => {
            clearCart();
            router.replace('/');
          }
        }
      ]);

    } catch (error) {
      console.log("Checkout Error:", error);
      Alert.alert("Error", "Could not place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <SafeAreaView style={tw`flex-1 bg-white`} edges={['bottom']}>
      <Stack.Screen options={{ title: 'Cart' }} />

      <ScrollView contentContainerStyle={tw`p-5 pb-40`}>
        
        <View style={tw`flex-row justify-between items-start mb-8`}>
          <TouchableOpacity 
            onPress={handleChangeLocation} 
            style={tw`flex-1 mr-4 active:opacity-60`}
          >
            <View style={tw`flex-row items-baseline`}>
              <Text style={tw`text-lg font-bold text-black`}>Pickup Order at:</Text>
              <Text style={tw`text-[#E1503F] font-bold text-sm ml-2`}>Change</Text>
            </View>
            <Text style={tw`text-gray-500 text-sm mt-1`}>
              {selectedLocation ? selectedLocation.address : 'Please select a location'}
            </Text>
          </TouchableOpacity>
          
          <View>
            <Text style={tw`text-xs font-bold mb-1 text-center`}>Pickup Time</Text>
            <TouchableOpacity 
              onPress={() => setTimeModalVisible(true)}
              style={tw`flex-row items-center bg-white border border-gray-300 rounded-full px-3 py-1 shadow-sm`}
            >
              <Text style={tw`font-bold mr-2 text-black`}>{pickupTime}</Text>
              <Ionicons name="chevron-down" size={16} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <CartItemCard 
              key={`${item.id}-${index}`} 
              item={item}
              onIncrease={() => updateQuantity(item.id, 1)}
              onDecrease={() => updateQuantity(item.id, -1)}
              onCustomize={() => console.log('Customize pressed')}
            />
          ))
        ) : (
          <Text style={tw`text-center text-gray-400 my-10`}>Your cart is empty.</Text>
        )}

        <TouchableOpacity 
          onPress={() => router.push('/(tabs)/menu')} 
          style={tw`self-end bg-[#E1503F] px-5 py-2 rounded-full mb-8 shadow-sm`}
        >
          <Text style={tw`text-white font-bold`}>+ Add More items</Text>
        </TouchableOpacity>

        <View style={tw`border-t border-gray-200 pt-4`}>
          <Text style={tw`text-xl font-bold mb-4`}>Summary</Text>
          <View style={tw`flex-row justify-between mb-2`}>
            <Text style={tw`text-gray-500 italic text-lg`}>Subtotal</Text>
            <Text style={tw`font-bold text-gray-600 text-lg`}>${subtotal.toFixed(2)}</Text>
          </View>
          <View style={tw`flex-row justify-between mb-6`}>
            <Text style={tw`text-gray-500 italic text-lg`}>VAT</Text>
            <Text style={tw`font-bold text-gray-600 text-lg`}>${vat.toFixed(2)}</Text>
          </View>
        </View>

      </ScrollView>

      <View style={tw`absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-5 pb-10 shadow-lg`}>
        <View style={tw`flex-row justify-between items-center mb-4 px-2`}>
          <Text style={tw`text-lg font-bold`}>Total ({totalItemCount} items)</Text>
          <Text style={tw`text-2xl font-black`}>${total.toFixed(2)}</Text>
        </View>

        <TouchableOpacity 
            onPress={handleCheckout}
            disabled={isSubmitting}
            style={tw`bg-[#E1503F] w-full py-4 rounded-full items-center shadow-md flex-row justify-center`}
        >
          {isSubmitting ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={tw`text-white text-xl font-bold`}>Checkout</Text>
          )}
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isTimeModalVisible}
        onRequestClose={() => setTimeModalVisible(false)}
      >
        <TouchableOpacity 
          style={tw`flex-1 bg-black/50 justify-end`} 
          activeOpacity={1} 
          onPress={() => setTimeModalVisible(false)}
        >
          <View style={tw`bg-white rounded-t-3xl p-5 h-[40%]`}>
            <View style={tw`flex-row justify-between items-center mb-4`}>
              <Text style={tw`text-xl font-bold`}>Select Pickup Time</Text>
              <TouchableOpacity onPress={() => setTimeModalVisible(false)}>
                <Ionicons name="close" size={24} color="gray" />
              </TouchableOpacity>
            </View>

            <FlatList
              data={TIME_SLOTS}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  onPress={() => handleSelectTime(item)}
                  style={tw`py-4 border-b border-gray-100 flex-row justify-between items-center`}
                >
                  <Text style={tw`text-lg ${pickupTime === item ? 'font-bold text-[#E1503F]' : 'text-gray-700'}`}>
                    {item}
                  </Text>
                  {pickupTime === item && (
                    <Ionicons name="checkmark" size={20} color="#E1503F" />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>

    </SafeAreaView>
  );
};

export default CartPage;