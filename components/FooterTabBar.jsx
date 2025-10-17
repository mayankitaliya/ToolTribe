import { Feather } from "@expo/vector-icons";
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

const TabButton = ({ tab, isActive }) => {
  const router = useRouter();
  const activeColor = "#212B36";
  const inactiveColor = "#919EAB";

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

  return (
    <View style={styles.footer}>
      {TABS.map((tab) => (
        <TabButton key={tab.name} tab={tab} isActive={tab.name === activeTab} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#F0F0F0",
    // On mobile, this could be positioned absolutely at the bottom
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
