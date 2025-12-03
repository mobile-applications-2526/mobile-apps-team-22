import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import tw from "twrnc";
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import { Image } from "expo-image";

import { Colors } from "../../constants/Colors";
import home_image from "../../assets/img/restaurant_image.png";
import LocationCard from "../../components/location/locationCard";
import NewsletterCard from "../../components/newsletterCard";

import { newsletterCardItems, locations } from "../../assets/mockData/mockData.js";

const Home = () => {

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    
    if (locations && locations.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % locations.length);
    }
  };

  const handlePrev = () => {
    if (locations && locations.length > 0) {
      setCurrentIndex((prevIndex) => 
        prevIndex === 0 ? locations.length - 1 : prevIndex - 1
      );
    }
  };

  const handleLocationClick = () => {
    router.push('/locationSelectionPage'); 
  }

  const activeLocation = locations && locations.length > 0 ? locations[currentIndex] : null;

  const firstNewsletterItem = newsletterCardItems[0];

  return (
    <View style={tw`flex-1 bg-white`}>
      <ScrollView>

        {/* Home Image */}
        <Image 
          source={home_image} 
          style={tw`w-full h-64`} 
          contentFit="cover" 
        />
        
        {/* Location Card with Arrows */}
        <View style={tw`relative bg-[#E1503F] pb-4`}>
        
          <LocationCard location={activeLocation}/>

          <TouchableOpacity 
            onPress={handlePrev}
            style={tw`absolute top-1 left-5 z-20 p-1 rounded-full bg-black/20`}
          >
            <Ionicons name="chevron-back" size={20} color="white" />
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={handleNext}
            style={tw`absolute top-1 right-5 z-20 p-1 rounded-full bg-black/20`}
          >
            <Ionicons name="chevron-forward" size={20} color="white" />
          </TouchableOpacity>

          <View style={tw`pt-20 flex-row justify-center items-center`}>
            <Ionicons name="location-outline" size={16} color={Colors.beige} />
            <TouchableOpacity onPress={handleLocationClick}>
              <Text style={tw`text-[#EEDAB5] font-bold text-xs ml-1`}>
                Show all locations
              </Text>
            </TouchableOpacity>
          </View>

        </View>

        <View style={tw`p-5`}>
          <View style={tw`flex-row justify-between items-end mb-1`}>
            <Text style={tw`font-bold text-xl`}>Newsletter🚨</Text>

            <Link href="/newsletter" asChild>
              <TouchableOpacity>
                <Text style={tw`text-xs text-gray-500 font-semibold`}>
                  See More
                </Text>
              </TouchableOpacity>
            </Link>
          </View>

          <NewsletterCard 
            item={firstNewsletterItem}
            onPress={() => alert("You pressed the newsletter card!")}
          />
        </View>
        
      </ScrollView>
    </View>
  );
};

export default Home;