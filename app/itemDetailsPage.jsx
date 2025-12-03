import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useLocalSearchParams } from 'expo-router'; 
import tw from 'twrnc';
import { Colors } from '../constants/Colors';

import ItemDetails from '../components/itemDetails.jsx';
import { menuItems } from '../assets/mockData/mockData.js'; 

const ItemDetailsPage = () => {
    const { itemId } = useLocalSearchParams(); 

    const item = menuItems.find(i => i.id === parseInt(itemId));

    if (!item) {
        return (
            <SafeAreaView style={tw`flex-1 justify-center items-center`} edges={['right', 'left']}>
                <Stack.Screen options={{ title: 'Loading...' }} />
                <ActivityIndicator size="large" color={Colors.red} />
                <Text style={tw`mt-4 text-gray-500`}>Loading item or item not found.</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={tw`flex-1 bg-white`} edges={['right', 'left']}>
    
            <Stack.Screen options={{ title: 'Menu' }} />
            
            <ItemDetails item={item} />
        </SafeAreaView>
    );
};

export default ItemDetailsPage;