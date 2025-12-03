// import React, { useState, useEffect, useRef } from "react";
// import {
//   Stack,
//   router,
//   SplashScreen,
//   useRouter,
//   useSegments,
// } from "expo-router";
// import { Image } from "expo-image";
// import { Colors } from "../constants/Colors";
// import { Ionicons } from "@expo/vector-icons";
// import { TouchableOpacity, View, Text, Animated, StyleSheet, Platform } from "react-native";
// import * as Progress from "react-native-progress";
// import { Asset } from "expo-asset";

// import { useSafeAreaInsets } from 'react-native-safe-area-context'; 

// import { LocationProvider } from "../context/LocationContext";
// import { CartProvider } from "../context/CartContext";
// import { AuthProvider, useAuth } from "../context/AuthContext";


// const CustomNavBar = ({ navigation, route, options, back }) => {
//   const insets = useSafeAreaInsets(); 
//   const title = options.title || "";
//   const showBackButton = back !== undefined;

//   const headerHeight = Platform.OS === 'ios' ? 39 : 56;

//   return (
//     <View style={{ 
//       backgroundColor: Colors.red,
      
//       paddingTop: insets.top, 
//     }}>
//       <View style={{ 
//         height: headerHeight, 
//         flexDirection: 'row', 
//         alignItems: 'center', 
//         justifyContent: 'space-between',
//         paddingHorizontal: 16, 
//       }}>
        
        
//         <View style={{ width: 50, alignItems: 'flex-start' }}>
//           {showBackButton && (
//             <TouchableOpacity onPress={navigation.goBack} hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
//               <Ionicons name="chevron-back" size={28} color={Colors.beige} />
//             </TouchableOpacity>
//           )}
//         </View>

//         <View style={{ flex: 1, alignItems: 'center' }}>
//           <Text style={{ 
//             fontSize: 17,
//             fontWeight: '600',
//             color: Colors.beige, 
//             textAlign: 'center',
//           }} numberOfLines={1}>
//             {title}
//           </Text>
//         </View>

//         <View style={{ width: 50, alignItems: 'flex-end' }}>
//           <TouchableOpacity hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
//             <Ionicons name="chatbubble-outline" size={24} color={Colors.beige} />
//           </TouchableOpacity>
//         </View>

//       </View>
//     </View>
//   );
// };

// function LoadingScreen({ onFinished }) {
//   const progress = useRef(new Animated.Value(0)).current;
//   const [progressValue, setProgressValue] = useState(0);

//   useEffect(() => {
//     const listener = progress.addListener((value) => {
//       setProgressValue(value.value);
//     });

//     const loadResources = async () => {
//       try {
//         await Promise.all([
//           new Promise((resolve) => {
//             Animated.timing(progress, {
//               toValue: 1,
//               duration: 2000,
//               useNativeDriver: false,
//             }).start(resolve);
//           }),
//            Asset.loadAsync([
//             require('../assets/img/RubaLoadingPage.png'),
//             require('../assets/img/RubaFront.jpeg'),
//            ]),
//         ]);
//       } catch (e) {
//         console.warn(e);
//       } finally {
//         onFinished();
//       }
//     };

//     loadResources();

//     return () => {
//       progress.removeListener(listener);
//     };
//   }, []);

//   return (
//     <View
//       style={{
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: Colors.red,
//       }}
//     >
//       <Image
//         source={require("../assets/img/RubaLoadingPage.png")}
//         style={{ width: 300, height: 300 }}
//         contentFit="contain"
//       />
//       <Progress.Bar
//         progress={progressValue}
//         width={300}
//         color={Colors.beige}
//         unfilledColor="rgba(0,0,0,0.2)"
//         borderWidth={0}
//         style={{ marginTop: -50 }}
//       />
//     </View>
//   );
// }

// const InitialLayout = () => {
//   const { session, loading } = useAuth();
//   const segments = useSegments();
//   const router = useRouter();

//   useEffect(() => {
//     if (loading) return;
//     const inAuthGroup = segments[0] === "(auth)";
//     if (session && !inAuthGroup) {

//     } else if (!session && !inAuthGroup) {
//       router.replace("/login");
//     } else if (session && inAuthGroup) {
//       router.replace("/");
//     }
//   }, [session, loading, segments, router]);

//   const [isLoaded, setIsLoaded] = useState(false);
//   const [isAnimationFinished, setIsAnimationFinished] = useState(false);
//   const fadeAnim = useRef(new Animated.Value(1)).current;

//   useEffect(() => {
//     if (isLoaded) {
//       Animated.timing(fadeAnim, {
//         toValue: 0,
//         duration: 500,
//         useNativeDriver: true,
//       }).start(() => {
//         setIsAnimationFinished(true);
//         SplashScreen.hideAsync();
//       });
//     }
//   }, [isLoaded]);

//   return (
//     <View style={{ flex: 1 }}>
//       <Stack
//         screenOptions={{
//           // Pass the Custom Navbar function to 'header'
//           header: (props) => <CustomNavBar {...props} />,
//           // We still set this for safety, though 'header' prop overrides it
//           headerShown: true, 
//         }}
//       >
//         {/* Hide header for Tabs (Home) and Auth */}
//         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//         <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        
//         {/* These screens use the CustomNavBar */}
//         <Stack.Screen name="newsletter" options={{ title: "Newsletter" }} />
//         <Stack.Screen name="edit-profile" options={{ title: "Edit Profile" }} />
//         <Stack.Screen name="itemDetailsPage" options={{ title: "Menu" }} />
//         <Stack.Screen name="locationSelectionPage" options={{ title: "Locations" }} />
//         <Stack.Screen name="CartPage" options={{ title: "Cart" }} />
//         <Stack.Screen name="categoryPage" options={{ title: "Menu" }} />
//       </Stack>

//       {!isAnimationFinished && (
//         <Animated.View
//           style={[styles.loadingContainer, { opacity: fadeAnim }]}
//           pointerEvents="none"
//         >
//           <LoadingScreen onFinished={() => setIsLoaded(true)} />
//         </Animated.View>
//       )}
//     </View>
//   );
// };

// export default function RootLayout() {
//   return (
//     <AuthProvider>
//       <LocationProvider>
//         <CartProvider>
//           <InitialLayout />
//         </CartProvider>
//       </LocationProvider>
//     </AuthProvider>
//   );
// }

// const styles = StyleSheet.create({
//   loadingContainer: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     zIndex: 10,
//   },
// });


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
import { TouchableOpacity, View, Text, Animated, StyleSheet, Platform } from "react-native";
import * as Progress from "react-native-progress";
import { Asset } from "expo-asset";

import { useSafeAreaInsets } from 'react-native-safe-area-context'; 

import { LocationProvider } from "../context/LocationContext";
import { CartProvider } from "../context/CartContext";
import { AuthProvider, useAuth } from "../context/AuthContext";


const CustomNavBar = ({ navigation, route, options, back }) => {
  const insets = useSafeAreaInsets(); 
  const title = options.title || "";
  const showBackButton = back !== undefined;

  const headerHeight = Platform.OS === 'ios' ? 39 : 56;

  return (
    <View style={{ 
      backgroundColor: Colors.red,
      paddingTop: insets.top, 
    }}>
      <View style={{ 
        height: headerHeight, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        paddingHorizontal: 16, 
      }}>
        
        
        <View style={{ width: 50, alignItems: 'flex-start' }}>
          {showBackButton && (
            <TouchableOpacity onPress={navigation.goBack} hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
              <Ionicons name="chevron-back" size={28} color={Colors.beige} />
            </TouchableOpacity>
          )}
        </View>

        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={{ 
            fontSize: 17,
            fontWeight: '600',
            color: Colors.beige, 
            textAlign: 'center',
          }} numberOfLines={1}>
            {title}
          </Text>
        </View>

        <View style={{ width: 50, alignItems: 'flex-end' }}>
          <TouchableOpacity hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
            <Ionicons name="chatbubble-outline" size={24} color={Colors.beige} />
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
};

function LoadingScreen({ onFinished }) {
  const progress = useRef(new Animated.Value(0)).current;
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    const listener = progress.addListener((value) => {
      setProgressValue(value.value);
    });

    const loadResources = async () => {
      try {
        await Promise.all([
          new Promise((resolve) => {
            Animated.timing(progress, {
              toValue: 1,
              duration: 2000,
              useNativeDriver: false,
            }).start(resolve);
          }),
           Asset.loadAsync([
            require('../assets/img/RubaLoadingPage.png'),
            require('../assets/img/RubaFront.jpeg'),
           ]),
        ]);
      } catch (e) {
        console.warn(e);
      } finally {
        onFinished();
      }
    };

    loadResources();

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

    // OLD LOGIC (Deleted):
    // if (!session && !inAuthGroup) router.replace("/login");

    // NEW LOGIC:
    // If user is logged in and tries to go to Login/Register, send them Home.
    if (session && inAuthGroup) {
      router.replace("/");
    }
    // We NO LONGER kick them out if they are !session.
    // They are allowed to roam free.
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
          // Pass the Custom Navbar function to 'header'
          header: (props) => <CustomNavBar {...props} />,
          // We still set this for safety, though 'header' prop overrides it
          headerShown: true, 
        }}
      >
        {/* Hide header for Tabs (Home) and Auth */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        
        {/* These screens use the CustomNavBar */}
        <Stack.Screen name="newsletter" options={{ title: "Newsletter" }} />
        <Stack.Screen name="edit-profile" options={{ title: "Edit Profile" }} />
        <Stack.Screen name="itemDetailsPage" options={{ title: "Menu" }} />
        <Stack.Screen name="locationSelectionPage" options={{ title: "Locations" }} />
        <Stack.Screen name="CartPage" options={{ title: "Cart" }} />
        <Stack.Screen name="categoryPage" options={{ title: "Menu" }} />
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