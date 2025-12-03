import React from 'react';
import { View, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import tw from 'twrnc';

import LocationBigCard from '../components/location/locationBigCard.jsx'; 
import { locations } from '../assets/mockData/mockData.js'; 
import { useLocation } from '../context/LocationContext.jsx';

const LocationSelectionPage = () => {
  const router = useRouter();
  
  const { pendingItemId, fromCart } = useLocalSearchParams(); 
  const { setSelectedLocation } = useLocation(); 

  const handleChooseLocation = (location) => {
    setSelectedLocation(location);

    if (fromCart === 'true') {
      router.back();
    } 
    else if (pendingItemId) {
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