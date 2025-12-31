import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import tw from 'twrnc';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { useCart } from '../context/CartContext.jsx';

const ItemDetails = ({ item }) => {

    const { addToCart } = useCart();

    const imageSource = item.image; 

    if (!imageSource) {
        console.error("Image source is missing for:", item.name);
    }

    const hasLargeOption = item.priceLarge > 0;
    const initialSize = hasLargeOption ? 'Large' : 'Regular';

    const [selectedSize, setSelectedSize] = useState(initialSize);
    const [quantity, setQuantity] = useState(1);

    const isPromo = !!item.promoType;
    const basePrice = selectedSize === 'Large' ? item.priceLarge : item.priceRegular;

    // Calculate promotional pricing
    const getPromoDetails = () => {
        if (!isPromo) {
            return {
                displayPrice: basePrice,
                totalPrice: basePrice * quantity,
                actualQuantity: quantity,
                savings: 0,
                promoLabel: null,
            };
        }

        switch (item.promoType) {
            case 'bogo': // Buy One Get One Free
                const bogoActualQty = quantity * 2;
                const bogoTotal = basePrice * quantity; // Pay for 1, get 2
                return {
                    displayPrice: basePrice,
                    totalPrice: bogoTotal,
                    actualQuantity: bogoActualQty,
                    savings: basePrice * quantity,
                    promoLabel: '🎉 Buy 1 Get 1 FREE',
                };
            case 'discount': // Percentage discount
                const discountPercent = item.discountPercent || 0;
                const discountedPrice = basePrice * (1 - discountPercent / 100);
                return {
                    displayPrice: discountedPrice,
                    totalPrice: discountedPrice * quantity,
                    actualQuantity: quantity,
                    savings: (basePrice - discountedPrice) * quantity,
                    promoLabel: `🏷️ ${discountPercent}% OFF`,
                };
            case 'buy2get1': // Buy 2 Get 1 Free
                const sets = Math.floor(quantity / 2);
                const remainder = quantity % 2;
                const buy2get1ActualQty = quantity + sets; // Extra free items
                const buy2get1Total = basePrice * quantity; // Only pay for what you select
                return {
                    displayPrice: basePrice,
                    totalPrice: buy2get1Total,
                    actualQuantity: buy2get1ActualQty,
                    savings: basePrice * sets,
                    promoLabel: '🎁 Buy 2 Get 1 FREE',
                };
            default:
                return {
                    displayPrice: basePrice,
                    totalPrice: basePrice * quantity,
                    actualQuantity: quantity,
                    savings: 0,
                    promoLabel: null,
                };
        }
    };

    const promoDetails = getPromoDetails();

    const handleSetQuantity = (delta) => {
        setQuantity(prev => Math.max(1, prev + delta));
    };

    const handleAddToCart = () => {
        const itemToAdd = {
            ...item,
            priceRegular: promoDetails.displayPrice,
            selectedSize: selectedSize,
            isPromo: isPromo,
            promoType: item.promoType,
            originalPrice: basePrice,
            discountPercent: item.discountPercent,
        };
        
        addToCart(itemToAdd, promoDetails.actualQuantity);

        router.back();
    };

    return (
        <View style={tw`flex-1 bg-white`}>
            
            <ScrollView showsVerticalScrollIndicator={false}>
                <Image
                    source={imageSource}
                    style={tw`w-full h-64`}
                    contentFit="cover"
                />

                <View style={tw`p-5`}>
                    <Text style={tw`text-xl font-semibold`}>{item.name}</Text>
                    
                    {/* Price display with promo handling */}
                    <View style={tw`flex-row items-center mb-2`}>
                        {isPromo && promoDetails.displayPrice !== basePrice ? (
                            <>
                                <Text style={tw`text-lg font-light text-gray-400 line-through mr-2`}>
                                    ${basePrice.toFixed(2)}
                                </Text>
                                <Text style={tw`text-lg font-semibold text-[#E1503F]`}>
                                    ${promoDetails.displayPrice.toFixed(2)}
                                </Text>
                            </>
                        ) : (
                            <Text style={tw`text-lg font-light`}>${basePrice.toFixed(2)}</Text>
                        )}
                    </View>

                    {/* Promo Badge */}
                    {isPromo && promoDetails.promoLabel && (
                        <View style={tw`bg-[#E1503F] self-start rounded-full px-3 py-1 mb-4`}>
                            <Text style={tw`text-white font-semibold text-sm`}>
                                {promoDetails.promoLabel}
                            </Text>
                        </View>
                    )}

                    <View style={tw`flex-row justify-between items-center mb-6`}>
                        {hasLargeOption && (
                            <View style={tw`flex-row border border-gray-300 rounded-full p-1`}>
                                {['Regular', 'Large'].map(size => (
                                    <TouchableOpacity
                                        key={size}
                                        onPress={() => setSelectedSize(size)}
                                        style={tw.style(
                                            `py-2 px-4 rounded-full`,
                                            selectedSize === size ? 'bg-[#E1503F]' : 'bg-white'
                                        )}
                                    >
                                        <Text style={tw.style(
                                            `text-sm font-semibold`,
                                            selectedSize === size ? 'text-[#EEDAB5]' : 'text-gray-700'
                                        )}>
                                            {size}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                        
                        <View style={tw`flex-row items-center`}>
                            <TouchableOpacity onPress={() => handleSetQuantity(-1)} style={tw`p-2`}>
                                <Text style={tw`text-2xl font-light text-gray-500`}>—</Text>
                            </TouchableOpacity>
                            <Text style={tw`text-xl font-semibold mx-3`}>{quantity}</Text>
                            <TouchableOpacity onPress={() => handleSetQuantity(1)} style={tw`p-2`}>
                                <Text style={tw`text-2xl font-light text-gray-500`}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <Text style={tw`text-base text-gray-700 mb-4`}>
                        {item.description}
                    </Text>

                    {/* Promo Description Section */}
                    {item.promoDescription && item.promoDescription.length > 0 && (
                        <View style={tw`bg-[#FFF5F5] border border-[#E1503F] rounded-xl p-4 mb-4`}>
                            <Text style={tw`text-[#E1503F] font-bold text-base mb-2`}>
                                🔥 Promotion Details
                            </Text>
                            {item.promoDescription.map((desc, index) => (
                                <View key={index} style={tw`flex-row mb-2`}>
                                    <Text style={tw`text-gray-600 mr-2`}>•</Text>
                                    <Text style={tw`text-gray-700 text-sm flex-1`}>
                                        {desc}
                                    </Text>
                                </View>
                            ))}
                        </View>
                    )}

                    {/* Savings display */}
                    {isPromo && promoDetails.savings > 0 && (
                        <View style={tw`bg-green-100 rounded-lg p-3 mb-4`}>
                            <Text style={tw`text-green-700 font-semibold text-center`}>
                                💰 You save ${promoDetails.savings.toFixed(2)}!
                                {promoDetails.actualQuantity !== quantity && (
                                    <Text style={tw`text-green-600 font-normal`}>
                                        {' '}(Getting {promoDetails.actualQuantity} items)
                                    </Text>
                                )}
                            </Text>
                        </View>
                    )}
                
                </View>
            </ScrollView>

            <View style={tw`bg-[#E1503F] border-t border-gray-200 px-5 py-5 flex-row justify-between items-center`}>
                <View>
                    <Text style={tw`text-base font-bold text-[#EEDAB5]`}>
                        Total ${promoDetails.totalPrice.toFixed(2)}
                    </Text>
                    {promoDetails.actualQuantity !== quantity && (
                        <Text style={tw`text-xs text-[#EEDAB5] opacity-80`}>
                            {promoDetails.actualQuantity} items
                        </Text>
                    )}
                </View>
                <TouchableOpacity
                    style={tw`bg-[#EEDAB5] rounded-full py-3 px-8 flex-row items-center shadow-md`}
                    onPress={handleAddToCart}
                >
                    <Ionicons name="cart-outline" size={20} color={'#E1503F'} style={tw`mr-2`} />
                    <Text style={tw`text-[#E1503F] font-semibold text-lg`}>
                        Add To Cart
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ItemDetails;