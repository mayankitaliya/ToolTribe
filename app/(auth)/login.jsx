import { auth } from "@/config/firebase";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { Link } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
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
  useWindowDimensions,
} from "react-native";
import Toast from "react-native-toast-message";

// --- (Illustration and LeftPanel components remain the same) ---
const Illustration = () => (
  <Image
    source={{
      uri: "https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/illustrations/illustration-dashboard.webp",
    }}
    style={styles.illustration}
    resizeMode="contain"
  />
);

const LeftPanel = () => {
  const { colors } = useTheme();
  return (
    <View style={[styles.leftPanel, { backgroundColor: colors.card }]}>
      <Illustration />
    </View>
  );
};

export default function Login() {
  const { width } = useWindowDimensions();
  const breakpoint = 768;
  const isWeb = width > breakpoint;

  // 2. Get the 'dark' boolean from the theme
  const { colors, dark: isDark } = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // --- (handleSignIn function remains the same) ---
  const handleSignIn = async () => {
    if (!email || !password) {
      Toast.show({
        type: "info",
        text1: "Missing Fields",
        text2: "Please enter both email and password.",
      });
      return;
    }
    try {
      setIsLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Sign In Error",
        text2: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const containerStyle = isWeb ? styles.containerWeb : styles.containerMobile;

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.background }]}
    >
      <View style={containerStyle}>
        {isWeb && <LeftPanel />}

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
              <View style={styles.passwordHeader}>
                <Text style={[styles.inputLabel, { color: colors.text }]}>
                  Password
                </Text>
                <Link href="/forgot-password" asChild>
                  <Pressable>
                    <Text style={[styles.link]}>Forgot password?</Text>
                  </Pressable>
                </Link>
              </View>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[
                    styles.input,
                    {
                      backgroundColor: colors.card,
                      color: colors.text,
                      borderColor: colors.border,
                    },
                  ]}
                  placeholder="Enter your password"
                  placeholderTextColor={colors.border}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!isPasswordVisible}
                  // 4. This makes the mobile keyboard dark in dark mode
                  keyboardAppearance={isDark ? "dark" : "light"}
                />
                <Pressable
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                  style={styles.eyeIcon}
                >
                  <Feather
                    name={isPasswordVisible ? "eye" : "eye-off"}
                    size={20}
                    color={colors.border}
                  />
                </Pressable>
              </View>
            </View>

            <View style={styles.switchTabs}>
              <Text style={[styles.formSubtitle, { color: colors.text }]}>
                Don't have an account?{" "}
              </Text>
              <Link href="/register" asChild>
                <Pressable>
                  <Text style={[styles.link]}>Get started</Text>
                </Pressable>
              </Link>
            </View>

            <Pressable
              style={[styles.button, isLoading && styles.buttonDisabled]}
              onPress={handleSignIn}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.buttonText}>Sign In</Text>
              )}
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

// --- (Static styles remain the same) ---
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
    width: 280,
    height: 200,
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
