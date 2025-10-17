import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    // Hides the header for all screens in this group
    <Stack screenOptions={{ headerShown: false }} />
  );
}
