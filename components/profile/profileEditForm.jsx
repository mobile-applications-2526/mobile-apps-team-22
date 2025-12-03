import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
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


const FormTextInput = ({ label, value, onChangeText, iconName, editable = true, ...props }) => (
  <View style={tw`mb-5`}>
    <Text style={tw`text-xs text-gray-500 uppercase mb-1`}>{label}</Text>
    <View style={tw`flex-row items-center border border-gray-300 rounded-lg p-3 ${!editable ? 'bg-gray-100' : 'bg-white'}`}>
      <TextInput
        style={tw`flex-1 text-base text-black py-0`} 
        value={value}
        onChangeText={onChangeText}
        editable={editable}
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
      style={tw`flex-row items-center border border-gray-300 rounded-lg p-3 bg-white`}
      onPress={onPress}
    >
      <Text style={tw`flex-1 text-base text-black`}>{value}</Text>
      <Ionicons name={iconName} size={24} color={tw.color('gray-500')} />
    </TouchableOpacity>
  </View>
);

const ProfileEditForm = forwardRef(({ user, onSave }, ref) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    city: '',
    dob: new Date(),
    gender: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        city: user.city || '',
        dob: user.dateOfBirth ? new Date(user.dateOfBirth) : new Date(),
        gender: user.gender || '',
      });
    }
  }, [user]);
  
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isGenderDropdownOpen, setIsGenderDropdownOpen] = useState(false);

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
  
  const handleOpeningandClosingDatePicker = () => {
    if (!showDatePicker) setIsGenderDropdownOpen(false);
    setShowDatePicker(!showDatePicker);
  };

  const onSelectGender = (gender) => {
    handleChange('gender', gender);
    setIsGenderDropdownOpen(false);
  };

  const handleToggleGenderDropdown = () => {
    if (!isGenderDropdownOpen) setShowDatePicker(false);
    setIsGenderDropdownOpen(!isGenderDropdownOpen);
  };
  
  const handleSave = () => {
    const formattedData = {
      ...formData,
      dateOfBirth: formData.dob.toISOString().split('T')[0],
    };
    delete formattedData.dob; 
    onSave(formattedData);
  };

  useImperativeHandle(ref, () => ({
    submit: () => handleSave()
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

  return (
    <View> 
      <ScrollView showsVerticalScrollIndicator={false}>
        <FormTextInput
          label="Name"
          value={formData.name}
          onChangeText={(val) => handleChange('name', val)}
          iconName="person-outline"
        />
        
        <FormTextInput
          label="Email"
          value={formData.email}
          editable={false} 
          iconName="mail-outline"
        />

        <FormTextInput
          label="City"
          value={formData.city}
          onChangeText={(val) => handleChange('city', val)}
          iconName="location-outline"
        />
        
        <FormPickerInput
          label="Date of Birth"
          value={formattedDateString}
          onPress={handleOpeningandClosingDatePicker}
          iconName="calendar-outline"
        />
        
        {/* Gender Dropdown */}
        <View style={tw`mb-5`}>
          <Text style={tw`text-xs text-gray-500 uppercase mb-1`}>Gender</Text>
          <TouchableOpacity
            style={tw`flex-row items-center border border-gray-300 rounded-lg p-3 bg-white`}
            onPress={handleToggleGenderDropdown}
          >
            <Ionicons name={getGenderIcon()} size={24} color={tw.color('gray-500')} style={tw`mr-2`} />
            <Text style={tw`flex-1 text-base text-black`}>{formData.gender || "Select Gender"}</Text>
            <Ionicons 
              name={isGenderDropdownOpen ? 'chevron-up-outline' : 'chevron-down-outline'} 
              size={24} 
              color={tw.color('gray-500')} 
            />
          </TouchableOpacity>
          
          {isGenderDropdownOpen && (
            <View style={tw`border border-gray-300 rounded-lg mt-1 p-2 bg-white`}>
              {['Male', 'Female', 'Other'].map((g) => (
                <TouchableOpacity key={g} style={tw`py-3 px-1`} onPress={() => onSelectGender(g)}>
                  <Text style={tw`text-base text-black`}>{g}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

      </ScrollView>

      {showDatePicker && (
        <DateTimePicker
          value={formData.dob}
          mode="date"
          display="spinner"
          onChange={onChangeDate}
          maximumDate={new Date()}
        />
      )}
    </View>
  );
});

export default ProfileEditForm;