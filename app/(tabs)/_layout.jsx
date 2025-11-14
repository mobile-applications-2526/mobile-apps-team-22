import { Tabs } from "expo-router";
import { Colors } from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import rubaIcon from "../../assets/img/RubaTailBeige.png";
import { Image } from "react-native";
// twrnc is not needed here
// import tw from "twrnc"; 

// This is your Logo for the header (Rule 1)
const HeaderLogo = () => (
  <Image 
    source={rubaIcon} 
    style={{ 
      width: 28, 
      height: 28, 
      tintColor: Colors.beige, 
      marginLeft: 15 
    }} 
  />
);

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: Colors.red },
        headerTintColor: Colors.beige,
        headerLeft: () => <HeaderLogo />,

        tabBarActiveTintColor: Colors.darkBeige,
        tabBarInactiveTintColor: Colors.beige,
        tabBarStyle: { backgroundColor: Colors.red },
      }}
    >
      <Tabs.Screen
        name="index" 
        options={{
          title: "Hey There!", 
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Image 
              source={rubaIcon} 
              style={{ width: size, height: size, tintColor: color }} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          title: "Menu",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="restaurant-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="locations"
        options={{
          title: "Locations",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="location-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}