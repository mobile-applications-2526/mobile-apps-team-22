import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

const CustomAlert = ({ visible, title, message, onCancel, onConfirm }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      {/* Dark Overlay */}
      <View style={tw`flex-1 bg-black/50 justify-center items-center px-6`}>
        
        {/* Alert Box */}
        <View style={tw`bg-white w-full rounded-3xl p-6 shadow-xl`}>
          
          {/* Title */}
          <Text style={tw`text-xl font-bold text-center text-black mb-2`}>
            {title}
          </Text>
          
          {/* Message */}
          <Text style={tw`text-gray-600 text-center text-base mb-6 leading-5`}>
            {message}
          </Text>

          {/* Buttons Row */}
          <View style={tw`flex-row justify-between gap-3`}>
            
            {/* Cancel Button */}
            <TouchableOpacity 
              onPress={onCancel}
              style={tw`flex-1 py-3 rounded-full border border-gray-300 items-center`}
            >
              <Text style={tw`text-gray-700 font-bold`}>Cancel</Text>
            </TouchableOpacity>

            {/* Confirm Button (Brand Red) */}
            <TouchableOpacity 
              onPress={onConfirm}
              style={tw`flex-1 py-3 rounded-full bg-[#E1503F] items-center`}
            >
              <Text style={tw`text-white font-bold`}>Yes, Switch</Text>
            </TouchableOpacity>

          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CustomAlert;