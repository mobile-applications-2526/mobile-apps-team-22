import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MenuCard from '../../components/menu/menuCard';
import { menuItems } from '../../assets/mockData/mockData';
import tw from 'twrnc';

const Menu = () => {
  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <View style={tw`flex-1`}>
        <View style={tw`px-5 py-4 border-b border-gray-200`}>
          <Text style={tw`text-2xl font-bold`}>Menu</Text>
          <Text style={tw`text-base text-gray-600 mt-1`}>
            Explore our offerings.
          </Text>
        </View>
      </View>
      <View><MenuCard menuItem={menuItems[1]}/></View>
    </SafeAreaView>
  );
};

export default Menu;
