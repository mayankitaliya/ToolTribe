import { Feather } from "@expo/vector-icons";
import { Link } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import {
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
import { auth } from "../../config/firebase";

// 1. Create a reusable Illustration component
const Illustration = () => (
  <Image
    source={{
      uri: "https://pub-c5e31b5cdafb419fb247a8ac2e78df7a.r2.dev/public/assets/illustrations/illustration-dashboard.webp",
    }}
    style={styles.illustration}
    resizeMode="contain"
  />
);

// This is the left panel for the web view
const LeftPanel = () => (
  <View style={styles.leftPanel}>
    <View>
      <Text style={styles.title}>Hi, Welcome back</Text>
    </View>
    <Illustration />
  </View>
);

export default function Login() {
  const { width } = useWindowDimensions();
  const breakpoint = 768;
  const isWeb = width > breakpoint;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // ... (Your handleSignIn function remains the same)
  const handleSignIn = async () => {
    if (!email || !password) {
      Toast.show({
        type: "error",
        text1: "Missing Fields",
        text2: "Please enter both email and password.",
      });
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Sign In Error",
        text2: error.message,
      });
    }
  };

  const containerStyle = isWeb ? styles.containerWeb : styles.containerMobile;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={containerStyle}>
        {isWeb && <LeftPanel />}

        <ScrollView
          contentContainerStyle={styles.rightPanel}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.formContainer}>
            {/* 2. ADD THE ILLUSTRATION HERE FOR THE MOBILE VIEW */}
            {!isWeb && (
              <View style={styles.headerMobile}>
                <Illustration />
                <Text style={[styles.title]}>Hi, Welcome back</Text>
              </View>
            )}

            {/* Form inputs remain the same... */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email address</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                placeholderTextColor="#919EAB"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.passwordHeader}>
                <Text style={styles.inputLabel}>Password</Text>
                <Link href="/forgot-password" asChild>
                  <Pressable>
                    <Text style={styles.link}>Forgot password?</Text>
                  </Pressable>
                </Link>
              </View>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter your password"
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
              <Text style={styles.formSubtitle}>Don't have an account? </Text>
              <Link href="/register" asChild>
                <Pressable>
                  <Text style={styles.link}>Get started</Text>
                </Pressable>
              </Link>
            </View>

            <Pressable style={styles.button} onPress={handleSignIn}>
              <Text style={styles.buttonText}>Sign in</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

// 3. Update the styles
const styles = StyleSheet.create({
  // ... (safeArea, containerMobile, containerWeb, rightPanel, formContainer, etc. are the same)
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
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
    backgroundColor: "#F7F8F9",
  },
  // Use the style that you confirmed works
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
  // UPDATED: Style for the mobile header
  headerMobile: {
    alignItems: "center", // This will center the illustration
    marginBottom: 40,
  },
  title: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    color: "#212B36",
  },
  subtitle: {
    fontSize: 16,
    color: "#637381",
    marginTop: 8,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#212B36",
    marginBottom: 8,
  },
  switchTabs: {
    flexDirection: "row",
    alignSelf: "center",
    marginBottom: 24,
  },
  formSubtitle: {
    fontSize: 14,
    color: "#637381",
  },
  link: {
    color: "#00A76F",
    fontWeight: "600",
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    color: "#212B36",
    marginBottom: 8,
    fontWeight: "500",
  },
  input: {
    backgroundColor: "#F7F8F9",
    borderWidth: 1,
    borderColor: "rgba(145, 158, 171, 0.2)",
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#212B36",
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
});
