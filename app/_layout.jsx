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

import { WebAutofillFix } from "@/components/WebAutofillFix";
import { Colors } from "@/constants/theme";
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
import { auth } from "../config/firebase";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const AppLightTheme = {
    ...DefaultTheme, // Start with all the default values (fonts, etc.)
    colors: {
      ...DefaultTheme.colors, // Start with default colors
      primary: Colors.light.tint, // Override specific colors
      background: Colors.light.background,
      card: Colors.light.background,
      text: Colors.light.text,
      border: Colors.light.icon,
      notification: Colors.light.tint,
    },
  };

  const AppDarkTheme = {
    ...DarkTheme, // Start with all the default dark values
    colors: {
      ...DarkTheme.colors, // Start with default dark colors
      primary: Colors.dark.tint, // Override specific colors
      background: Colors.dark.background,
      card: Colors.dark.background,
      text: Colors.dark.text,
      border: Colors.dark.icon,
      notification: Colors.dark.tint,
    },
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/(tabs)");
      } else {
        router.replace("/login");
      }
    });
    return () => unsub();
  }, []);

  return (
    <ThemeProvider
      value={colorScheme === "dark" ? AppDarkTheme : AppLightTheme}
    >
      <WebAutofillFix />
      {/* Set up the navigator with screens for both auth and main app */}
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(auth)" />
      </Stack>
      <Toast />
    </ThemeProvider>
  );
}
