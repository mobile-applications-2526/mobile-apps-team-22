import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';
import { router } from 'expo-router';

import ProfileEditForm from '../components/profile/profileEditForm.jsx';
import { supabase } from '../utils/supabase';
import { useAuth } from '../context/AuthContext';

const EditProfilePage = () => {
  const { session } = useAuth();
  const formRef = useRef(null);
  
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!session) return;

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (error) throw error;

        if (data) {
          setUserData({
            name: data.full_name,
            email: session.user.email,
            city: data.city,
            dateOfBirth: data.date_of_birth,
            gender: data.gender,
          });
        }
      } catch (error) {
        Alert.alert('Error', 'Could not load profile data.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [session]);

  const handleSaveChanges = async (updatedData) => {
    setSaving(true);
    try {
      const updates = {
        id: session.user.id,
        full_name: updatedData.name,
        city: updatedData.city,
        gender: updatedData.gender,
        date_of_birth: updatedData.dateOfBirth, 
        updated_at: new Date(),
      };

      const { error } = await supabase
        .from('profiles')
        .upsert(updates);

      if (error) throw error;

      Alert.alert('Success', 'Profile updated successfully!');
      router.back();
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setSaving(false);
    }
  };

  const triggerSave = () => {
    if (formRef.current) {
      formRef.current.submit();
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={tw`flex-1 bg-white justify-center items-center`}>
        <ActivityIndicator size="large" color="#E1503F" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={tw`flex-1 bg-white`} edges={['bottom']}>
      <View style={tw`flex-1 justify-between p-5`}>
        
        <ProfileEditForm 
          ref={formRef}
          user={userData} 
          onSave={handleSaveChanges} 
        />
        
        <TouchableOpacity
          style={tw`bg-[#E1503F] rounded-full py-4 items-center mb-2`}
          onPress={triggerSave}
          disabled={saving}
        >
          {saving ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={tw`text-[#EEDAB5] font-bold text-lg`}>Save Changes</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default EditProfilePage;