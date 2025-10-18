import { useTheme } from "@react-navigation/native";
import { Platform } from "react-native";
import React from "react";

/**
 * This component injects a <style> tag on web to override the
 * browser's default autofill styles (white background, black text)
 * and use the app's current theme colors instead.
 */
export const WebAutofillFix = () => {
  // This fix is only for web
  if (Platform.OS !== "web") {
    return null;
  }

  // Get the theme colors
  const { colors } = useTheme();

  // This CSS forces the autofill text and background to match your theme
  const css = `
    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    input:-webkit-autofill:active {
      -webkit-text-fill-color: ${colors.text} !important;
      box-shadow: inset 0 0 0 1000px ${colors.card} !important;
    }
  `;

  return <style type="text/css">{css}</style>;
};
