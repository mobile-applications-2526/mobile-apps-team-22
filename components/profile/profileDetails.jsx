import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';

// Helper component
const DetailRow = ({ label, value, iconName }) => (
  <View style={tw`flex-row justify-between items-center py-4`}>
    <View>
      <Text style={tw`text-xs font-bold text-gray-500 uppercase`}>
        {label}
      </Text>
      <Text style={tw`text-base text-black font-light mt-1`}>
        {value}
      </Text>
    </View>
    <Ionicons 
      name={iconName} 
      size={24} 
      color={tw.color('gray-500')} 
    />
  </View>
);

const ProfileDetailsList = ({ user }) => {

  if (!user) {
    return <Text>No user data provided.</Text>;
  }

  return (
    <View>
      <DetailRow 
        label="Name" 
        value={user.name} 
        iconName="person-outline" 
      />
      <DetailRow 
        label="Email" 
        value={user.email} 
        iconName="mail-outline" 
      />
      <DetailRow 
        label="City" 
        value={user.city} 
        iconName="location-outline" 
      />
      <DetailRow 
        label="Date of Birth" 
        value={user.dateOfBirth} 
        iconName="calendar-outline" 
      />
      <DetailRow 
        label="Gender" 
        value={user.gender} 
        iconName="male-outline" 
      />
    </View>
  );
};

export default ProfileDetailsList;