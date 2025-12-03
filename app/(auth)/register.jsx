import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import tw from 'twrnc';
import { supabase } from '../../utils/supabase';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Defining specific hex codes to match your theme
const RED = '#E1503F';
const BEIGE = '#EEDAB5';
const DARK_GREEN = '#006400';

const Register = () => {
  const router = useRouter();

  // 1. State Variables
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); 
  const [city, setCity] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');

  // 2. Visibility Toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleRegister = async () => {
    // Validation
    if (!email || !password || !confirmPassword || !name || !city || !dob || !gender) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    // Check Password Match
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    // Register with Supabase
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
          city: city,
          date_of_birth: dob,
          gender: gender,
        },
      },
    });

    if (error) {
      Alert.alert('Error', error.message);
    } else {
      Alert.alert('Success', 'Please check your email for verification.');
      router.push('/login');
    }
  };

  // Helper component for Gender Buttons
  const GenderButton = ({ label, value }) => {
    const isActive = gender === value;
    return (
      <TouchableOpacity
        onPress={() => setGender(value)}
        style={tw.style(
          `flex-1 h-12 justify-center items-center rounded-lg border border-[${BEIGE}] mx-1`,
          isActive ? `bg-[${BEIGE}]` : `bg-[${BEIGE}]/20`
        )}
      >
        <Text
          style={tw.style(
            `font-bold`,
            isActive ? `text-[${RED}]` : `text-[${BEIGE}]`
          )}
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    // Wrap everything in KeyboardAvoidingView to handle keyboard interactions
    <KeyboardAvoidingView 
      style={tw`flex-1 bg-[${RED}]`} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20} // Adjusts spacing if needed
    >
      <ScrollView 
        contentContainerStyle={tw`flex-grow justify-center items-center p-5`} 
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled" // Allows tapping buttons while keyboard is open
      >
        <Text style={tw`text-3xl font-bold text-[${BEIGE}] mb-6 mt-10`}>Register</Text>

        {/* Full Name */}
        <TextInput
          style={tw`w-full h-12 bg-[${BEIGE}] rounded-lg px-4 text-base mb-4 text-black`}
          placeholder="Full Name"
          placeholderTextColor="#7a7a7a"
          value={name}
          onChangeText={setName}
        />

        {/* City */}
        <TextInput
          style={tw`w-full h-12 bg-[${BEIGE}] rounded-lg px-4 text-base mb-4 text-black`}
          placeholder="City"
          placeholderTextColor="#7a7a7a"
          value={city}
          onChangeText={setCity}
        />

        {/* Date of Birth */}
        <TextInput
          style={tw`w-full h-12 bg-[${BEIGE}] rounded-lg px-4 text-base mb-4 text-black`}
          placeholder="Date of Birth (YYYY-MM-DD)"
          placeholderTextColor="#7a7a7a"
          value={dob}
          onChangeText={setDob}
        />

        {/* Gender Selector */}
        <View style={tw`w-full mb-4`}>
          <Text style={tw`text-[${BEIGE}] font-bold mb-2 ml-1`}>Gender</Text>
          <View style={tw`flex-row justify-between`}>
            <GenderButton label="Male" value="Male" />
            <GenderButton label="Female" value="Female" />
            <GenderButton label="Other" value="Other" />
          </View>
        </View>

        {/* Email */}
        <TextInput
          style={tw`w-full h-12 bg-[${BEIGE}] rounded-lg px-4 text-base mb-4 text-black`}
          placeholder="Email"
          placeholderTextColor="#7a7a7a"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Password Field with Icon */}
        <View style={tw`w-full h-12 bg-[${BEIGE}] rounded-lg flex-row items-center px-4 mb-4`}>
          <TextInput
            style={tw`flex-1 h-full text-base text-black`}
            placeholder="Password"
            placeholderTextColor="#7a7a7a"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons 
              name={showPassword ? "eye-off" : "eye"} 
              size={24} 
              color="#7a7a7a" 
            />
          </TouchableOpacity>
        </View>

        {/* Confirm Password Field with Icon */}
        <View style={tw`w-full h-12 bg-[${BEIGE}] rounded-lg flex-row items-center px-4 mb-4`}>
          <TextInput
            style={tw`flex-1 h-full text-base text-black`}
            placeholder="Repeat Password"
            placeholderTextColor="#7a7a7a"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
            <Ionicons 
              name={showConfirmPassword ? "eye-off" : "eye"} 
              size={24} 
              color="#7a7a7a" 
            />
          </TouchableOpacity>
        </View>

        {/* Register Button */}
        <TouchableOpacity
          style={tw`w-full h-12 bg-[${DARK_GREEN}] justify-center items-center rounded-lg mt-4`}
          onPress={handleRegister}
        >
          <Text style={tw`text-[${BEIGE}] text-lg font-bold`}>Register</Text>
        </TouchableOpacity>

        {/* Login Link */}
        <TouchableOpacity onPress={() => router.push('/login')}>
          <Text style={tw`text-[${BEIGE}] mt-6 underline mb-10`}>
            Already have an account? Login
          </Text>
        </TouchableOpacity>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Register;