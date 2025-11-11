import React from 'react';
import { View, Text, Image, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';


import tw from 'twrnc';

const CustomHeader = () => {
  return (
    <View style={tw`bg-[#D94333]`}> 
      <SafeAreaView edges={['top', 'left', 'right']}>
        <StatusBar barStyle="light-content" />
        <View style={tw`flex-row justify-between items-center px-4 pb-3 pt-2`}>
          {/* Logo */}
          <Image
            source={require('../assets/img/RubaTailBeige.png')} 
            style={tw`w-8 h-8`}
            resizeMode="contain"
          />

          {/* Text */}
          <Text style={tw`text-[#EEDAB5] text-md font-semibold`}>
            Hey There!
          </Text>

          {/* Icon */}
          <Ionicons name="chatbubble-outline" size={25} color="#EEDAB5" />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default CustomHeader;