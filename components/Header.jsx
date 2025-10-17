import { auth } from "@/config/firebase";
import { Feather } from "@expo/vector-icons";
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
  return (
    <Pressable onPress={() => router.push(href)}>
      <Text style={styles.navLink}>{children}</Text>
    </Pressable>
  );
};

export default function Header() {
  const { width } = useWindowDimensions();
  const isWeb = width > 768;

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Sign Out Error", error);
    }
  };

  return (
    <View style={styles.header}>
      <Text style={styles.logo}>ToolTribe</Text>

      {/* Show navigation links only on web */}
      {isWeb && (
        <View style={styles.navigation}>
          <NavLink href="/dashboard">Dashboard</NavLink>
          <NavLink href="/browse">Browse</NavLink>
          <NavLink href="/listings">My Listings</NavLink>
        </View>
      )}

      <Pressable style={styles.signOutButton} onPress={handleSignOut}>
        <Feather name="log-out" size={20} color="#212B36" />
        {isWeb && <Text style={styles.signOutText}>Sign Out</Text>}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    backgroundColor: "#FFFFFF",
  },
  logo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#212B36",
  },
  navigation: {
    flexDirection: "row",
    gap: 24,
  },
  navLink: {
    fontSize: 16,
    fontWeight: "500",
    color: "#637381",
  },
  signOutButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#F7F8F9",
  },
  signOutText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#212B36",
  },
});
