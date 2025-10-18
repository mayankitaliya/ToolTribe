import { auth } from "@/config/firebase";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native"; // 1. Import useTheme
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

const NavLink = ({ href, children }) => {
  const router = useRouter();
  const { colors } = useTheme(); // 2. Get colors for the link

  return (
    <Pressable onPress={() => router.push(href)}>
      {/* 3. Apply theme text color */}
      <Text style={[styles.navLink, { color: colors.text }]}>{children}</Text>
    </Pressable>
  );
};

export default function Header() {
  const { width } = useWindowDimensions();
  const isWeb = width > 768;
  const { colors } = useTheme(); // 4. Get theme colors for the Header

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Sign Out Error", error);
    }
  };

  return (
    // 5. Apply dynamic background and border colors
    <View
      style={[
        styles.header,
        {
          backgroundColor: colors.background,
          borderBottomColor: colors.border,
        },
      ]}
    >
      {/* 6. Apply dynamic text color */}
      <Text style={[styles.logo, { color: colors.text }]}>ToolTribe</Text>

      {isWeb && (
        <View style={styles.navigation}>
          <NavLink href="/dashboard">Dashboard</NavLink>
          <NavLink href="/browse">Browse</NavLink>
          <NavLink href="/listings">My Listings</NavLink>
        </View>
      )}

      <Pressable
        onPress={handleSignOut}
        // 7. Apply dynamic card and text colors
        style={[styles.signOutButton, { backgroundColor: colors.card }]}
      >
        <Feather name="log-out" size={22} color={colors.text} />
      </Pressable>
    </View>
  );
}

// 8. Stylesheet now only contains static layout styles
const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  logo: {
    fontSize: 22,
    fontWeight: "bold",
  },
  navigation: {
    flexDirection: "row",
    gap: 24,
  },
  navLink: {
    fontSize: 16,
    fontWeight: "500",
  },
  signOutButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 8,
    borderRadius: 8,
  },
  signOutText: {
    fontSize: 16,
    fontWeight: "500",
  },
});
