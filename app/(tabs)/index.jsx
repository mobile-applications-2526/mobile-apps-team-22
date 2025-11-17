import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import tw from "twrnc";
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import { Image } from "expo-image";

import { Colors } from "../../constants/Colors";
import home_image from "../../assets/img/restaurant_image.png";
import LocationCard from "../../components/locationCard";
import NewsletterCard from "../../components/newsletterCard";

import { newsletterCardItems } from "../../assets/mockData/mockData";

const locations = [
  {
    id: 1,
    name: 'Leuven I',
    status: 'Open',
    closes: 'Closes at 21:00',
  },
  {
    id: 2,
    name: 'Leuven II',
    status: 'Open',
    closes: 'Closes at 22:00',
  },
  {
    id: 3,
    name: 'Antwerp',
    status: 'Closed',
    closes: 'Opens at 11:00',
  },
  {
    id: 4,
    name: 'Ghent',
    status: 'Open',
    closes: 'Closes at 21:30',
  },
];

const Home = () => {

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % locations.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? locations.length - 1 : prevIndex - 1
    );
  };

  const handleLocationClick = () => {
    router.push('/locations');
  }

  const activeLocation = locations[currentIndex];

  const firstNewsletterItem = newsletterCardItems[0];

  return (
    <View style={tw`flex-1 bg-white`}>
      {/* Header */}
      {/* <Header /> */}

      {/* Main */}
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

          <TouchableOpacity style={tw`absolute top-1 left-5 z-20 p-1 rounded-full bg-black/20`}>
            <Ionicons name="chevron-back" size={20} color="white" onPress={handlePrev} />
          </TouchableOpacity>

          <TouchableOpacity style={tw`absolute top-1 right-5 z-20 p-1 rounded-full bg-black/20`}>
            <Ionicons name="chevron-forward" size={20} color="white" onPress={handleNext}/>
          </TouchableOpacity>

          <View style={tw`pt-20 flex-row justify-center items-center`}>
            <Ionicons name="location-outline" size={16} color={Colors.beige} />
            <TouchableOpacity>
              <Text onPress={handleLocationClick} style={tw`text-[#EEDAB5] font-bold text-xs`}>
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