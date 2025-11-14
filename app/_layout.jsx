import { Stack, router } from 'expo-router';
import { Colors } from '../constants/Colors'; 
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

// Custom Chat Icon
const HeaderChatIcon = () => (
  <TouchableOpacity>
    <Ionicons 
      name="chatbubble-outline" 
      size={28} 
      color={Colors.beige} 
      style={{ paddingRight: 15 }} // Keep padding for spacing
    />
  </TouchableOpacity>
);

// Custom Back Button
const CustomBackButton = () => (
  <TouchableOpacity onPress={() => router.back()}>
    <Ionicons 
      name="chevron-back" 
      size={28} 
      color={Colors.beige} 
      style={{ paddingLeft: 15 }} // Keep padding for spacing
    />
  </TouchableOpacity>
);

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        // --- Your Global Styles ---
        headerStyle: { backgroundColor: Colors.red },
        headerTintColor: Colors.beige, 
        headerTitleAlign: 'center', 
        headerBackTitleVisible: false,
        // We set a global right icon, but the newsletter
        // screen will override it.
        headerRight: () => <HeaderChatIcon />, 
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      
      <Stack.Screen 
        name="newsletter" 
        options={{ 
          title: 'Newsletter',
          
          // --- THE FINAL FIX ---
          
          // 1. Replace the buttons (which you've done)
          headerLeft: () => <CustomBackButton />,
          headerRight: () => <HeaderChatIcon />,

          // 2. Force the containers to be transparent
          headerLeftContainerStyle: {
            backgroundColor: 'transparent',
          },
          headerRightContainerStyle: {
            backgroundColor: 'transparent',
          }
        }} 
      />
    </Stack>
  );
}