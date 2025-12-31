import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import tw from 'twrnc';

import { newsletterCardItems } from '../assets/mockData/mockData';
import { useLocation } from '../context/LocationContext';

import NewsletterCard from '../components/newsletterCard.jsx';

const NewsletterPage = () => {
  const { selectedLocation } = useLocation();

  const handleNewsletterPress = (item) => {
    if (selectedLocation) {
      router.push({
        pathname: "/itemDetailsPage",
        params: { itemId: item.id, source: 'newsletter' }
      });
    } else {
      router.push({
        pathname: "/locationSelectionPage",
        params: { 
          pendingItemId: item.id,
          source: 'newsletter'
        }
      });
    }
  };
  
  const renderNewsletterItem = ({ item }) => (
    <NewsletterCard 
      item={item} 
      onPress={() => handleNewsletterPress(item)} 
    />
  );

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <View style={tw`px-5`}>
        <Text style={tw`text-2xl font-bold mb-2`}>Newsletter🚨</Text>
        
        <FlatList
          data={newsletterCardItems}
          renderItem={renderNewsletterItem}
          keyExtractor={(item) => item.id.toString()}
      
          ItemSeparatorComponent={() => <View style={tw`h-4`} />}
          ListFooterComponent={() => <View style={tw`h-10`} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default NewsletterPage;