import React, { useState, useEffect, useRef } from "react";
import {
  Stack,
  router,
  SplashScreen,
  useRouter,
  useSegments,
} from "expo-router";
import { Image } from "expo-image";
import { Colors } from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, View, Animated, StyleSheet } from "react-native";
import * as Progress from "react-native-progress";

import { LocationProvider } from "../context/LocationContext";
import { CartProvider } from "../context/CartContext";
import { AuthProvider, useAuth } from "../context/AuthContext";

const HeaderChatIcon = () => (
  <TouchableOpacity>
    <Ionicons
      name="chatbubble-outline"
      size={28}
      color={Colors.beige}
      style={{ paddingRight: 15 }}
    />
  </TouchableOpacity>
);

const CustomBackButton = () => (
  <TouchableOpacity onPress={() => router.back()}>
    <Ionicons
      name="chevron-back"
      size={28}
      color={Colors.beige}
      style={{ paddingLeft: 15 }}
    />
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
    });

    return () => {
      progress.removeListener(listener);
    };
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.red,
      }}
    >
      <Image
        source={require("../assets/img/RubaLoadingPage.png")}
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

const InitialLayout = () => {
  const { session, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (session && !inAuthGroup) {
      // do nothing
    } else if (!session && !inAuthGroup) {
      router.replace("/login");
    } else if (session && inAuthGroup) {
      router.replace("/");
    }
  }, [session, loading, segments, router]);

  const [isLoaded, setIsLoaded] = useState(false);
  const [isAnimationFinished, setIsAnimationFinished] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isLoaded) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setIsAnimationFinished(true);
        SplashScreen.hideAsync();
      });
    }
  }, [isLoaded]);

  return (
    <View style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: Colors.red },
          headerTintColor: Colors.beige,
          headerTitleAlign: "center",
          headerBackTitleVisible: false,
          headerLeft: () => <CustomBackButton />,
          headerRight: () => <HeaderChatIcon />,
          headerLeftContainerStyle: { backgroundColor: "transparent" },
          headerRightContainerStyle: { backgroundColor: "transparent" },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="newsletter" options={{ title: "Newsletter" }} />
        <Stack.Screen name="edit-profile" options={{ title: "Edit Profile" }} />
        <Stack.Screen name="itemDetailsPage" options={{ title: "Menu" }} />
        <Stack.Screen
          name="locationSelectionPage"
          options={{ title: "Locations" }}
        />
        <Stack.Screen name="cartPage" options={{ title: "Cart" }} />
      </Stack>

      {!isAnimationFinished && (
        <Animated.View
          style={[styles.loadingContainer, { opacity: fadeAnim }]}
          pointerEvents="none"
        >
          <LoadingScreen onFinished={() => setIsLoaded(true)} />
        </Animated.View>
      )}
    </View>
  );
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <LocationProvider>
        <CartProvider>
          <InitialLayout />
        </CartProvider>
      </LocationProvider>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
  },
});
