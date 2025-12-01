import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'; // Removed Alert
import tw from 'twrnc';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

// 1. IMPORT THE CONTEXT HOOK
import { useCart } from '../context/CartContext.jsx';

const ItemDetails = ({ item }) => {
    // 2. INITIALIZE THE HOOK
    const { addToCart } = useCart();

    const imageSource = item.image; 

    // Safety check
    if (!imageSource) {
        console.error("Image source is missing for:", item.name);
    }

    // Logic for Large/Regular pricing
    const hasLargeOption = item.priceLarge > 0;
    const initialSize = hasLargeOption ? 'Large' : 'Regular';

    const [selectedSize, setSelectedSize] = useState(initialSize);
    const [quantity, setQuantity] = useState(1);

    // Calculate dynamic price based on selection
    const currentPrice = selectedSize === 'Large' ? item.priceLarge : item.priceRegular;

    const handleSetQuantity = (delta) => {
        setQuantity(prev => Math.max(1, prev + delta));
    };

    // 3. THE UPDATED ADD TO CART FUNCTION
    const handleAddToCart = () => {
        const itemToAdd = {
            ...item,
            priceRegular: currentPrice, 
            selectedSize: selectedSize, 
        };
        
        addToCart(itemToAdd, quantity);

        // Simply go back to the previous screen (The Menu)
        // The user will see the red cart button appear/update immediately.
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
                    <Text style={tw`text-lg font-light mb-2`}>${currentPrice.toFixed(2)}</Text>

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

                    <Text style={tw`text-base text-gray-700 mb-6`}>
                        {item.description}
                    </Text>
                
                </View>
            </ScrollView>

            <View style={tw`bg-[#E1503F] border-t border-gray-200 px-5 py-5 flex-row justify-between items-center`}>
                <Text style={tw`text-base font-bold text-[#EEDAB5]`}>
                    Total ${ (currentPrice * quantity).toFixed(2) }
                </Text>
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