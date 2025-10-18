import { Tabs } from "expo-router";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import Header from "@/components/Header";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <>
      <Header />
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
          tabBarButton: HapticTab,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="house.fill" color={color} />
            ),
          }}
        />

        {/* 2. Browse Tab */}
        <Tabs.Screen
          name="browse"
          options={{
            title: "Browse",
            tabBarIcon: ({ color }) => (
              <MaterialIcons color={color} size={24} name={"browse-gallery"} />
            ),
          }}
        />

        {/* 3. List Item Tab */}
        <Tabs.Screen
          name="list"
          options={{
            title: "List",
            tabBarIcon: ({ color }) => (
              <Feather name={"plus-square"} size={24} color={color} />
            ),
          }}
        />

        {/* 4. Messages Tab */}
        <Tabs.Screen
          name="messages"
          options={{
            title: "Inbox",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="message.fill" color={color} />
            ),
          }}
        />

        {/* 5. Profile Tab */}
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => (
              <IconSymbol size={28} name="person.fill" color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
