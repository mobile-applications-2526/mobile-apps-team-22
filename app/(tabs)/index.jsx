import { Text, View, Image, ScrollView, TouchableOpacity } from "react-native";
import home_image from "../../assets/img/restaurant_image.png";
import { Colors } from "../../constants/Colors";
import Header from "../../components/customHeader";
import LocationCard from "../../components/locationCard"; // THIS FILE IS PERFECT
import tw from "twrnc";
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

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

  const activeLocation = locations[currentIndex];

  return (
    <View style={tw`flex-1 bg-gray-100`}>
      <Header />
      <ScrollView>

        {/* 1. The Image */}
        <Image 
          source={home_image} 
          style={tw`w-full h-64`} 
          resizeMode="cover" 
        />

        {/* 2. THE PARENT CONTAINER (The Red Bar) */}
        {/* 'relative' is the "world" for all the floating stuff. */}
        {/* `pb-4` gives the "Show all locations" text some space at the bottom. */}
        <View style={tw`relative bg-[#E1503F] pb-4`}>
          
          {/* 3. The Floating Card (Your perfect component) */}
          {/* It's `absolute top-[-10]` and floats 10px UP,
              overlapping the image. */}
          <LocationCard location={activeLocation}/>

          {/* 4. THE ARROWS (Absolute) */}
          {/* These are also absolute, just like the card. */}
          {/* `top-8` (32px) and `z-20` (to be on top) */}
          {/* This `top-8` will vertically center them on your card.
              (Your card's beige part is 48px high, top is -10px,
              so its center is -10 + 24 = 14px... let's try top-6) */}
          <TouchableOpacity 
            style={tw`absolute left-4 z-20 p-2`}
          >
            <Ionicons name="chevron-back" size={20} color="white" onPress={handlePrev} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={tw`absolute right-4 z-20 p-2`}
          >
            <Ionicons name="chevron-forward" size={20} color="white" onPress={handleNext}/>
          </TouchableOpacity>


          {/* 5. The "Show all locations" text (Static) */}
          {/* THIS IS THE FIX. This View is STATIC. It's not absolute. */}
          {/* `pt-24` (96px) creates a massive empty space at the top,
              which the card and arrows are floating inside.
              This pushes the text DOWN, past the card. */}
          <View style={tw`pt-20 flex-row justify-center items-center`}>
            <Ionicons name="location-outline" size={16} color={Colors.beige} />
            <Text style={tw`text-[#EEDAB5] font-bold text-xs`}>
              Show all locations
            </Text>
          </View>

        </View>

        {/* 6. This is the newsletter section */}
        <View style={tw`p-5`}>
          <Text style={tw`font-bold text-lg`}>Newsletter🚨</Text>
          {/* ...The newsletter card will go here... */}
        </View>
        
      </ScrollView>
    </View>
  );
};

export default Home;