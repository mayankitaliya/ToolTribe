import { auth, db } from "@/config/firebase";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

export default function Dashboard() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const colors = {
    bg: isDark ? "#0D1117" : "#FFFFFF",
    text: isDark ? "#E6EDF3" : "#212B36",
    card: isDark ? "#161B22" : "#F7F8F9",
    border: isDark ? "#30363D" : "rgba(145,158,171,0.2)",
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docSnap = await getDoc(doc(db, "users", user.uid));
        setUserData(docSnap.data());
      } else {
        router.replace("/login");
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.replace("/login");
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.centered, { backgroundColor: colors.bg }]}>
        <ActivityIndicator size="large" color={isDark ? "#fff" : "#212B36"} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.bg }]}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={[styles.greeting, { color: colors.text }]}>
              Welcome back 👋
            </Text>
            <Text style={[styles.userName, { color: colors.text }]}>
              {userData?.fullName}
            </Text>
          </View>
          
        </View>

        <View
          style={[
            styles.card,
            { backgroundColor: colors.card, borderColor: colors.border },
          ]}
        >
          <Text style={[styles.cardText, { color: colors.text }]}>
            Email: {userData?.email}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { padding: 24 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  greeting: { fontSize: 16 },
  userName: { fontSize: 28, fontWeight: "bold" },
  logoutButton: {
    padding: 10,
    borderRadius: 8,
  },
  card: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
  },
  cardText: { fontSize: 16 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});
