import { Feather } from "@expo/vector-icons";
import { Link } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
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
import { auth, db } from "../../config/firebase";

// 1. Reusable Illustration component
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
    <Illustration />
  </View>
);

export default function Register() {
  const { width } = useWindowDimensions();
  const breakpoint = 768;
  const isWeb = width > breakpoint;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  // Your existing handleSignUp logic is perfect
  const handleSignUp = async () => {
    if (!fullName || !email || !password) {
      Toast.show({
        type: "error",
        text1: "Missing Fields",
        text2: "Please fill in all fields.",
      });
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        fullName: fullName,
        email: user.email,
        createdAt: new Date(),
      });
      Toast.show({
        type: "success",
        text1: "Account Created",
        text2: "Welcome to ToolTribe! 👋",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Sign Up Error",
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
            {/* 2. ADD THE ILLUSTRATION AND HEADER FOR THE MOBILE VIEW */}
            {!isWeb && (
              <View style={styles.headerMobile}>
                <Illustration />
              </View>
            )}

            {/* Form inputs */}
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Full Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Your full name"
                placeholderTextColor="#919EAB"
                value={fullName}
                onChangeText={setFullName}
                autoCapitalize="words"
              />
            </View>

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
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.input}
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
              <Text style={styles.formSubtitle}>Already have an account? </Text>
              <Link href="/login" asChild>
                <Pressable>
                  <Text style={styles.link}>Sign in</Text>
                </Pressable>
              </Link>
            </View>

            <Pressable style={styles.button} onPress={handleSignUp}>
              <Text style={styles.buttonText}>Create account</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

// 3. The styles are nearly identical to the Login screen's styles
const styles = StyleSheet.create({
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
