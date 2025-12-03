import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import { router, useFocusEffect } from 'expo-router';

// Imports
import ProfileDetailsList from '../../components/profile/profileDetails.jsx'; 
import { useAuth } from '../../context/AuthContext.jsx'; 
import { supabase } from '../../utils/supabase'; 

const ProfilePage = () => {
  const { session, signOut } = useAuth(); 
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      if (!session) return; 

      const fetchProfile = async () => {
        try {
          const { data, error } = await supabase
            .from('profiles') 
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (error) {
            console.error('Error fetching profile:', error);
          }

          if (data) {
            setProfileData({
              email: session.user.email,
              name: data.full_name,
              city: data.city,
              dateOfBirth: data.date_of_birth,
              gender: data.gender,
            });
          }
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };

      fetchProfile();
    }, [session])
  );

  const handleEditPress = () => {
    router.push('/edit-profile');
  };

  if (!session) {
    return (
      <SafeAreaView style={tw`flex-1 bg-white justify-center px-6`}>
        <View style={tw`items-center mb-10`}>
          <Text style={tw`text-3xl font-bold text-black mb-2`}>Profile</Text>
          <Text style={tw`text-gray-500 text-center text-base`}>
            Log in to manage your profile, orders, and saved addresses.
          </Text>
        </View>

        <TouchableOpacity 
          style={tw`bg-[#E1503F] rounded-full py-4 items-center mb-4 shadow-md`}
          onPress={() => router.push('/login')}
        >
          <Text style={tw`text-[#EEDAB5] font-bold text-lg`}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={tw`bg-white border border-[#E1503F] rounded-full py-4 items-center`}
          onPress={() => router.push('/register')}
        >
          <Text style={tw`text-[#E1503F] font-bold text-lg`}>Register</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={tw`flex-1 bg-white`} edges={['']}>
      <View style={tw`flex-1 justify-between px-5`}>
        
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={tw`text-2xl font-bold pt-8 mb-4`}>
            Personal Details
          </Text>
          
          {loading ? (
            <ActivityIndicator size="large" color="#E1503F" style={tw`mt-10`} />
          ) : (
            profileData && <ProfileDetailsList user={profileData} />
          )}
        </ScrollView>
        
        <View style={tw`py-5 pb-4`}>
          <TouchableOpacity 
            style={tw`bg-[#E1503F] rounded-full py-3 items-center mb-4 shadow-sm`}
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