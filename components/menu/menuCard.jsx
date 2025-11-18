import React from 'react';
import { View, Text } from 'react-native';

const MenuCard = ({menuItem}) => {
    return (
        <View>
            <Text>This is the first example</Text>
            <Text>{menuItem.name}</Text>
        </View>
    );
};

export default MenuCard;