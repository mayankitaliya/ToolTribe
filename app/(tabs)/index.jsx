import FooterTabBar from "@/components/FooterTabBar";
import Header from "@/components/Header";
import { useTheme } from "@react-navigation/native";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, db } from "../../config/firebase";
import Dashboard from "./dashboard";

export default function HomeScreen() {
  const { colors } = useTheme();
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(false);

  const signOut = async (auth) => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      const user = auth.currentUser;
      if (user) {
        setLoading(false);
        try {
          const userDocRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(userDocRef);

          if (docSnap.exists()) {
            setUserProfile(docSnap.data());
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    // <View style={[styles.container, { backgroundColor: colors.background }]}>
    //   <Text style={[styles.title, { color: colors.text }]}>
    //     Welcome to ToolTribe,
    //   </Text>
    //   <Text style={[styles.name, { color: colors.primary }]}>
    //     {userProfile?.fullName || "User"}!
    //   </Text>
    //   <Pressable
    //     style={[styles.logout, { backgroundColor: colors.primary }]}
    //     onPress={() => signOut(auth)}
    //   >
    //     <Text style={[styles.logoutText, { color: colors.text }]}>Logout</Text>
    //   </Pressable>
    // </View>

    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header />
        <Dashboard />
        <FooterTabBar />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
  },
  name: {
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 8,
  },
  logout: {
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  container: {
    flex: 1,
    position: "relative", // Needed for the footer to position correctly
  },
});
