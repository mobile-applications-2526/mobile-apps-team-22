import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import tw from 'twrnc';

import { newsletterCardItems } from '../assets/mockData/mockData';

import NewsletterCard from '../components/newsletterCard.jsx';

const NewsletterPage = () => {
  
  const renderNewsletterItem = ({ item }) => (
    <NewsletterCard 
      item={item} 
      onPress={() => alert(`You tapped on ${item.title}`)} 
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