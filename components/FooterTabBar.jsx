import { Feather } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native"; // 1. Import useTheme
import { useRouter, useSegments } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const TABS = [
  { name: "dashboard", label: "Home", icon: "home" },
  { name: "browse", label: "Browse", icon: "search" },
  { name: "list-item", label: "List", icon: "plus-square" },
  { name: "messages", label: "Inbox", icon: "message-circle" },
  { name: "profile", label: "Profile", icon: "user" },
];

// 2. Pass colors down as a prop
const TabButton = ({ tab, isActive, colors }) => {
  const router = useRouter();

  // 3. Use theme colors
  const activeColor = colors.text;
  const inactiveColor = colors.border; // Using border color for inactive icons

  return (
    <Pressable style={styles.tab} onPress={() => router.push(`/${tab.name}`)}>
      <Feather
        name={tab.icon}
        size={24}
        color={isActive ? activeColor : inactiveColor}
      />
      <Text
        style={[
          styles.tabLabel,
          { color: isActive ? activeColor : inactiveColor },
        ]}
      >
        {tab.label}
      </Text>
    </Pressable>
  );
};

export default function FooterTabBar() {
  const segments = useSegments();
  const activeTab = segments[segments.length - 1] || "dashboard";
  const { colors } = useTheme(); // 4. Get theme colors

  return (
    // 5. Apply dynamic background and border colors
    <View
      style={[
        styles.footer,
        { backgroundColor: colors.background, borderTopColor: colors.border },
      ]}
    >
      {TABS.map((tab) => (
        <TabButton
          key={tab.name}
          tab={tab}
          isActive={tab.name === activeTab}
          colors={colors} // 6. Pass colors to child
        />
      ))}
    </View>
  );
}

// 7. Stylesheet now only contains static layout styles
const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    borderTopWidth: 1,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    gap: 4,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: "500",
  },
});
