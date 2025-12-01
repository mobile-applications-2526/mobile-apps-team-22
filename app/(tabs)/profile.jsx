import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';

import { router } from 'expo-router';
import ProfileDetailsList from '../../components/profile/profileDetails.jsx';
import { useAuth } from '../../context/AuthContext.jsx'; 

const ProfilePage = () => {
  const { user, signOut } = useAuth();

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
          
          {user && <ProfileDetailsList user={{...user, name: user.email}} />}
        </View>

        {/* Bottom Section (Buttons) */}
        <View style={tw`py-4`}>
          <TouchableOpacity 
            style={tw`bg-[#E1503F] rounded-full py-3 items-center mb-4`}
            onPress={handleEditPress}
          >
            <Text style={tw`text-[#EEDAB5] font-bold text-lg`}>
              Edit Profile
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={tw`bg-gray-200 rounded-full py-3 items-center`}
            onPress={signOut}
          >
            <Text style={tw`text-gray-700 font-bold text-lg`}>
              Sign Out
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
};

export default ProfilePage;