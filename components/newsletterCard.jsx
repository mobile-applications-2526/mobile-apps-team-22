import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { Image } from 'expo-image';

const NewsletterCard = ({ item, onPress }) => {
  
  if (!item) {
    return null;
  }

return (
    <TouchableOpacity 
        style={tw`shadow-lg rounded-xl border border-gray-200 overflow-hidden`}
        onPress={onPress}
    >
        <View style={tw`bg-transparent`}>
            <Image
                source={item.image}
                style={tw`w-full h-56`}        
                contentFit="cover"  
                cachePolicy={'disk'}         
            />
        </View>

        <View style={tw`bg-white p-4`}>
            <Text style={tw`text-center font-bold text-lg text-gray-800`}>
                {item.title}
            </Text>
        </View>
    </TouchableOpacity>
);
};

export default NewsletterCard;