// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
// import tw from 'twrnc';
// import { Image } from 'expo-image';
// import { Ionicons } from '@expo/vector-icons';
// import { router } from 'expo-router';

// const ImageMap = {
//     '../img/ChickenBeans.png': require('../assets/img/ChickenBeans.png'),
//     '../img/HoneyHarvest.png': require('../assets/img/HoneyHarvest.png'),
//     '../img/CaesarsGarden.png': require('../assets/img/CaesarsGarden.png'),
//     // Add More in Here
// };

// const ItemDetails = ({ item }) => {

//     const imageSource = ImageMap[item.image];

//     if (!imageSource) {
//         console.error("Image not found in map for path:", item.image);
//     }
//     const hasLargeOption = item.priceLarge > 0;
//     const initialSize = hasLargeOption ? 'Large' : 'Regular';

//     const [selectedSize, setSelectedSize] = useState(initialSize);
//     const [quantity, setQuantity] = useState(1);

//     const currentPrice = selectedSize === 'Large' ? item.priceLarge : item.priceRegular;

//     const handleAddToCart = () => {
//         const orderDetails = {
//             itemId: item.id,
//             name: item.name,
//             size: selectedSize,
//             quantity: quantity,
//             totalPrice: currentPrice * quantity,
//         };
        
//         console.log("Adding to Cart:", orderDetails);
//         alert(`${quantity} x ${selectedSize} ${item.name} added to cart!`);
//         router.back();
//     };

//     const handleSetQuantity = (delta) => {
//         setQuantity(prev => Math.max(1, prev + delta));
//     };


//     return (
//         <View style={tw`flex-1 bg-white`}>
            
//             <ScrollView showsVerticalScrollIndicator={false}>
//                 {/* 1. IMAGE SECTION */}
//                 <Image
//                     source={imageSource}
//                     style={tw`w-full h-64`}
//                     contentFit="cover"
//                 />

//                 {/* 2. MAIN CONTENT AREA */}
//                 <View style={tw`p-5`}>
                    
//                     {/* Title and Price */}
//                     <Text style={tw`text-xl font-semibold`}>{item.name}</Text>
//                     <Text style={tw`text-lg font-light mb-2`}>${currentPrice.toFixed(2)}</Text>

//                     {/* Size and Quantity Selector */}
//                     <View style={tw`flex-row justify-between items-center mb-6`}>
//                         {/* Size Selection */}
//                         {hasLargeOption && (
//                             <View style={tw`flex-row border border-gray-300 rounded-full p-1`}>
//                                 {['Regular', 'Large'].map(size => (
//                                     <TouchableOpacity
//                                         key={size}
//                                         onPress={() => setSelectedSize(size)}
//                                         style={tw.style(
//                                             `py-2 px-4 rounded-full`,
//                                             selectedSize === size ? 'bg-[#E1503F]' : 'bg-white'
//                                         )}
//                                     >
//                                         <Text style={tw.style(
//                                             `text-sm font-semibold`,
//                                             selectedSize === size ? 'text-[#EEDAB5]' : 'text-gray-700'
//                                         )}>
//                                             {size}
//                                         </Text>
//                                     </TouchableOpacity>
//                                 ))}
//                             </View>
//                         )}
                        
//                         {/* Quantity Control */}
//                         <View style={tw`flex-row items-center`}>
//                             <TouchableOpacity onPress={() => handleSetQuantity(-1)} style={tw`p-2`}>
//                                 <Text style={tw`text-2xl font-light text-gray-500`}>—</Text>
//                             </TouchableOpacity>
//                             <Text style={tw`text-xl font-semibold mx-3`}>{quantity}</Text>
//                             <TouchableOpacity onPress={() => handleSetQuantity(1)} style={tw`p-2`}>
//                                 <Text style={tw`text-2xl font-light text-gray-500`}>+</Text>
//                             </TouchableOpacity>
//                         </View>
//                     </View>

//                     {/* 3. INGREDIENTS / DESCRIPTION */}
//                     <Text style={tw`text-base text-gray-700 mb-6`}>
//                         {item.description}
//                     </Text>
                
//                 </View>
//             </ScrollView>

//             {/* 5. ADD TO CART FOOTER */}
//             <View style={tw`bg-[#E1503F] border-t border-gray-200 px-5 py-5 flex-row justify-between items-center`}>
//                 <Text style={tw`text-base font-bold text-[#EEDAB5]`}>
//                     Total ${ (currentPrice * quantity).toFixed(2) }
//                 </Text>
//                 <TouchableOpacity
//                     style={tw`bg-[#EEDAB5] rounded-full py-3 px-8 flex-row items-center shadow-md`}
//                     onPress={handleAddToCart}
//                 >
//                     <Ionicons name="cart-outline" size={20} color={'#E1503F'} style={tw`mr-2`} />
//                     <Text style={tw`text-[#E1503F] font-semibold text-lg`}>
//                         Add To Cart
//                     </Text>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     );
// };

// export default ItemDetails;




import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import tw from 'twrnc';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

// 1. DELETE THE MAP (You don't need it)
// const ImageMap = { ... }; 

const ItemDetails = ({ item }) => {

    // 2. DELETE THE LOOKUP (item.image IS the source already)
    // const imageSource = ImageMap[item.image];

    // 3. USE DATA DIRECTLY
    const imageSource = item.image; 

    // Safety check: Ensure image exists
    if (!imageSource) {
         // This handles the case if you forgot 'require' in mockData
        console.error("Image source is missing for:", item.name);
    }

    const hasLargeOption = item.priceLarge > 0;
    const initialSize = hasLargeOption ? 'Large' : 'Regular';

    const [selectedSize, setSelectedSize] = useState(initialSize);
    const [quantity, setQuantity] = useState(1);

    const currentPrice = selectedSize === 'Large' ? item.priceLarge : item.priceRegular;

    const handleAddToCart = () => {
        const orderDetails = {
            itemId: item.id,
            name: item.name,
            size: selectedSize,
            quantity: quantity,
            totalPrice: currentPrice * quantity,
        };
        
        console.log("Adding to Cart:", orderDetails);
        // Changed alert to proper React Native Alert
        Alert.alert("Success", `${quantity} x ${selectedSize} ${item.name} added to cart!`);
        router.back();
    };

    const handleSetQuantity = (delta) => {
        setQuantity(prev => Math.max(1, prev + delta));
    };


    return (
        <View style={tw`flex-1 bg-white`}>
            
            <ScrollView showsVerticalScrollIndicator={false}>
                <Image
                    source={imageSource} // 👈 This takes the number 27 and renders the image
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