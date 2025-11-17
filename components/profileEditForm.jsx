import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Platform,
  ScrollView
} from 'react-native';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

const FormTextInput = ({ label, value, onChangeText, iconName, ...props }) => (
  <View style={tw`mb-5`}>
    <Text style={tw`text-xs text-gray-500 uppercase mb-1`}>{label}</Text>
    <View style={tw`flex-row items-center border border-gray-300 rounded-lg p-3`}>
      <TextInput
        style={tw`flex-1 text-base`}
        value={value}
        onChangeText={onChangeText}
        {...props}
      />
      <Ionicons name={iconName} size={24} color={tw.color('gray-500')} />
    </View>
  </View>
);

const FormPickerInput = ({ label, value, onPress, iconName }) => (
  <View style={tw`mb-5`}>
    <Text style={tw`text-xs text-gray-500 uppercase mb-1`}>{label}</Text>
    <TouchableOpacity
      style={tw`flex-row items-center border border-gray-300 rounded-lg p-3`}
      onPress={onPress}
    >
      <Text style={tw`flex-1 text-base`}>{value}</Text>
      <Ionicons name={iconName} size={24} color={tw.color('gray-500')} />
    </TouchableOpacity>
  </View>
);
// --- (End of helper components) ---


const ProfileEditForm = forwardRef(({ user, onSave }, ref) => {

  const initialDate = new Date(user.dateOfBirth);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    city: user.city,
    dob: initialDate,
    gender: user.gender,
  });
  
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isGenderDropdownOpen, setIsGenderDropdownOpen] = useState(false);

  // ... (handleChange, onChangeDate are the same) ...
  const handleChange = (field, value) => {
    setFormData(prevData => ({ ...prevData, [field]: value }));
  };
  const onChangeDate = (event, selectedDate) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (event.type === 'set' && selectedDate) {
      handleChange('dob', selectedDate);
    }
  };
  
  // --- THIS FUNCTION IS UPDATED ---
  const handleOpeningandClosingDatePicker = () => {
    // If we're about to open the date picker, close the gender dropdown.
    if (!showDatePicker) {
      setIsGenderDropdownOpen(false);
    }
    // Then toggle the date picker
    setShowDatePicker(!showDatePicker);
  }

  const onSelectGender = (gender) => {
    handleChange('gender', gender);
    setIsGenderDropdownOpen(false);
  };

  // --- NEW FUNCTION to handle opening the gender dropdown ---
  const handleToggleGenderDropdown = () => {
    // If we're about to open the gender dropdown, close the date picker.
    if (!isGenderDropdownOpen) {
      setShowDatePicker(false);
    }
    // Then toggle the gender dropdown
    setIsGenderDropdownOpen(!isGenderDropdownOpen);
  };
  
  // ... (handleSave, getGenderIcon, formattedDateString are the same) ...
  const handleSave = () => {
    const formattedData = {
      ...formData,
      dateOfBirth: formData.dob.toISOString().split('T')[0],
    };
    delete formattedData.dob; 
    onSave(formattedData);
  };
  useImperativeHandle(ref, () => ({
    submit: () => {
      handleSave();
    }
  }));
  const getGenderIcon = () => {
    if (formData.gender === 'Male') return 'male-outline';
    if (formData.gender === 'Female') return 'female-outline';
    return 'help-outline';
  };
  const formattedDateString = formData.dob.toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });


  // --- RENDER (JSX) ---
  return (
    <View> 
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ... (Name, Email, City inputs are the same) ... */}
        <FormTextInput
          label="Name"
          value={formData.name}
          onChangeText={(val) => handleChange('name', val)}
          iconName="person-outline"
        />
        <FormTextInput
          label="Email"
          value={formData.email}
          onChangeText={(val) => handleChange('email', val)}
          iconName="mail-outline"
        />
        <FormTextInput
          label="City"
          value={formData.city}
          onChangeText={(val) => handleChange('city', val)}
          iconName="location-outline"
        />
        
        {/* This input now calls the updated handler */}
        <FormPickerInput
          label="Date of Birth"
          value={formattedDateString}
          onPress={handleOpeningandClosingDatePicker}
          iconName="calendar-outline"
        />
        
        {/* Gender Dropdown */}
        <View style={tw`mb-5`}>
          <Text style={tw`text-xs text-gray-500 uppercase mb-1`}>Gender</Text>
          {/* This TouchableOpacity now calls the new handler */}
          <TouchableOpacity
            style={tw`flex-row items-center border border-gray-300 rounded-lg p-3`}
            onPress={handleToggleGenderDropdown}
          >
            <Ionicons name={getGenderIcon()} size={24} color={tw.color('gray-500')} style={tw`mr-2`} />
            <Text style={tw`flex-1 text-base`}>{formData.gender}</Text>
            <Ionicons 
              name={isGenderDropdownOpen ? 'chevron-up-outline' : 'chevron-down-outline'} 
              size={24} 
              color={tw.color('gray-500')} 
            />
          </TouchableOpacity>
          
          {isGenderDropdownOpen && (
            <View style={tw`border border-gray-300 rounded-lg mt-1 p-2`}>
              <TouchableOpacity style={tw`py-3 px-1`} onPress={() => onSelectGender('Male')}>
                <Text style={tw`text-base`}>Male</Text>
              </TouchableOpacity>
              <TouchableOpacity style={tw`py-3 px-1`} onPress={() => onSelectGender('Female')}>
                <Text style={tw`text-base`}>Female</Text>
              </TouchableOpacity>
              <TouchableOpacity style={tw`py-3 px-1`} onPress={() => onSelectGender('Other')}>
                <Text style={tw`text-base`}>Other</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

      </ScrollView>

      {/* --- PICKERS --- */}
      {showDatePicker && (
        <DateTimePicker
          value={formData.dob}
          mode="date"
          display="spinner"
          onChange={onChangeDate}
        />
      )}
    </View>
  );
});

export default ProfileEditForm;