import { Feather } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

// --- Mock Data (replace this with your Firestore data) ---
const user = {
  name: "Mirage",
};

const stats = [
  { label: "Tools Lent", value: "12" },
  { label: "Items Borrowed", value: "3" },
  { label: "Total Earnings", value: "$256" },
  { label: "Active Listings", value: "5" },
];

const userListings = [
  {
    id: "1",
    name: "DeWalt Power Drill",
    status: "Available",
    image: "https://i.imgur.com/vT8C4kY.png", // Placeholder image
  },
  {
    id: "2",
    name: "Industrial Ladder",
    status: "Rented Out",
    image: "https://i.imgur.com/A5T7S41.png", // Placeholder image
  },
  {
    id: "3",
    name: "Makita Circular Saw",
    status: "Available",
    image: "https://i.imgur.com/k9QYpXE.png", // Placeholder image
  },
];
// --- End of Mock Data ---

// A reusable card component for the stats grid
const StatCard = ({ label, value }) => (
  <View style={styles.statCard}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

// A reusable component for each item in the "Your Listings" section
const ListingItem = ({ item }) => (
  <View style={styles.listingItem}>
    <Image source={{ uri: item.image }} style={styles.listingImage} />
    <View style={styles.listingInfo}>
      <Text style={styles.listingName}>{item.name}</Text>
      <View
        style={[
          styles.statusBadge,
          {
            backgroundColor:
              item.status === "Available"
                ? COLORS.successLight
                : COLORS.warningLight,
          },
        ]}
      >
        <Text
          style={[
            styles.statusText,
            {
              color:
                item.status === "Available" ? COLORS.success : COLORS.warning,
            },
          ]}
        >
          {item.status}
        </Text>
      </View>
    </View>
    <Feather name="chevron-right" size={24} color={COLORS.gray} />
  </View>
);

export default function Dashboard() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* --- Header --- */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Welcome back, 👋</Text>
            <Text style={styles.userName}>{user.name}</Text>
          </View>
          <Pressable style={styles.notificationButton}>
            <Feather name="bell" size={24} color={COLORS.dark} />
          </Pressable>
        </View>

        {/* --- Quick Actions --- */}
        <View style={styles.actionsContainer}>
          <Pressable style={[styles.actionButton, styles.actionButtonPrimary]}>
            <Feather name="plus-circle" size={20} color={COLORS.white} />
            <Text style={styles.actionButtonTextPrimary}>List a New Item</Text>
          </Pressable>
          <Pressable
            style={[styles.actionButton, styles.actionButtonSecondary]}
          >
            <Feather name="search" size={20} color={COLORS.dark} />
            <Text style={styles.actionButtonTextSecondary}>Browse Tools</Text>
          </Pressable>
        </View>

        {/* --- Stats Grid --- */}
        <View style={styles.statsGrid}>
          {stats.map((stat) => (
            <StatCard key={stat.label} label={stat.label} value={stat.value} />
          ))}
        </View>

        {/* --- Your Listings Section --- */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your Active Listings</Text>
          <Pressable>
            <Text style={styles.seeAll}>See All</Text>
          </Pressable>
        </View>
        <View style={styles.listingsContainer}>
          {userListings.map((item) => (
            <ListingItem key={item.id} item={item} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// --- Styles ---
const COLORS = {
  primary: "#212B36",
  dark: "#212B36",
  light: "#F7F8F9",
  gray: "#919EAB",
  white: "#FFFFFF",
  success: "#00A76F",
  successLight: "rgba(0, 167, 111, 0.1)",
  warning: "#FFAB00",
  warningLight: "rgba(255, 171, 0, 0.1)",
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  container: {
    padding: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  greeting: {
    fontSize: 16,
    color: COLORS.gray,
  },
  userName: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.dark,
  },
  notificationButton: {
    padding: 12,
    borderRadius: 99,
    backgroundColor: COLORS.light,
  },
  actionsContainer: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 24,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  actionButtonPrimary: {
    backgroundColor: COLORS.primary,
  },
  actionButtonSecondary: {
    backgroundColor: COLORS.light,
  },
  actionButtonTextPrimary: {
    color: COLORS.white,
    fontWeight: "600",
    fontSize: 16,
  },
  actionButtonTextSecondary: {
    color: COLORS.dark,
    fontWeight: "600",
    fontSize: 16,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: COLORS.light,
    borderRadius: 16,
    padding: 16,
    width: "48%",
    marginBottom: 16,
    alignItems: "center",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.dark,
  },
  statLabel: {
    fontSize: 14,
    color: COLORS.gray,
    marginTop: 4,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.dark,
  },
  seeAll: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.success,
  },
  listingsContainer: {
    gap: 12,
  },
  listingItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.light,
    padding: 12,
    borderRadius: 16,
    gap: 12,
  },
  listingImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },
  listingInfo: {
    flex: 1,
  },
  listingName: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.dark,
  },
  statusBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginTop: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
  },
});
