import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { Image } from 'expo-image';

const CartItemCard = ({ item, onIncrease, onDecrease, onCustomize }) => {
  const hasPromo = item.isPromo && item.promoType;
  const hasFreeItems = item.freeQuantity > 0;

  // Get promo label
  const getPromoLabel = () => {
    switch (item.promoType) {
      case 'bogo': return '🎉 BOGO';
      case 'discount': return `🏷️ ${item.discountPercent || 0}% OFF`;
      case 'buy2get1': return '🎁 B2G1';
      default: return null;
    }
  };

  return (
    <View style={tw`flex-row items-center mb-6`}>
      
      <View style={tw`relative bg-[#F3F0EB] rounded-2xl items-center justify-center mr-4`}>
        <Image 
          source={item.image} 
          style={{ width: 110, height: 110, borderRadius: 16 }} 
          contentFit="cover" 
        />
        {/* Promo badge on image */}
        {hasPromo && (
          <View style={tw`absolute top-1 left-1 bg-[#E1503F] rounded-full px-2 py-0.5`}>
            <Text style={tw`text-white text-[10px] font-bold`}>{getPromoLabel()}</Text>
          </View>
        )}
      </View>

      <View style={tw`flex-1`}>
        <View style={tw`flex-row justify-between items-start`}>
          
          <View style={tw`flex-1 mr-2`}>
            <Text style={tw`text-base font-bold text-black`}>{item.name}</Text>
            
            <Text style={tw`text-xs text-gray-500 font-semibold mt-1`}>
              Size: {item.selectedSize || 'Regular'}
            </Text>

            {/* Show quantity breakdown for promos */}
            {hasFreeItems && (
              <Text style={tw`text-xs text-green-600 font-semibold mt-1`}>
                {item.paidQuantity} paid + {item.freeQuantity} FREE = {item.quantity} total
              </Text>
            )}
          </View>
          
          {/* Quantity controls - controls base quantity (sets for BOGO, paid for buy2get1) */}
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
          <View>
            {/* Show line total for promo items */}
            {hasPromo ? (
              <>
                <Text style={tw`text-base font-bold`}>${item.lineTotal.toFixed(2)}</Text>
                {hasFreeItems && (
                  <Text style={tw`text-[10px] text-gray-500`}>
                    (${item.itemPrice.toFixed(2)} × {item.paidQuantity})
                  </Text>
                )}
              </>
            ) : (
              <Text style={tw`text-base font-bold`}>${item.lineTotal.toFixed(2)}</Text>
            )}
          </View>
          
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