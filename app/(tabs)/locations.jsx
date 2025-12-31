import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import { useRouter } from 'expo-router';

import LocationList from '../../components/location/locationList.jsx';

const Locations = () => {
  const router = useRouter();

  return (
    <SafeAreaView style={tw`flex-1 bg-white`} edges={['']}>
      <View style={tw`flex-1 justify-between`}>
        
        <View style={tw`px-5 py-4 border-b border-gray-200`}>
          <Text style={tw`text-2xl font-bold`}>Find a Bowl Near You
            <Text> 
              <Text style={tw`text-2xl`}> 🥗</Text>
            </Text>
          </Text>
          <Text style={tw`text-base text-gray-600 mt-1`}>
            We're bringing fresh poké to cities all over Belgium.
          </Text>
        </View>

        <View style={tw`flex-1`}>
          <LocationList />
        </View>
        
        <View style={tw`px-5 py-2 border-t border-gray-100`}>
          <TouchableOpacity 
            style={tw`bg-[#E1503F] rounded-full py-4 items-center`}
            onPress={() => router.push('/contact')}
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