import { auth, db } from "@/config/firebase";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { Link, useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
  useWindowDimensions,
} from "react-native";
import Toast from "react-native-toast-message";

const Illustration = () => (
  <Image
    source={{
      uri: "https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/illustrations/illustration-dashboard.webp",
    }}
    style={styles.illustration}
    resizeMode="contain"
  />
);

export default function Register() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const colorScheme = useColorScheme();
  const breakpoint = 768;
  const isWeb = width > breakpoint;

  const { colors, dark: isDark } = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (!fullName || !email || !password) {
      Toast.show({
        type: "error",
        text1: "Missing Fields",
        text2: "Please fill in all fields.",
      }
    );
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        fullName,
        email: user.email,
        createdAt: new Date(),
      });

      Toast.show({
        type: "success",
        text1: "Account Created",
        text2: "Redirecting to dashboard...",
      });

      setTimeout(() => router.replace("/"), 1200);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Sign Up Error",
        text2: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const containerStyle = isWeb ? styles.containerWeb : styles.containerMobile;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.bg }]}>
      <View style={containerStyle}>
        {isWeb && (
          <View style={styles.leftPanel}>
            <Illustration />
          </View>
        )}

        <ScrollView
          contentContainerStyle={styles.rightPanel}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.formContainer}>
            {!isWeb && (
              <View style={styles.headerMobile}>
                <Illustration />
              </View>
            )}

            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: colors.text }]}>
                Full Name
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.inputBg,
                    borderColor: colors.border,
                    color: colors.text,
                  },
                ]}
                placeholder="Your full name"
                placeholderTextColor="#919EAB"
                value={fullName}
                onChangeText={setFullName}
                autoCapitalize="words"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: colors.text }]}>
                Email address
              </Text>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.card,
                    color: colors.text,
                    borderColor: colors.border,
                  },
                ]}
                placeholder="Enter your email"
                placeholderTextColor={colors.border}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                // 4. This makes the mobile keyboard dark in dark mode
                keyboardAppearance={isDark ? "dark" : "light"}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={[styles.inputLabel, { color: colors.text }]}>
                Password
              </Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: colors.inputBg,
                      borderColor: colors.border,
                      color: colors.text,
                    },
                  ]}
                  placeholder="6+ characters"
                  placeholderTextColor="#919EAB"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!isPasswordVisible}
                />
                <Pressable
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  style={styles.eyeIcon}
                >
                  <Feather
                    name={isPasswordVisible ? "eye" : "eye-off"}
                    size={20}
                    color="#919EAB"
                  />
                </Pressable>
              </View>
            </View>

            <View style={styles.switchTabs}>
              <Text style={{ color: colors.text }}>
                Already have an account?{" "}
              </Text>
              <Link href="/login" asChild>
                <Pressable>
                  <Text style={[styles.link]}>Sign in</Text>
                </Pressable>
              </Link>
            </View>

            <Pressable
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleSignUp}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.buttonText}>Create account</Text>
              )}
            </Pressable>
          </View>
        </ScrollView>
      </View>
      <Toast />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  // ... (all other static styles)
  containerMobile: {
    flex: 1,
    flexDirection: "column",
  },
  containerWeb: {
    flex: 1,
    flexDirection: "row",
  },
  leftPanel: {
    flex: 1.5,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  illustration: {
    width: 380,
    height: 300,
    marginBottom: 32,
  },
  rightPanel: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },
  formContainer: {
    maxWidth: 400,
    width: "100%",
    alignSelf: "center",
  },
  headerMobile: {
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    marginTop: 8,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  switchTabs: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 24,
  },
  formSubtitle: {
    fontSize: 14,
  },
  link: {
    fontWeight: "600",
    color: "#0a7ea4",
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    height: 52,
  },
  passwordHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  passwordContainer: {
    position: "relative",
    justifyContent: "center",
  },
  eyeIcon: {
    position: "absolute",
    right: 16,
  },
  button: {
    backgroundColor: "#212B36",
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  // 6. Add this new style
  buttonDisabled: {
    opacity: 0.7,
  },
});
