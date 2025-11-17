import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';

import { router } from 'expo-router';
import ProfileDetailsList from '../../components/profileDetails.jsx';
import { users } from '../../assets/mockData/mockData.js'; 

const ProfilePage = () => {

  const firstUser = users[0];

  const handleEditPress = () => {
    router.push('/edit-profile');
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`} edges={['bottom']}>
      <View style={tw`flex-1 justify-between px-5`}>
        
        {/* Top Section */}
        <View>
          <Text style={tw`text-2xl font-bold pt-8`}>
            Personal Details
          </Text>
          
          {/* 3. Pass the 'firstUser' object as a prop */}
          <ProfileDetailsList user={firstUser} />
        </View>

        {/* Bottom Section (Button) */}
        <View style={tw`py-4`}>
          <TouchableOpacity 
            style={tw`bg-[#E1503F] rounded-full py-3 items-center`}
            onPress={handleEditPress}
          >
            <Text style={tw`text-[#EEDAB5] font-bold text-lg`}>
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
};

export default ProfilePage;