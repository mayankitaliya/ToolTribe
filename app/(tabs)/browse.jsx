import { Image } from "expo-image";
import { Platform, StyleSheet } from "react-native";

import { ExternalLink } from "@/components/external-link";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Collapsible } from "@/components/ui/collapsible";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Fonts } from "@/constants/theme";

export default function Browse() {
  return (
    <>

    </>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    alignSelf: "center",
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    marginBottom: 16,
    marginTop: Platform.OS === "web" ? 80 : 40,
    paddingHorizontal: 16,
  },
});