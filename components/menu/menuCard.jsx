import React from 'react';
import { View, Text } from 'react-native';

const MenuCard = ({menuItem}) => {
    return (
        <View>
            <Text>Foto</Text>
            <Text>{menuItem.name}</Text>
        </View>
    );
};

export default MenuCard;