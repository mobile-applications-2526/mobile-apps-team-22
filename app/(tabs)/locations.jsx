// import React from 'react';
// import { View, Text, FlatList, Alert } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import tw from 'twrnc';

// // 1. Import the full list of locations from your mock data
// import { locations } from '../../assets/mockData/mockData.js';

// // 2. Import your LocationCard component
// import LocationBigCard from '../../components/locationBigCard.jsx';

// const Locations = () => {
  
//   // 3. This function tells the FlatList how to render each card
//   const renderLocationItem = ({ item }) => (
//     <LocationBigCard 
//       location={item} 
//       onPress={() => Alert.alert("Location Chosen!", `You selected ${item.name}`)} 
//     />
//   );

//   return (
//     <SafeAreaView style={tw`flex-1 bg-white`}>
//       <View style={tw`px-5`}>
//         <Text style={tw`text-2xl text-center font-bold mb-2`}>Choose a Location</Text>
        
//         <FlatList
//           data={locations}
//           renderItem={renderLocationItem}
//           keyExtractor={(item) => item.id.toString()}
          
//           ItemSeparatorComponent={() => <View style={tw`h-5`} />}
//           showsVerticalScrollIndicator={false}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };

// export default Locations;


import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';

// 1. Import your new list component
import LocationList from '../../components/location/locationList.jsx';

const Locations = () => {
  return (
    <SafeAreaView style={tw`flex-1 bg-white`} edges={['']}>
      {/* Main container to push button to bottom */}
      <View style={tw`flex-1 justify-between`}>
        
        {/* Top Section: Header */}
        <View style={tw`px-5 py-4 border-b border-gray-200`}>
          <Text style={tw`text-2xl font-bold`}>Find a Bowl Near You
            <Text> 
              {/* This is a trick to add the emoji without it being bold */}
              <Text style={tw`text-2xl`}> 🥗</Text>
            </Text>
          </Text>
          <Text style={tw`text-base text-gray-600 mt-1`}>
            We're bringing fresh poké to cities all over Belgium.
          </Text>
        </View>

        {/* Middle Section: The List */}
        <View style={tw`flex-1`}>
          <LocationList />
        </View>

        {/* Bottom Section: Button */}
        <View style={tw`px-5 py-2 border-t border-gray-100`}>
          <TouchableOpacity 
            style={tw`bg-[#E1503F] rounded-full py-4 items-center`}
            onPress={() => alert('Contact Us tapped!')}
          >
            <Text style={tw`text-[#EEDAB5] font-bold text-lg`}>
              Contact Us
            </Text>
          </TouchableOpacity>
        </View>
        
      </View>
    </SafeAreaView>
  );
};

export default Locations;