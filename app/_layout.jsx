// import {
//   DarkTheme,
//   DefaultTheme,
//   ThemeProvider,
// } from "@react-navigation/native";
// import { Stack } from "expo-router";
// import { StatusBar } from "expo-status-bar";
// import "react-native-reanimated";
// import { useColorScheme } from "@/hooks/use-color-scheme";
// export const unstable_settings = {
//   anchor: "(tabs)",
// };

// export default function RootLayout() {
//   const colorScheme = useColorScheme();

//   return (
//     // <DripsyProvider theme={theme}>
//     <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
//       <Stack>
//         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//         <Stack.Screen
//           name="modal"
//           options={{ presentation: "modal", title: "Modal" }}
//         />
//       </Stack>
//       <StatusBar style="auto" />
//     </ThemeProvider>
//     // </DripsyProvider>
//   );
// }

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack, router } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useColorScheme } from "react-native";
import Toast from "react-native-toast-message";
import { auth } from "../config/firebase"; // Adjust path if needed

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    // onAuthStateChanged returns an unsubscriber
    const unsub = onAuthStateChanged(auth, (user) => {
      // Check if a user object exists
      if (user) {
        // User is signed in, redirect them to the main app (tabs)
        router.replace("/(tabs)");
      } else {
        // User is signed out, redirect them to the sign-in screen
        router.replace("/login");
      }
    });

    // Unsubscribe from the listener when the component unmounts
    return () => unsub();
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      {/* Set up the navigator with screens for both auth and main app */}
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(auth)" />
      </Stack>
      <Toast />
    </ThemeProvider>
  );
}
