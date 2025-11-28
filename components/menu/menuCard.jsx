import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { router } from 'expo-router';

const CARD_WIDTH = 160;
const CARD_HEIGHT = 180;

const MenuCard = ({ menuItem }) => {

    const handlePress = () => {
        router.push({ 
            pathname: "/itemDetailsPage", 
            params: { itemId: menuItem.id } 
        });
    };

    return (
        <TouchableOpacity
            style={[
                tw`bg-[#E1503F] rounded-lg overflow-hidden}`,
                { width: CARD_WIDTH, height: CARD_HEIGHT },
            ]}
            onPress={handlePress}
            
        >
            <View style={tw`h-3/5 bg-[#EEDAB5] items-center justify-center rounded-lg`}>
                <Text>Foto</Text>
            </View>

            <View style={tw`p-3 flex-1 justify-center items-center`}>
                <Text style={tw`text-[#F5F2EC] font-semibold text-center`}>{menuItem.name}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default MenuCard;