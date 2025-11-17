import React, { useState, useEffect, useRef } from 'react';
import { Stack, router, SplashScreen } from 'expo-router';
import { Image } from 'expo-image';
import { Colors } from '../constants/Colors'; 
import { Ionicons } from '@expo/vector-icons';
// 1. Import 'StyleSheet'
import { TouchableOpacity, View, Animated, StyleSheet } from 'react-native';
import * as Progress from 'react-native-progress';

// --- (Your CustomButton components are the same) ---
const HeaderChatIcon = () => (
  <TouchableOpacity>
    <Ionicons name="chatbubble-outline" size={28} color={Colors.beige} style={{ paddingRight: 15 }} />
  </TouchableOpacity>
);

const CustomBackButton = () => (
  <TouchableOpacity onPress={() => router.back()}>
    <Ionicons name="chevron-back" size={28} color={Colors.beige} style={{ paddingLeft: 15 }} />
  </TouchableOpacity>
);

function LoadingScreen({ onFinished }) {
  const progress = useRef(new Animated.Value(0)).current;
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    const listener = progress.addListener((value) => {
      setProgressValue(value.value);
    });

    const timerPromise = new Promise((resolve) => {
      Animated.timing(progress, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: false,
      }).start(resolve);
    });

    timerPromise.then(() => {
      onFinished();
      // We no longer hide the splash screen here.
      // The RootLayout will do it after the fade.
    });
    
    return () => {
      progress.removeListener(listener);
    };

  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.red }}>
      <Image 
        source={require('../assets/img/RubaLoadingPage.png')} 
        style={{ width: 300, height: 300 }}
        contentFit="contain" 
      />
      <Progress.Bar 
        progress={progressValue}
        width={300} 
        color={Colors.beige}
        unfilledColor="rgba(0,0,0,0.2)"
        borderWidth={0}
        style={{ marginTop: -50 }}
      />
    </View>
  );
}


// --- YOUR ROOT LAYOUT ---
export default function RootLayout() {
  // 2. We now need two states:
  // 'isLoaded' tracks if the 2-second timer is done.
  // 'isAnimationFinished' tracks if the fade-out is done.
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAnimationFinished, setIsAnimationFinished] = useState(false);
  
  // 3. This will control the fade-out opacity
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // 4. This effect runs when the 2-second timer finishes
  useEffect(() => {
    if (isLoaded) {
      // Start the fade-out animation
      Animated.timing(fadeAnim, {
        toValue: 0, // Fade to fully transparent
        duration: 500, // Half a second
        useNativeDriver: true,
      }).start(() => {
        // 5. When the fade is done:
        setIsAnimationFinished(true); // Mark animation as finished
        SplashScreen.hideAsync(); // Now, hide the native splash screen
      });
    }
  }, [isLoaded]); // This effect depends on 'isLoaded'

  return (
    <View style={{ flex: 1 }}>
      {/* 6. The app (Stack) is now *always* rendered,
             but it's underneath the loading screen. */}
      <Stack
        screenOptions={{
          // --- Your Global Styles ---
          headerStyle: { backgroundColor: Colors.red },
          headerTintColor: Colors.beige, 
          headerTitleAlign: 'center', 
          headerBackTitleVisible: false,
          headerLeft: () => <CustomBackButton />, 
          headerRight: () => <HeaderChatIcon />, 
          headerLeftContainerStyle: {
            backgroundColor: 'transparent',
          },
          headerRightContainerStyle: {
            backgroundColor: 'transparent',
          },
        }}
      >
        <Stack.Screen
          name="(tabs)" 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="newsletter" 
          options={{ title: 'Newsletter' }} 
        />
        <Stack.Screen 
          name="edit-profile" 
          options={{ title: 'Edit Profile' }} 
        />
      </Stack>

      {/* 7. The Loading Screen is rendered on top, until
             the fade-out animation is finished. */}
      {!isAnimationFinished && (
        <Animated.View 
          style={[styles.loadingContainer, { opacity: fadeAnim }]}
          pointerEvents="none" // Lets taps pass through
        >
          <LoadingScreen onFinished={() => setIsLoaded(true)} />
        </Animated.View>
      )}
    </View>
  );
}

// 8. We need 'StyleSheet' to position the loader on top
const styles = StyleSheet.create({
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10, // Make sure it's on top
  }
});