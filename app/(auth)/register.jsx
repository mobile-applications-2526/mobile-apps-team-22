import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import tw from 'twrnc';
import { supabase } from '../../utils/supabase';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

const RED = '#E1503F';
const BEIGE = '#EEDAB5';
const DARK_GREEN = '#006400';

const Register = () => {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); 
  const [city, setCity] = useState('');
  
  const [dob, setDob] = useState(null); 
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [gender, setGender] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleFocusOther = () => {
    if (showDatePicker) setShowDatePicker(false);
  };

  const onChangeDate = (event, selectedDate) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    
    if (event.type === 'set' && selectedDate) {
      setDob(selectedDate);
    } 
  };

  const handleRegister = async () => {
    if (!email || !password || !confirmPassword || !name || !city || !dob || !gender) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    if (name.length < 3) {
      Alert.alert('Error', 'Full name must be at least 3 characters long.');
      return;
    }

    const formattedDob = dob.toISOString().split('T')[0];

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
          city: city,
          date_of_birth: formattedDob,
          gender: gender,
        },
      },
    });

    if (error) {
      console.log("Registration Error:", error);
      Alert.alert('Error', error.message);
    } else {
      Alert.alert('Success', 'Please check your email for verification.');
      router.push('/login');
    }
  };

  const GenderButton = ({ label, value }) => {
    const isActive = gender === value;
    return (
      <TouchableOpacity
        onPress={() => {
          setGender(value);
          handleFocusOther();
        }}
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
    <KeyboardAvoidingView 
      style={tw`flex-1 bg-[${RED}]`} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20} 
    >
      <ScrollView 
        contentContainerStyle={tw`flex-grow justify-center items-center p-5`} 
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={tw`text-3xl font-bold text-[${BEIGE}] mb-6 mt-10`}>Register</Text>

        {/* Full Name */}
        <TextInput
          style={tw`w-full h-12 bg-[${BEIGE}] rounded-lg px-4 text-base mb-4 text-black`}
          placeholder="Full Name"
          placeholderTextColor="#7a7a7a"
          value={name}
          onChangeText={setName}
          onFocus={handleFocusOther}
        />

        {/* City */}
        <TextInput
          style={tw`w-full h-12 bg-[${BEIGE}] rounded-lg px-4 text-base mb-4 text-black`}
          placeholder="City"
          placeholderTextColor="#7a7a7a"
          value={city}
          onChangeText={setCity}
          onFocus={handleFocusOther}
        />

        {/* Date of Birth Picker Trigger */}
        <TouchableOpacity
          onPress={() => {
            Keyboard.dismiss(); 
            setShowDatePicker(!showDatePicker)
          }}
          style={tw`w-full h-12 bg-[${BEIGE}] rounded-lg px-4 mb-4 flex-row items-center justify-between`}
        >
          <Text style={tw.style('text-base', dob ? 'text-black' : 'text-[#7a7a7a]')}>
            {dob ? dob.toLocaleDateString() : "Date of Birth"}
          </Text>
          <Ionicons 
            name={showDatePicker ? "chevron-up" : "calendar-outline"} 
            size={20} 
            color="#7a7a7a" 
          />
        </TouchableOpacity>

        {/* Render Picker Inline */}
        {showDatePicker && (
          <DateTimePicker
            value={dob || new Date()}
            mode="date"
            display="spinner" 
            onChange={onChangeDate}
            maximumDate={new Date()} 
            style={tw`w-full mb-4 bg-[${BEIGE}] rounded-lg`}
            textColor="black"
          />
        )}

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
          onFocus={handleFocusOther}
        />

        {/* Password Field */}
        <View style={tw`w-full h-12 bg-[${BEIGE}] rounded-lg flex-row items-center px-4 mb-4`}>
          <TextInput
            style={tw`flex-1 h-full text-base text-black`}
            placeholder="Password"
            placeholderTextColor="#7a7a7a"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            onFocus={handleFocusOther}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons 
              name={showPassword ? "eye-off" : "eye"} 
              size={24} 
              color="#7a7a7a" 
            />
          </TouchableOpacity>
        </View>

        {/* Confirm Password Field */}
        <View style={tw`w-full h-12 bg-[${BEIGE}] rounded-lg flex-row items-center px-4 mb-4`}>
          <TextInput
            style={tw`flex-1 h-full text-base text-black`}
            placeholder="Repeat Password"
            placeholderTextColor="#7a7a7a"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
            onFocus={handleFocusOther}
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