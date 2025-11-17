import React, { useRef } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import { Stack, router } from 'expo-router';

import ProfileEditForm from '../components/profileEditForm.jsx';
import { users } from '../assets/mockData/mockData.js'; 

const EditProfilePage = () => {
  const currentUser = users[0];
  const formRef = useRef(null);

  const handleSaveChanges = (updatedData) => {
    console.log('Updated user data:', updatedData);
    router.back();
  };

  const triggerSave = () => {
    if (formRef.current) {
      formRef.current.submit();
    }
  };

  return (
    <SafeAreaView style={tw`flex-1 bg-white`} edges={['bottom']}>
      
      
      <View style={tw`flex-1 justify-between p-5`}>
        <ProfileEditForm 
          ref={formRef}
          user={currentUser} 
          onSave={handleSaveChanges} 
        />
        
        <TouchableOpacity
          style={tw`bg-[#E1503F] rounded-full py-4 items-center mb-2`}
          onPress={triggerSave} 
        >
          <Text style={tw`text-[#EEDAB5] font-bold text-lg`}>Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default EditProfilePage;