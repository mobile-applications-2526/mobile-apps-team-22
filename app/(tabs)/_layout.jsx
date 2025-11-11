import { Tabs } from "expo-router";
import { Colors } from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import rubaIcon from "../../assets/img/RubaTailBeige.png";
import { Image } from "react-native";
import tw from "twrnc";


export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: Colors.red },
        headerTintColor: Colors.beige,
        tabBarActiveTintColor: Colors.darkBeige,
        tabBarInactiveTintColor: Colors.beige,
        tabBarStyle: { backgroundColor: Colors.red },
      }}
    >
      <Tabs.Screen
        name="index" 
        options={{
          headerShown: false, 
          
          headerLeft: () => null, 
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Image source={rubaIcon} style={tw`w-8 h-8`} />

          ),
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          // Also hide the header here if you want a custom one
          headerShown: false,
          title: "Menu",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="restaurant-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="locations"
        options={{
          // ...and here
          headerShown: false,
          title: "Locations",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="location-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          // ...and here
          headerShown: false,
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}