// import React from 'react';
// import { View, ScrollView } from 'react-native';
// import { useRouter, useLocalSearchParams } from 'expo-router';
// import tw from 'twrnc';

// import LocationBigCard from '../components/location/locationBigCard.jsx'; 
// import { locations } from '../assets/mockData/mockData.js'; 
// import { useLocation } from '../context/LocationContext.jsx';

// const LocationSelectionPage = () => {
//   const router = useRouter();
//   const { pendingItemId } = useLocalSearchParams(); 
//   const { setSelectedLocation } = useLocation(); 

//   const { fromCart } = useLocalSearchParams();

//   const handleChooseLocation = (location) => {
    
//     setSelectedLocation(location);

//     if (fromCart === 'true') {
//     // If we came from Cart, just go back. Do not clear items.
//     router.back();
//     } else {
//         // Other logic (normal navigation)
//     }

//     if (pendingItemId) {
//       router.replace({
//         pathname: "/itemDetailsPage",
//         params: { itemId: pendingItemId }
//       });
//     } else {
//       router.back();
//     }
//   };

//   return (
//     <ScrollView style={tw`flex-1 bg-white p-4`}>
//       <View style={tw`py-2`}>
//         {locations.map((loc) => (
//           <View key={loc.id} style={tw`mb-5`}>
//             <LocationBigCard 
//               location={loc} 
//               onPress={() => handleChooseLocation(loc)} 
//             />
//           </View>
//         ))}
//       </View>
//     </ScrollView>
//   );
// };

// export default LocationSelectionPage;


import React from 'react';
import { View, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import tw from 'twrnc';

import LocationBigCard from '../components/location/locationBigCard.jsx'; 
import { locations } from '../assets/mockData/mockData.js'; 
import { useLocation } from '../context/LocationContext.jsx';

const LocationSelectionPage = () => {
  const router = useRouter();
  
  // You can destructure both params at once
  const { pendingItemId, fromCart } = useLocalSearchParams(); 
  const { setSelectedLocation } = useLocation(); 

  const handleChooseLocation = (location) => {
    // 1. Always update the global location state first
    setSelectedLocation(location);

    // 2. Determine where to go (Exclusive Logic)
    if (fromCart === 'true') {
      // SCENARIO A: Came from Cart to change location.
      // Action: Go back to Cart. Do not clear items.
      router.back();
    } 
    else if (pendingItemId) {
      // SCENARIO B: Came from Menu attempting to add an item.
      // Action: Go to that item's details.
      router.replace({
        pathname: "/itemDetailsPage",
        params: { itemId: pendingItemId }
      });
    } 
    else {
      router.back();
    }
  };

  return (
    <ScrollView style={tw`flex-1 bg-white p-4`}>
      <View style={tw`py-2`}>
        {locations.map((loc) => (
          <View key={loc.id} style={tw`mb-5`}>
            <LocationBigCard 
              location={loc} 
              onPress={() => handleChooseLocation(loc)} 
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default LocationSelectionPage;