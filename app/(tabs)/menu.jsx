import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';

const Menu = () => {
  return (
    <SafeAreaView style={tw`flex-1 bg-white`} edges={['']}>
      <View style={tw`flex-1 justify-between`}>
        <View style={tw`px-5 py-4 border-b border-gray-200`}>
          <Text style={tw`text-2xl font-bold`}>Menu</Text>
          <Text style={tw`text-base text-gray-600 mt-1`}>
            Explore our offerings.
          </Text>
        </View>

      </View>
    </SafeAreaView>
  );
};

export default Menu;
