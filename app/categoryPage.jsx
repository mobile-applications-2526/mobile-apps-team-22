// import React from 'react';
// import { View, ScrollView, Text } from 'react-native';
// import { Stack, useLocalSearchParams } from 'expo-router';
// import tw from 'twrnc';

// import ItemMenuCard from '../components/menu/itemMenuCard.jsx'; 
// import { menuItems } from '../assets/mockData/mockData.js';

// const CategoryPage = () => {

//   const { categoryType, categoryTitle } = useLocalSearchParams();

//   const filteredItems = menuItems.filter((item) => item.type === categoryType);

//   return (
//     <View style={tw`flex-1 bg-white`}>
//       {/* Set the Header Title dynamically */}
//       <Stack.Screen options={{ title: categoryTitle || 'Menu' }} />

//       <ScrollView contentContainerStyle={tw`pb-10`}>
//         {/* Grid Container */}
//         <View style={tw`flex-row flex-wrap justify-center gap-4 mt-4`}>
          
//           {filteredItems.length > 0 ? (
//             filteredItems.map((item) => (
//               <View key={item.id} style={tw`mb-2`}>
//                 <ItemMenuCard item={item} />
//               </View>
//             ))
//           ) : (
//             <Text style={tw`text-gray-500 mt-10`}>No items found in this category.</Text>
//           )}

//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// export default CategoryPage;


import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import tw from 'twrnc';

import ItemMenuCard from '../components/menu/itemMenuCard.jsx'; 
import { menuItems } from '../assets/mockData/mockData.js';

// 1. Import the Button
import CartSummaryButton from '../components/cart/cartSummaryButton.jsx'; 

const CategoryPage = () => {

  const { categoryType, categoryTitle } = useLocalSearchParams();

  const filteredItems = menuItems.filter((item) => item.type === categoryType);

  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Set the Header Title dynamically */}
      <Stack.Screen options={{ title: categoryTitle || 'Menu' }} />

      {/* 2. Increase paddingBottom so the last items aren't hidden behind the button */}
      <ScrollView contentContainerStyle={tw`pb-32`}>
        {/* Grid Container */}
        <View style={tw`flex-row flex-wrap justify-center gap-4 mt-4`}>
          
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <View key={item.id} style={tw`mb-2`}>
                <ItemMenuCard item={item} />
              </View>
            ))
          ) : (
            <Text style={tw`text-gray-500 mt-10`}>No items found in this category.</Text>
          )}

        </View>
      </ScrollView>

      {/* 3. Add the Button here */}
      <CartSummaryButton />
      
    </View>
  );
};

export default CategoryPage;