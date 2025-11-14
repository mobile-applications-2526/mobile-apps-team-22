import React from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';

// 1. Import the full list of locations from your mock data
import { locations } from '../../assets/mockData/mockData.js';

// 2. Import your LocationCard component
import LocationBigCard from '../../components/locationBigCard.jsx';

const Locations = () => {
  
  // 3. This function tells the FlatList how to render each card
  const renderLocationItem = ({ item }) => (
    <LocationBigCard 
      location={item} 
      onPress={() => Alert.alert("Location Chosen!", `You selected ${item.name}`)} 
    />
  );

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <View style={tw`px-5`}>
        <Text style={tw`text-2xl text-center font-bold mb-2`}>Choose a Location</Text>
        
        <FlatList
          data={locations}
          renderItem={renderLocationItem}
          keyExtractor={(item) => item.id.toString()}
          
          ItemSeparatorComponent={() => <View style={tw`h-5`} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default Locations;